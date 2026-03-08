import React from 'react';
import { auth  } from '../Scripts/firebase.js';
import { signOut } from 'firebase/auth';

export const authContext=React.createContext()

export function AuthContextProvider({children}) {
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
    <authContext.Provider value={{handleSignOut}} >
      {children}
    </authContext.Provider>
  )
}

