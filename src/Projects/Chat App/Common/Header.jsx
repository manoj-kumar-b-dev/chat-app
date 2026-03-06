import React from 'react'
import { signOut ,onAuthStateChanged } from 'firebase/auth'
import { auth ,db } from '../Scripts/firebase';
import {get ,ref} from 'firebase/database'

function Header() {
  const [userDetails,setUserDetails]=React.useState(null)
  const [loading,setLoading]=React.useState(true)
  const handleSignOut=async()=>
  {
    try {
      await signOut(auth);
      console.log("User Signed Out Successfully");
      setUserDetails(null)
    } catch (error) {
      console.log("Error signing out: ", error.message);
    } 
  }
  
  React.useEffect(()=>
  {
   const unsubscribe=onAuthStateChanged(auth,(user)=>
  {
    console.log(user)
    if(user)
    {
      profileDetails(user.uid);
    }
    else
    {
      setUserDetails(null);
      console.log("No user currently signed in")
      setLoading(false)
    }
  })
  return ()=>unsubscribe();
  
  },[])
  

  const profileDetails=async(uid)=>{
    if(!uid)
    {
      console.log("No user id is available for fetching user details")
      return 
    }
    try
    {
      const snapshot= await get(ref(db,`users/${auth.currentUser.uid}`))
      if(snapshot.exists())
      {
        const parsed=snapshot.val()
        setUserDetails(parsed)
        setLoading(false)
      }
    }
    catch(error)
    {
      console.log("Error fetching profile details:",error.message)
      setUserDetails(null)
      setLoading(false)
    }
  
  }
  console.log(userDetails && userDetails)
  return (
    <header className='py-2 px-3 flex justify-between items-center bg-[yellow]'>
      <h1 className='text-2xl font-bold'>Chat App</h1>
      {loading?<p>loading</p>:<img className='w-10 h-10' src={userDetails?.avatar} alt="" />}
    
      <button onClick={handleSignOut} className='bg-[orange] py-1 px-3 rounded-md'>Logout</button>
    </header>
  )

}
export default Header