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
  const panelResizeElement=React.useRef(null)
  const currentUser=auth.currentUser.uid;
  const [width,setWidth]=React.useState("400")
  let chatId;

  if(selectUser)
  {
    chatId=currentUser < selectUser.uid ? currentUser + selectUser.uid : selectUser.uid + currentUser
  }
  const dragPanel=()=>
  {
    window.addEventListener("mousemove",handlePanel)
    window.addEventListener("mouseup",()=>
    {
       window.removeEventListener("mousemove",handlePanel)
    });
  }
  const handlePanel=(event)=>
  {
    setWidth(event.clientX)
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
        <div className='flex justify-between h-screen'>
          <UsersProvider><UserList setSelectUser={setSelectUser} width={width} /></UsersProvider>
          <div className='w-2 cursor-ew-resize border-l-1' onMouseDown={dragPanel} ref={panelResizeElement}></div>
          {selectUser?<ChatWindow chatId={chatId}/>:<div className='flex flex-1 justify-center items-center h-171 border-black'><p>Select a chat to start message</p></div>}
        </div>
    </main>
  

  

  )
}

export default ChatHome

//w-1 0.25rem
//w-4 1rem

