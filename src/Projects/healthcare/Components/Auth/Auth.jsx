import React from 'react'
import Login from './Login'
import Register from './Register'

function Auth() {
  const [register, setRegister] = React.useState(false)
  return (
    <main className='flex justify-center items-center h-screen'>
      {!register ? <Login setRegister={() => setRegister(true)} /> : <Register setRegister={() => setRegister(false)} />}
    </main>
  )
}

export default Auth