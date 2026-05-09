import React, { useState } from 'react';
import { ref, push, set, serverTimestamp } from 'firebase/database';
import { auth, db } from '../../../Scripts/firebase';
import { getFileUrl, returnFileType } from "../../../Utils/uploadFiles.js";
import { IoMdSend } from "react-icons/io";
import { MdOutlineAttachFile, MdClose } from "react-icons/md";

function MessageInput({ chatId }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  // Guard State to prevent users from clicking "Send" repeatedly during a heavy network upload
  const [isUploading, setIsUploading] = useState(false);

  const sendMessage = async (event) => {
    event.preventDefault();

    // Early bounds checking
    if (text.trim() === "" && !file) return;
    if (isUploading) return;

    setIsUploading(true);
    let fileUrl = null;
    let type = null;

    try {
      if (file) {
        // Upload the file securely
        const uploadResult = await getFileUrl(file);
        fileUrl = uploadResult?.url || "";
        type = returnFileType(file);
      }

      const messageRef = ref(db, `chats/${chatId}/messages`);
      const newMsgRef = push(messageRef);

      await set(newMsgRef, {
        id: newMsgRef.key,
        message: text.trim(),
        senderId: auth.currentUser?.uid || "",
        timestamp: serverTimestamp(),
        type: type || "",
        fileUrl: fileUrl || ""
      });

      // Clear the pristine state gracefully after submission logic wraps
      setText("");
      setFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) setFile(selectedFile);

    // IMPORTANT FIX: Native browser file inputs won't trigger standard `onChange` again if you try 
    // to upload the exact same file twice sequentially. Nullifying the exact value resets it natively.
    event.target.value = null;
  };

  return (
    <div className='bg-[#f0f2f5] px-4 py-3 flex flex-col relative'>
      {/* Visual Attachment Staging Display Container */}
      {file && (
        <div className="absolute bottom-full left-4 mb-2 bg-white px-3 py-2 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3">
          <div className="text-[13px] text-gray-700 truncate max-w-[200px] font-medium tracking-tight">
            📎 {file.name}
          </div>
          <button
            type="button"
            onClick={() => setFile(null)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 bg-gray-50 rounded-full hover:bg-red-50"
          >
            <MdClose className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Submit Payload Form Native Block */}
      <form onSubmit={sendMessage} className='flex gap-2 items-end'>
        <div className='flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 transition duration-200'>
          <label htmlFor="file-upload" className={`cursor-pointer rounded-full hover:bg-black/5 p-2 transition ${file ? 'text-blue-500 bg-blue-50' : ''}`}>
            <MdOutlineAttachFile className="h-6 w-6" />
            <input
              id='file-upload'
              className="hidden"
              type="file"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </div>

        <div className='flex-1 bg-white rounded-3xl flex items-center shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden px-1'>
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            className='flex-1 outline-none py-3 px-4 text-[15px] bg-transparent disabled:bg-gray-50'
            type="text"
            placeholder='Type a message'
            disabled={isUploading}
          />
        </div>

        {/* Dynamic Contextual Send Button with Network Loader */}
        {(text.trim() !== "" || file) && (
          <button
            className='w-[46px] h-[46px] mb-0.5 flex justify-center items-center bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 shadow-sm ml-1'
            type='submit'
            disabled={isUploading}
          >
            {isUploading ? (
              <div className="w-5 h-5 border-2 border-white border-t-white/20 rounded-full animate-spin"></div>
            ) : (
              <IoMdSend className='h-5 w-5 ml-1 inline-block' />
            )}
          </button>
        )}
      </form>
    </div>
  )
}

export default MessageInput;