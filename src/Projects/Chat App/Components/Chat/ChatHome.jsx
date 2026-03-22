import React, { useMemo } from 'react'
import { auth } from '../../Scripts/firebase'
import UserList from './UserList';
import { UsersProvider } from '../../Context/UsersContext';
import ChatWindow from './ChatPage/ChatWindow.jsx';
// Standard imports for react-resizable-panels
import { Panel, Group, Separator } from "react-resizable-panels"

function ChatHome() {
  const [selectUser, setSelectUser] = React.useState(null)

  // 1. Bug Fix: Safely extract currentUser to prevent fatal crashes on initial load
  const currentUser = auth.currentUser?.uid;

  // 2. Performance: Memoize chatId to avoid unnecessary recalculations
  const chatId = useMemo(() => {
    if (!selectUser || !currentUser) return null;
    return currentUser < selectUser.uid
      ? currentUser + selectUser.uid
      : selectUser.uid + currentUser;
  }, [selectUser, currentUser]);

  // Loading state guard if auth logic hasn't resolved yet
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-500 animate-pulse">Loading your profile...</p>
      </div>
    );
  }

  return (
    // 3. UI/UX: Full height and width taking the screen natively
    <main className="h-screen w-full flex bg-white overflow-hidden text-gray-800">
      <Group direction='horizontal' className="w-full h-full">

        {/* 4. UI/UX: Sensible sizing for a sidebar (25% default vs 10%) */}
        {/* Changed minSize to 25 to ensure sidebar never shrinks down aggressively */}
        <Panel defaultSize="30%" minSize="25%" maxSize="45%" className="bg-white border-r border-gray-200">
          <UsersProvider>
            {/* Passing selectUser so the sidebar can highlight the active chat natively */}
            <UserList selectUser={selectUser} setSelectUser={setSelectUser} />
          </UsersProvider>
        </Panel>

        {/* 5. UI/UX: Interactive resize handle line */}
        <Separator className="w-1 bg-gray-200 hover:bg-blue-400 cursor-col-resize transition-colors duration-200" />

        <Panel defaultSize="70%" className="bg-gray-50 relative flex flex-col">
          {selectUser && chatId ? (
            <ChatWindow chatId={chatId} />
          ) : (
            // 6. Modern empty state design
            <div className='flex flex-col flex-1 justify-center items-center h-full p-8'>
              <div className="text-center fill-current text-gray-300 mb-4 bg-white p-6 rounded-full shadow-sm border border-gray-100">
                <svg className="w-16 h-16 mx-auto stroke-current" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700">Your Messages</h3>
              <p className="text-gray-400 mt-2 max-w-sm text-center">
                Select a user from the sidebar to view your conversation or start a new chat.
              </p>
            </div>
          )}
        </Panel>

      </Group>
    </main>
  )
}

export default ChatHome
