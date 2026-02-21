import {createContext , useEffect , useState} from 'react'
import { db } from "../Scripts/firebase.js";
import { ref , onValue } from 'firebase/database';

const UsersContext=createContext();

function UsersProvider({children}) {
  const [users,setUsers]=useState([]);
  useEffect(()=>
  {
    const usersRef = ref(db, 'users');// Reference to the 'users' node in the database
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val()
      if(data)
      {
        const parsed=Object.keys(data).map((uid)=>
        {
          return {uid, ...data[uid]}
        })
        setUsers(parsed);
      }
      else
      {
        setUsers([]);
      } 

    });
    return () => unsubscribe();
    
  }
  ,[])

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  )
}

export { UsersProvider, UsersContext }