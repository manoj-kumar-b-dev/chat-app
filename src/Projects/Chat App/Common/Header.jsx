import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../Scripts/firebase'

function Header() {
  const handleSignOut=async()=>
  {
    try {
      await signOut(auth);
      console.log("User Signed Out Successfully");
    } catch (error) {
      console.log("Error signing out: ", error.message);
    } 
  }
  return (
    <header className='py-2 px-3 flex justify-between items-center bg-[yellow]'>
      <h1 className='text-2xl font-bold'>Chat App</h1>
      <button onClick={handleSignOut} className='bg-[orange] py-1 px-3 rounded-md'>Logout</button>
    </header>
  )

}
export default Header