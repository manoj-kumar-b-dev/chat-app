import React from 'react';
import { auth ,provider  } from '../Scripts/firebase.js';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export const authContext=React.createContext()

export function AuthContextProvider({children}) {
  const [user,setUser]=React.useState(null);
  const [loading,setLoading]=React.useState(true);
  const [Error,setError]=React.useState(null)

  //for handling sign out
  const handleSignOut=async()=>
  {
    try {
      await signOut(auth);
      console.log("User Signed Out Successfully");
    } catch (error) {
      console.log("Error signing out: ", error.message);
    } 
  }

// for signIn
function signInFunc(email,password)
{
  signInWithEmailAndPassword(auth,email,password).then((userCredential)=>
  {
    const user=userCredential.user;
    console.log("User Signed In ",user.uid);
    setError(null)
  }).catch((error)=>
  {
    navigator.onLine ? setError("Invalid Username or Password") : setError("offline");
    console.log("Error ",error.message)
  })
}

//for sign in with google

function signInWithGoogle()
{
  signInWithPopup(auth,provider).then((result)=>
  {
    const user=result.user;
    console.log("Google Sign In User ",user.uid);
  }).catch((error)=>
  {
    console.log("Error ",error.message)
  })
}

//for tracking user authentication
React.useEffect(()=>
{
  const unSubscribe=onAuthStateChanged(auth,async(currentUser)=>
  {
    if(currentUser)
    { 
      setUser(currentUser);
      setLoading(false);
    }
    else
    {
    setUser(null);
    setLoading(false);
   }
   
  });
  return unSubscribe;
},[])

  return (
    <authContext.Provider value={{handleSignOut,user,loading,signInFunc,Error,signInWithGoogle}} >
      {children}
    </authContext.Provider>
  )
}

