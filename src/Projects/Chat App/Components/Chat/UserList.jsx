import { useContext, useState, useMemo } from 'react'
import { UsersContext } from "../../Context/UsersContext.jsx";
import { auth } from "../../Scripts/firebase.js"

// Passed in selectUser object to track currently active highlighted chat
function UserList({ selectUser, setSelectUser }) {
  const { users } = useContext(UsersContext)
  const [searchTerm, setSearchTerm] = useState("");

  const me = auth.currentUser?.uid;

  // Local filtering instead of querying the backend repeatedly
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    return users?.filter(user =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    // VITAL FIX: Removed absolute sizing (w-1/4, lg:w-1/3, min-w-[250px]). 
    // width is entirely controlled by the `Panel` resizing wrapper in ChatHome!
    <section className='flex flex-col w-full h-full bg-white select-none overflow-hidden'>

      {/* Header Profile Title & App Area */}
      <div className="p-5 pb-3 border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">Chats</h1>
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

      {/* User scroll block layout with padded floating cards instead of heavy borders */}
      <ul className='flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-1 min-h-0'>
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((user) => {
            const isActive = selectUser?.uid === user.uid;

            return (
              <li
                onClick={() => setSelectUser(user)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border border-transparent ${isActive
                  ? 'bg-blue-50 border-blue-100 shadow-[0_1px_3px_rgba(59,130,246,0.1)] scale-[0.98]'
                  : 'hover:bg-gray-50 active:scale-[0.98]'
                  }`}
                key={user.uid}
              >
                <div className="relative">
                  <img
                    src={user.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                    className={`w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 ${isActive ? 'border-transparent' : 'border-white'} shadow-sm`}
                    alt={`${user.name} avatar`}
                  />
                  {/* Subtle online indicator dot styling */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <p className={`font-semibold truncate ${isActive ? 'text-blue-700' : 'text-gray-900'}`}>
                      {user.uid === me ? "You" : user.name}
                    </p>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      Just now
                    </span>
                  </div>
                  <p className={`text-sm truncate ${isActive ? 'text-blue-500/80' : 'text-gray-500'}`}>
                    Available...
                  </p>
                </div>
              </li>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center mt-6">
            <svg className="w-12 h-12 text-gray-200 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <p className="text-gray-500 font-medium text-sm">No users found</p>
            <p className="text-gray-400 text-xs mt-1">Try a different search term</p>
          </div>
        )}
      </ul>
    </section>
  )
}

export default UserList