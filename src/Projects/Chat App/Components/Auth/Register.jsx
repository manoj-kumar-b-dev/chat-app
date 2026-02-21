import React from 'react'
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
import { auth } from "../../Scripts/firebase";

function Register({setRegister}) {
  const [email,setEmail]=React.useState(""); 
  const [password,setPassword]=React.useState("");   
  const [name,setName]=React.useState("");
  const handleSignUp=async()=>
 {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth,email,password);
      const user=userCredential.user;
      console.log("User Registered ",user.uid);

      await updateProfile(userCredential.user, {
      displayName: name
    });

    console.log("User created:", userCredential.user.displayName);
    
    }
    catch(error) {
      console.log(error.message)
    }
 }
  return (
    <>
      <main className='flex flex-col relative items-center bg-[rgba(241,179,21,0.8)] w-100 h-110 shadow-2xl rounded-2xl'>

        <header className='flex justify-center w-100 mt-4 py-2 px-20 border-b-2 border-white'>
          <p className='text-xl text-white'>Register</p>
        </header>
        
        <section className='flex flex-col gap-5 mt-10 w-70 '>
          <input value={name} onChange={(e)=>setName(e.target.value)} className='border-1 border-[white] px-5 py-2 outline-none rounded-xl placeholder-white'  type="text" placeholder='Name' required/>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className='border-1 border-[white] px-5 py-2 outline-none rounded-xl placeholder-white'  type="email" placeholder='Email' required/>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} className='border-1 border-[white] px-5 py-2 outline-none rounded-xl placeholder-white' type="password" placeholder='Password'  required/>
        </section>

        <footer>
          <button className='cursor-pointer mt-5 bg-[rgba(236,115,22,0.7)] rounded-xl px-29 py-[10px] text-white' onClick={handleSignUp}>Sign Up</button>  
          <button className='py-1 absolute bottom-7 left-6 px-4 rounded-lg cursor-pointer text-white bg-[rgba(255,143,16,1)]' onClick={()=>setRegister(prev=>!prev)}>Back</button> 
        </footer>
        
      </main>
      
    </>
    
  )
}

export default Register