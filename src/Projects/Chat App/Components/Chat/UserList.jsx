import { useContext ,useState } from 'react'
import { UsersContext } from "../../Context/UsersContext.jsx";
import {auth} from "../../Scripts/firebase.js"
function UserList({setSelectUser}) {
  const { users } = useContext(UsersContext)
  const me=auth.currentUser.uid
  console.log(me);
  console.log(users)
  console.log(Date())
  return (
      <section className='w-100 mr-6 '>
        {users.filter(user=>user.uid!==me).map((user)=><div onClick={()=>setSelectUser(user)} className='bg-[red] py-2 pl-5 mt-4 rounded-lg text-white' key={user.uid}>{user.name}</div>)}
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