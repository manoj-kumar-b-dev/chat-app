import React from 'react';
import { ref , push} from 'firebase/database';
import { db } from '../../../Scripts/firebase';
import { auth } from '../../../Scripts/firebase';
function MessageInput({chatId}) {
  const [text,setText]=React.useState(null)
  const inputText=React.useRef(null)
 console.log()
  const sendMessage=async (event)=>
  {
    event.preventDefault();
    const messageRef=ref(db,`chats/${chatId}/messages`);
   
    await push(messageRef,{
      message:text,
      senderId:auth.currentUser.uid,
      timestamp:Date.now(),
      id:Math.random().toString(36).substring(2) + Date.now().toString(36)
    })
    setText(null)
    inputText.current.value=""
  }

  return (
    <form onSubmit={sendMessage}className='flex justify-between items-center border-t-1 '>
      <input ref={inputText} onKeyUp={(event)=>setText(event.target.value)} className='flex-1 outline-none h-12 pl-4 text-md'  type="text" />
      {text?<button className='border-1 mr-4 rounded-2xl w-20 bg-[blue] text-white h-10' type='submit' >Send</button>:null}
    </form>
  )
}

export default MessageInput