import { createContext, useEffect, useState } from 'react'
import { db } from "../Scripts/firebase.js";
import { ref, onValue } from 'firebase/database';

const UsersContext = createContext();

function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersRef = ref(db, 'users');// Reference to the 'users' node in the database
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const parsed = Object.keys(data).map((uid) => {
          return { uid, ...data[uid] }
        })
        console.log(parsed)
        setUsers(parsed);
      }
      else {
        setUsers([]);
      }
      setLoading(false);

    }, (error) => {
      console.error(error);
      setLoading(false);
    });
    return () => unsubscribe();

  }, [])

  return (
    <UsersContext.Provider value={{ users, setUsers, loading }}>
      {children}
    </UsersContext.Provider>
  )
}

export { UsersProvider, UsersContext }