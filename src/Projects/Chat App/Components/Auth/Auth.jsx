import React from 'react'
import Login from './Login.jsx'
import Register from './Register';

function Auth() {
    const [register,setRegister]=React.useState(false)
  return (
    <main className='flex justify-center items-center h-screen w-screen'>
       {register?<Register setRegister={()=>setRegister(false)} />:<Login setRegister={()=>setRegister(true)} />}
   
    </main>
  )
}

export default Auth