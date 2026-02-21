import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../Scripts/firebase'
import UserList from './UserList';
import { UsersProvider } from '../../Context/UsersContext';
import Header from '../../Common/Header.jsx';
import ChatWindow from './ChatPage/ChatWindow.jsx';

function ChatHome() {
  const [selectUser,setSelectUser]=React.useState(null)
  const currentUser=auth.currentUser.uid;
  let chatId;

  if(selectUser)
  {
    chatId=currentUser < selectUser.uid ? currentUser + selectUser.uid : selectUser.uid + currentUser
  }
  
  return (
    <main>   
        <Header />
        <div className='flex justify-between'>
          <UsersProvider><UserList setSelectUser={setSelectUser} /></UsersProvider>

          {selectUser?<ChatWindow chatId={chatId}/>:<div className='flex flex-1 justify-center items-center h-screen border-l-1 boreder-black'><p>Select a chat to start message</p></div>}
        </div>
    </main>
  

  

  )
}

export default ChatHome