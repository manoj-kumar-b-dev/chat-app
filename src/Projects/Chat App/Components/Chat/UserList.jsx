import { useContext ,useState } from 'react'
import { UsersContext } from "../../Context/UsersContext.jsx";
import {auth} from "../../Scripts/firebase.js"

function UserList({setSelectUser}) {
  const { users } = useContext(UsersContext)
  const me=auth.currentUser.uid

  return (
      <section className='w-100'>

        <header className='py-2  px-3 items-center bg-[yellow]'>
            <h1 className='text-2xl font-bold'>Chat App</h1>
        </header>

        {users.filter(user=>user.uid!==me).map((user)=>
        <div onClick={()=>setSelectUser(user)} className='flex gap-2  py-2 pl-3 border-1 border-[blue] border-r-none' key={user.uid}>
          <img src="Images/pic1.jpg" className='w-10 h-10 rounded-[20px]' alt="avatar" />
          <p className='text-black'>{user.name}</p>
        </div>)}

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