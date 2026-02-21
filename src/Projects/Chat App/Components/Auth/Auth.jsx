import React from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider} from '../../Scripts/firebase';
import Register from './Register';

function Auth() {
  const [register,setRegister]=React.useState(false)
  const email=React.useRef(); 
  const password=React.useRef();   
  const [Error,setError]=React.useState(null)
  const handleSignIn=(event)=>
  {
    event.preventDefault()

    signInWithEmailAndPassword(auth,email.current.value,password.current.value).then((userCredential)=>
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
  const handleGoogleSignIn=async()=>
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
  
   return (
    <main className={`flex justify-center items-center h-screen w-screen`}>
{!register?
      <div className={`flex flex-col items-center bg-[rgba(21,145,241,1)] w-100 h-125 shadow-2xl rounded-2xl ${register?"hidden":""}`}>
          <header className='mt-4 mb-4 border-b-2 border-white px-25 py-2'>
            <p className='text-xl text-white'>Log in</p>
          </header>
          
         {
          <div className='text-[red]'>
            {Error==="offline" ? <div className='flex gap-2'><img className='w-6' src='Images/Chat App/Offline-Img.jpg' /> No Internet Connection</div>:(Error?"Invalid Username or Password":"")}
          </div> 
          }

          <form action={handleSignIn} className='flex flex-col gap-5 mt-7 w-70 '>

            <input ref={email} className='border-1 border-[white] px-5 py-2 outline-none rounded-xl placeholder-white'  type="email" placeholder='Email' required/>

            <input ref={password} className='border-1 border-[white] px-5 py-2 outline-none rounded-xl placeholder-white' type="password" placeholder='Password'  required/>

            <button className='mt-3 bg-[rgba(22,54,236,0.7)] rounded-xl py-[10px] text-white outline-none' type="submit" onClick={handleSignIn}>Sign in</button>

          </form>
          
          <p className='mt-3 mb-5 text-white'>or continue with</p>
          <section className='flex gap-6  mb-5'>

            <img className='w-8 h-8 cursor-pointer' src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google Logo" onClick={handleGoogleSignIn}/>   

            <img className='w-8 h-8 cursor-pointer' src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Facebook Logo"/>

            <img className='w-8 h-8 cursor-pointer' src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="LinkedIn Logo"/>

          </section>      
          <p className='text-white cursor-pointer'>Don't have an acount ?<b onClick={()=>setRegister(true)}> Register</b></p>

       </div>:<Register setRegister={setRegister}/>
}
    </main>
  )
}

export default Auth