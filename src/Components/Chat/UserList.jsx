import { useContext, useState, useMemo } from 'react'
import { UsersContext } from "../../Context/UsersContext.jsx";
import { auth } from "../../Scripts/firebase.js"
import Header from './ChatPage/Header.jsx';

function UserList({ selectUser, setSelectUser }) {
  const { users, loading } = useContext(UsersContext)
  const [searchTerm, setSearchTerm] = useState("");

  const me = auth.currentUser?.uid;

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    return users?.filter(user =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    <section className='flex flex-col w-full h-full bg-white select-none overflow-hidden'>
      <div className="px-5 py-1 pb-3 border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">Chats</h1>
        <div>
          <Header />
        </div>
      </div>

      <header className='p-4 border-b border-gray-100 bg-gray-50/50'>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input
            type="text"
            className="w-full h-10 pl-9 pr-4 text-sm bg-white outline-none border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder='Search users...'
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="text-gray-400 text-xs mt-3">Loading contacts...</p>
          </div>
        ) : (
          <ul className='space-y-1'>
            {filteredUsers?.length > 0 ? (
              filteredUsers.map((user) => (
                <li
                  key={user.uid}
                  onClick={() => setSelectUser(user)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border border-transparent hover:bg-gray-50 active:scale-[0.98] ${selectUser?.uid === user.uid ? 'bg-blue-50 border-blue-100' : ''}`}
                >
                  <div className="relative">
                    <img
                      src={user.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-white shadow-sm"
                      alt={user.name}
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <p className={`font-semibold truncate ${selectUser?.uid === user.uid ? 'text-blue-700' : 'text-gray-800'}`}>
                        {user.uid === me ? "You (Me)" : user.name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {user.uid === me ? "Keep notes to yourself" : (user.status || "Hey there!")}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center mt-6">
                <svg className="w-12 h-12 text-gray-200 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <p className="text-gray-500 font-medium text-sm">No users found</p>
                <p className="text-gray-400 text-xs mt-1">Try a different search term</p>
              </div>
            )}
          </ul>
        )}
      </div>
    </section>
  )
}

export default UserList