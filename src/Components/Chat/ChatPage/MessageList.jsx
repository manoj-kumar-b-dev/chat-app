import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ref, onValue, query, limitToLast } from "firebase/database";
import { db, auth } from '../../../Scripts/firebase';
import formatTime from '../../../Utils/time';

function MessageList({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Solves the Firebase real-time cache wiping bug
  const [messageLimit, setMessageLimit] = useState(20);

  const currentUser = auth.currentUser?.uid;
  const scrollContainerRef = useRef(null);
  const bottomRef = useRef(null);

  // Keep track of scroll position manually to prevent aggressive auto-scrolling 
  // when the user is trying to read old messages!
  const autoScrollRef = useRef(true);

  // Unified real-time listening and pagination approach
  useEffect(() => {
    if (!chatId) return;

    const chatRef = ref(db, `chats/${chatId}/messages`);
    const messagesQuery = query(chatRef, limitToLast(messageLimit));

    const unSubscribe = onValue(messagesQuery, (snapShot) => {
      const data = snapShot.val() || {};

      // Convert to array and ensure chronological sorting
      const parsed = Object.keys(data)
        .map(key => ({ id: key, ...data[key] }))
        .sort((a, b) => a.timestamp - b.timestamp);

      setMessages(parsed);
      setLoading(false);
    });

    return () => unSubscribe();
  }, [chatId, messageLimit]);

  // Handle auto-scroll logic smoothly whenever messages mutate
  useEffect(() => {
    if (autoScrollRef.current && bottomRef.current) {
      bottomRef.current.scrollIntoView();
    }
  }, [messages]);

  // Efficient scrolling handler that detects top-hit and manual scrolls
  const handleScroll = useCallback((event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;

    // If the user has scrolled up, disable auto-scrolling momentarily
    autoScrollRef.current = scrollHeight - scrollTop - clientHeight < 50;

    // Load older messages seamlessly if we hit the top of the container
    if (scrollTop === 0) {
      // By simply increasing our limit, the Firebase onValue listener natively 
      // pulls the broader data set without overriding arrays manually.
      setMessageLimit(prev => prev + 20);
    }
  }, []);

  if (!currentUser) return <p className="p-4 text-center text-gray-500">Authentication error.</p>;

  return (
    <div className='flex flex-col h-full bg-[#efeae2] relative'>
      {loading && messages.length === 0 ? (
        <div className="flex justify-center items-center flex-1">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ul
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className='flex-1 overflow-y-auto px-6 py-6 scroll-smooth'
        >
          {messages.map((message) => {
            const isMe = message.senderId === currentUser;

            return (
              <li
                className={`flex mb-4 ${isMe ? "justify-end" : "justify-start"}`}
                key={message.id}
              >
                <div className={`flex flex-col max-w-[75%] lg:max-w-[60%] ${isMe ? "items-end" : "items-start"}`}>

                  {/* Robust and beautiful file/media rendering */}
                  {message.fileUrl && (
                    <div className="mb-1 rounded-xl overflow-hidden shadow-sm bg-gray-50 border border-gray-200">
                      {message.type === "image" && (
                        <img
                          onClick={() => window.open(message.fileUrl, "_blank")}
                          className='w-full max-h-72 object-cover cursor-pointer hover:opacity-95 transition-opacity'
                          src={message.fileUrl}
                          alt="Attachment"
                        />
                      )}

                      {message.type === "video" && (
                        <video controls className='w-full max-h-72 bg-black cursor-pointer' onClick={() => window.open(message.fileUrl, "_blank")}>
                          <source src={message.fileUrl} type="video/mp4" />
                          <source src={message.fileUrl} type="video/webm" />
                        </video>
                      )}

                      {message.type === "pdf" && (
                        <div
                          className="flex items-center gap-3 p-4 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => window.open(message.fileUrl, "_blank")}
                        >
                          <div className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path></svg>
                          </div>
                          <span className="font-semibold text-sm text-gray-700 underline decoration-gray-300 underline-offset-2">View Document</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Clean WhatsApp-styled Message Content Bubbles */}
                  {message.message && (
                    <div className={`relative px-4 py-2 pt-2.5 pb-2.5 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.1)] group ${isMe
                        ? 'bg-[#d9fdd3] text-gray-900 rounded-tr-none'
                        : 'bg-white text-gray-900 rounded-tl-none border border-gray-100'
                      }`}>
                      <p className='break-words text-[15px] leading-relaxed pr-14 inline-block'>
                        {message.message}
                      </p>

                      {/* Subtly pinned timestamp inside the bubble corner */}
                      <span className={`text-[10.5px] font-medium absolute bottom-1.5 right-2 inline-block ${isMe ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
          {/* Invisible div acts as an anchor for scrollIntoView routing */}
          <div ref={bottomRef} className="h-1 clear-both mt-4"></div>
        </ul>
      )}
    </div>
  )
}

export default MessageList
