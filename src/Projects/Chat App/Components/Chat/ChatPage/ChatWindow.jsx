import React from 'react';
import Header from "./Header.jsx"
import MessageInput from "./MessageInput.jsx";
import MessageList from "./MessageList.jsx";
import { AuthContextProvider } from '../../../Context/AuthContext.jsx';
function ChatWindow({chatId}) {
  console.log(chatId)
  
  return (
   <div  className='flex flex-col justify-between flex-1 h-171 border-l-1 border-black '>
      <AuthContextProvider>
        <Header />
      </AuthContextProvider>
      <MessageList chatId={chatId}  />
      <MessageInput chatId={chatId} /> 
   </div>  
  )
}

export default ChatWindow