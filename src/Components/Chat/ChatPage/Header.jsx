import React from 'react';
import { authContext } from '../../../Context/AuthContext.jsx';

function Header() {
  const { handleSignOut } = React.useContext(authContext);

  return (
    <header className='h-[50px] py-2 w-full  px-6 bg-white border-b border-gray-100 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] sticky top-0 z-10'>
      <button
        onClick={handleSignOut}
        className='flex items-center gap-2 group px-4 py-2 bg-white text-rose-500 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-all duration-200 active:scale-95 shadow-sm'
      >
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
        <span>Logout</span>
      </button>
    </header>
  )
}

export default Header