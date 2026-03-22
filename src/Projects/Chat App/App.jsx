import Auth from './Components/Auth/Auth.jsx';
import ChatHome from './Components/Chat/ChatHome.jsx';
import { authContext } from './Context/AuthContext.jsx';
import React from 'react';

function App() {

const {loading,user}=React.useContext(authContext)
if(loading) return <div>Loading...</div>

  return (

    <>
      {user?<ChatHome />:<Auth />}
    </>
  )
}

export default App
