import React, { useEffect } from 'react';
import Auth from './Components/Auth/Auth.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "./Scripts/firebase.js";
import { ref , set } from 'firebase/database';
import ChatHome from './Components/Chat/ChatHome.jsx';

function App() {
const [user,setUser]=React.useState(null);
const [loading,setLoading]=React.useState(true);
useEffect(()=>
{
  const unSubscribe=onAuthStateChanged(auth,(currentUser)=>
  {
   if(currentUser)
   {
    setUser(currentUser);
    setLoading(false);
    set(ref(db, `users/${currentUser.uid}`), {
      name: currentUser.displayName || "Anonymous",
      email: currentUser.email,
      uid: currentUser.uid
    });
   }
   else
   {
    setUser(null);
    setLoading(false);
   }
   
  });
  return unSubscribe;
})

if(loading) return <div>Loading...</div>

  return (

    <>
      {user?<ChatHome />:<Auth />}
    </>
  )
}

export default App
