import { useContext ,useState } from 'react'
import { UsersContext } from "../../Context/UsersContext.jsx";
import {auth} from "../../Scripts/firebase.js"

function UserList({setSelectUser,width}) {
  const { users } = useContext(UsersContext)
  const me=auth.currentUser.uid
  console.log(width)
  return (
      <section style={{width:width+"px",minWidth:"120px"}}>

        <header className='py-2  px-3 items-center bg-[yellow]'>
            <h1 className='text-2xl font-bold'>Chat App</h1>
        </header>

        {users.map((user)=>
        <div onClick={()=>setSelectUser(user)} className='flex gap-2  py-2 pl-3 border-b-1 border-[rgba(180,180,180)] ' key={user.uid}>
          <img src={user.avatar} className='w-10 h-10 rounded-[20px]' alt="avatar" />
          <p className='text-black'>{user.uid===me?"You":user.name}</p>
        </div>
        )}

      </section>
  )
}

export default UserList
/*
logic for creating chat id

currentUser=a123
selectedUser=b456   
             
ci=cu<su?cu+su:su+cu
ci=a123b456
-----------------
currentUser=b456
selectedUser= a123 

b456<a123 = false
ci=cu<su?cu+su:su+cu
ci=a123b456
ci
*/