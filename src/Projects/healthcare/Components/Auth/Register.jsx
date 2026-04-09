import { useState } from "react"

function Register({ setRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError("");

    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/;

    if (name.trim() === "") return setError("Name cannot be empty.");
    if (!passwordRegex.test(password)) return setError("Password requires uppercase, lowercase, numbers, and symbols.");

  }

  return (
    <section className='flex flex-col items-center bg-orange-500 w-full max-w-md p-8 shadow-2xl rounded-2xl'>
      <header className='w-full border-b-2 border-white/50 pb-4 mb-6 text-center'>
        <p className='text-3xl font-bold tracking-wide text-white'>Register</p>
      </header>

      {error && (
        <div className='w-full mb-4 text-red-100 bg-red-800/60 font-medium px-4 py-3 rounded-lg text-sm text-center'>
          {error}
        </div>
      )}

      <form onSubmit={handleSignUp} className='flex flex-col gap-4 w-full'>
        <input
          onChange={(e) => setName(e.target.value)}
          className='border border-white/40 bg-white/10 px-5 py-3 outline-none rounded-xl text-white placeholder-white/70 focus:border-white transition-all'
          type="text" placeholder='Full Name' required
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          className='border border-white/40 bg-white/10 px-5 py-3 outline-none rounded-xl text-white placeholder-white/70 focus:border-white transition-all'
          type="email" placeholder='Email Address' required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className='border border-white/40 bg-white/10 px-5 py-3 outline-none rounded-xl text-white placeholder-white/70 focus:border-white transition-all'
          type="password" placeholder='Password' required
        />

        <button
          type='submit'
          disabled={loading}
          className='mt-4 bg-white hover:bg-gray-100 transition-colors  rounded-xl py-3 font-bold text-orange-600 outline-none cursor-pointer'
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <footer className='mt-6 mb-2'>
        <button
          type="button"
          className='py-2 px-6 rounded-xl font-medium hover:bg-white/20 cursor-pointer text-white border border-white/50 transition-colors'
          onClick={setRegister}
        >
          Back to Login
        </button>
      </footer>
    </section>
  )
}

export default Register;