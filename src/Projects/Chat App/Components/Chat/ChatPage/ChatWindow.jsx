import MessageInput from "./MessageInput.jsx";
import MessageList from "./MessageList.jsx";

function ChatWindow({ chatId }) {
  return (
    <div className='flex flex-col justify-between flex-1 h-screen'>
      <MessageList chatId={chatId} />
      <MessageInput chatId={chatId} />
    </div>
  )
}

export default ChatWindow