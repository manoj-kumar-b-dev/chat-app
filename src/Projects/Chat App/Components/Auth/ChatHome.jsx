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
    chatId=currentUser < selectUser.uid? currentUser + selectUser.uid : selectUser.uid + currentUser
  }
  
  return (
  <>
      {selectUser? <ChatWindow chatId={chatId}/>:
      <><Header /><UsersProvider><UserList setSelectUser={setSelectUser} /></UsersProvider></>}
  </>
  

  

  )
}

export default ChatHome