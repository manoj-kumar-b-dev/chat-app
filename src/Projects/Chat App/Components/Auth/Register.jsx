import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from "../../Scripts/firebase";
import { set, ref } from "firebase/database";
import { getFileUrl } from '../../Utils/uploadFiles';

function Register({ setRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError("");

    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/;

    if (name.trim() === "") return setError("Name cannot be empty.");
    if (!passwordRegex.test(password)) return setError("Password requires uppercase, lowercase, numbers, and symbols.");


    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const profileUrl = await getFileUrl(file);

      await updateProfile(user, {
        displayName: name,
        photoURL: profileUrl.url
      });

      await set(ref(db, `users/${user.uid}`), {
        email: user.email,
        uid: user.uid,
        name: name,
        avatar: profileUrl.url
      });

    } catch (err) {
      console.error("Error during registration:", err);
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
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

        <div className='flex flex-col gap-2 mt-2'>
          <label htmlFor="avatar" className='w-full border-2 border-dashed border-white/60 hover:bg-white/20 transition-all rounded-xl py-4 flex flex-col items-center justify-center cursor-pointer'>
            <span className='font-bold text-white mb-1'>Profile Picture</span>
            <span className='text-white/80 text-sm'>{file ? `Selected: ${file.name}` : "Click to select"}</span>
            <input id="avatar" className='hidden' onChange={(e) => setFile(e.target.files[0])} type='file' accept="image/*" />
          </label>
        </div>

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