import React from 'react';
import Header from '../../../Common/Header';
import MessageInput from "./MessageInput.jsx";
import MessageList from "./MessageList.jsx";

function ChatWindow({chatId}) {
  console.log(chatId)
  
  return (
   <div  className='flex flex-col justify-between flex-1 h-171   border-l-1 border-black '>
      <MessageList chatId={chatId}  />
      <MessageInput chatId={chatId} /> 
   </div>  
  )
}

export default ChatWindow