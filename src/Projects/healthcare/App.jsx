import React from "react";
import Dashboard from "./Pages/Dashboard.jsx";
import Auth from "./Components/Auth/Auth.jsx";

function App() {
  const [user, setUser] = React.useState(true)
  return (
    <>
      {user ? <Dashboard /> : <Auth />}
    </>
  )
}
export default App