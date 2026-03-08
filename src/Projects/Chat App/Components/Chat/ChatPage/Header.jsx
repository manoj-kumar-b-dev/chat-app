import React from 'react';
import { authContext } from '../../../Context/AuthContext.jsx';

function Header() {
const {handleSignOut}=React.useContext(authContext)
  return (
    <header className='py-2 px-3 flex  justify-between bg-[yellow]'>
      <button onClick={handleSignOut} className='bg-[orange] py-1 px-3 rounded-md'>Logout</button>
    </header>
  )

}
export default Header