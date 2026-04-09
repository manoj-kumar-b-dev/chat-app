import { useState } from 'react'

function Login({ setRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {

  }
  const handleGoogleSignIn = () => {

  }

  return (

    <div className='flex flex-col items-center bg-blue-600 w-full max-w-md p-8 shadow-2xl rounded-2xl h-140'>
      <header className='w-full mt-2 mb-6 border-b-2 border-white/50 pb-4 text-center'>
        <p className='text-3xl font-bold text-white tracking-wide'>Login</p> {/*tracking wide used for spacing letters*/}
      </header>

      {/*authError && (
          <div className='w-full mb-4 text-red-100 bg-red-600/50 px-4 py-3 rounded-lg text-sm text-center font-medium'>
            {authError === "offline" ? "No Internet Connection" : "Invalid Username or Password"}
          </div>
        )*/}

      <form onSubmit={handleSignIn} className='flex flex-col gap-4 w-full'>
        <input
          className='border border-white/40 bg-white/10 px-5 py-3 outline-none rounded-xl text-white placeholder-white/70 focus:border-white transition-all'
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder='Email Address'
          required
        />
        <input
          className='border border-white/40 bg-white/10 px-5 py-3 outline-none rounded-xl text-white placeholder-white/70 focus:border-white transition-all'
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
        />
        <button
          type='submit'
          disabled={loading}
          className='mt-4 bg-white hover:bg-gray-100 transition-colors rounded-xl py-3 font-bold text-blue-500 outline-none cursor-pointer '>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className='mt-6 mb-4 text-white text-sm font-medium'>Or continue with</p>

      <section className='flex gap-4 mb-6'>
        <button type="button" onClick={handleGoogleSignIn} disabled={loading} className='cursor-pointer bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-all'>
          <img className='w-6 h-6' src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google Logo" />
        </button>
      </section>

      <p className='text-white/80 text-sm'>
        Don't have an account? <button onClick={setRegister} type='button' className='font-bold ml-1 text-white hover:underline cursor-pointer'>Register</button>
      </p>
    </div>


  )
}

export default Login