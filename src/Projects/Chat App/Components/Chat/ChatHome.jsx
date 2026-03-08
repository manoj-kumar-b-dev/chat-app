import React from 'react'
import { signOut } from 'firebase/auth'
import { auth ,db} from '../../Scripts/firebase'
import UserList from './UserList';
import { get ,ref } from 'firebase/database';
import { UsersProvider } from '../../Context/UsersContext';
import ChatWindow from './ChatPage/ChatWindow.jsx';

function ChatHome() {
  const [selectUser,setSelectUser]=React.useState(null)
  const [userDetails,setUserDetails]=React.useState(null)
  const currentUser=auth.currentUser.uid;
  let chatId;

  if(selectUser)
  {
    chatId=currentUser < selectUser.uid ? currentUser + selectUser.uid : selectUser.uid + currentUser
  }

  
  React.useEffect(()=>
  {
   profileDetails();
  }
 ,[])
   const profileDetails=async()=>{
    try
    {
      const snapshot= await get(ref(db,`users/${auth.currentUser.uid}`))
      if(snapshot.exists())
      {
        const parsed=snapshot.val()
        setUserDetails(parsed)
      }
    }
    catch(error)
    {
      console.log("Error fetching profile details:",error.message)
      setUserDetails(null)
    }
  
  }
  console.log(selectUser)
  console.log(auth.currentUser)
  return (
    <main>   
        <div className='flex justify-between'>
          <UsersProvider><UserList setSelectUser={setSelectUser} /></UsersProvider>
          {selectUser?<ChatWindow chatId={chatId}/>:<div className='flex flex-1 justify-center items-center h-171 border-l-1 border-black'><p>Select a chat to start message</p></div>}
        </div>
    </main>
  

  

  )
}

export default ChatHome