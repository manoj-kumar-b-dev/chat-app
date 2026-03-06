import React from 'react'
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
import { auth,db } from "../../Scripts/firebase";
import { set , push , ref } from "firebase/database"



function Register({setRegister}) {
  const [email,setEmail]=React.useState(""); 
  const [password,setPassword]=React.useState("");   
  const [name,setName]=React.useState("");
  const [file,setFile]=React.useState(null);

  const handleSignUp=async(event)=>
 {
  event.preventDefault();
  /*
    const emailRegex=/^[a-z0-9A-Z.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/
    
    if(name.trim()==="")
    {
      alert("name should not be empty");
    }
    if(!emailRegex.test(email))
    {
      alert("please provide a properly formatted email address");
    }
    if(!passwordRegex.test(password))
    {
      alert("Password must contains uppercase , lowercase , digits and symbol");
    }*/
  
    try 
    {
      const userCredential = await createUserWithEmailAndPassword(auth,email,password);
      const user=userCredential.user;

      const profileUrl=await getProfileUrl(file)
      await updateProfile(user,
        {
          displayName:name,
          photoURL:profileUrl.url
        }
      )
      await set(ref(db, `users/${user.uid}`), {
      email: user.email,
      uid: user.uid,
      name:name || "",
      avatar:profileUrl.url || ""
    });
      console.log(user)
      console.log(profileUrl)
      
    }
    catch(error) 
    {
      console.error("Error during registration:", error.message);
    }
 }

 async function getProfileUrl()
 {
   const data=new FormData()
   data.append("file",file)
   data.append("upload_preset","upload_profile_pic")
   try{
    const res=await fetch("https://api.cloudinary.com/v1_1/ddfkwexvu/image/upload",
      {
        method:"POST",
        body:data
      }
    )

    const result=res.json();
    return result
   }
   catch(error)
   {
     console.log("failed to upload image",error)
   }
   finally
   {
    console.log("file uploaded succesfully")
   }


 }


  return (
    <>
      <main className='flex flex-col relative items-center bg-[rgba(241,179,21,0.8)] w-100 h-110 shadow-2xl rounded-2xl'>

        <header className='flex justify-center w-100 mt-4 py-2 px-20 border-b-2 border-white'>
          <p className='text-xl text-white'>Register</p>
        </header>
        
        <form onSubmit={handleSignUp} className='flex flex-col gap-5 mt-10 w-70 '>
          <input  onChange={(e)=>setName(e.target.value)} className='border-1 border-[white] px-5 py-2 outline-none rounded-xl placeholder-white'  type="text" placeholder='Name' required/>
          <input  onChange={(e)=>setEmail(e.target.value)} className='border-1 border-[white] px-5 py-2 outline-none rounded-xl placeholder-white'  type="email" placeholder='Email' required/>
          <input  onChange={(e)=>setPassword(e.target.value)} className='border-1 border-[white] px-5 py-2 outline-none rounded-xl placeholder-white' type="password" placeholder='Password'  required/>
          <input onChange={event=>setFile  (event.target.files[0])}type='file' required />
          <button className='cursor-pointer bg-[rgba(236,115,22,0.7)] rounded-xl py-2 text-white' type='submit'>Sign Up</button> 
        </form>

        <footer> 
          <button className='py-1 absolute bottom-7 left-6 px-4 rounded-lg cursor-pointer text-white bg-[rgba(255,143,16,1)]' onClick={()=>setRegister(prev=>!prev)}>Back</button> 
        </footer>
        
      </main>
      
    </>
    
  )
}

export default Register