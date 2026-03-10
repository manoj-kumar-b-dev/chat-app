import React from 'react';
import { ref , push ,set, serverTimestamp} from 'firebase/database';
import { auth , db} from '../../../Scripts/firebase';
function MessageInput({chatId}) {
  const [text,setText]=React.useState("")
  const inputText=React.useRef(null)
 console.log()
  const sendMessage=async (event)=>
  {
    event.preventDefault();
    const messageRef=ref(db,`chats/${chatId}/messages`);
    if(text.trim().length===0) 
    {
      return 0
    }
    const newMsgRef= push(messageRef)
    await set(newMsgRef,{
      message:text,
      senderId:auth.currentUser.uid,
      timestamp:serverTimestamp(),
      id:newMsgRef.key}
    )
   
    setText(null)
    inputText.current.value=""
  }

  return (
    <form onSubmit={sendMessage}className='flex justify-between items-center border-t-1 '>
      <input ref={inputText} onKeyUp={(event)=>setText(event.target.value)} className='flex-1 outline-none px-10 mb-2 h-10 pl-4 text-md' type="text" />
      {text?<button className='border-1 mr-4 rounded-2xl w-20 bg-[blue] text-white h-10' type='submit' >Send</button>:null}
    </form>
  )
}

export default MessageInput