import React from 'react'
import {ref , onValue , query , limitToLast ,orderByChild,endBefore} from "firebase/database";
import { db , auth } from '../../../Scripts/firebase';
import formatTime from '../../../Utils/time';

function MessageList({chatId}) {
  const [messages,setMessages]=React.useState(null)
  const currentUser=auth.currentUser.uid
  const scrollElement=React.useRef() 
  const [scroll,setScroll]=React.useState(null)
  const [lastVisible,setLastVisible]=React.useState(null)

  React.useEffect(()=>
  {
    const chatRef=ref(db,`chats/${chatId}/messages`);
    const messagesQuery=query(chatRef, limitToLast(15));
    const unsubscribe=onValue(messagesQuery,(snapShot)=>
    {
        const data=snapShot.val() || {};
        const parsed=Object.values(data);
       
        if(parsed.length>0)
        {
          setLastVisible(parsed[0].timestamp)
        }
        setMessages(parsed);
        setScroll(true)
       
    })
    
    return ()=> unsubscribe()
  }     
  ,[chatId])



const loadOlderMessage=()=>
{
   const chatRef=ref(db,`chats/${chatId}/messages`);
   const messagesQuery=query(chatRef,endBefore(lastVisible),limitToLast(15));
   const unSubscribe=onValue(messagesQuery,(snapshot)=>
  {
    const data=snapshot.val() || {}
    console.log(data)
    const parsed=Object.values(data)
    setMessages(prev=>[...prev,...parsed])
  })
  return ()=>unSubscribe()
}
console.log(messages)
const handleScroll=(event)=>
{
  if(event.target.scrollTop===0) loadOlderMessage()
  setScroll(false)
}
 
React.useEffect(()=>
{
  if(messages && scrollElement)
  {
    scrollElement.current.scrollIntoView(true,{behavior:"smooth"})
  }
},[scroll])
  return (
    <>
       {messages?
       <ul onScroll={handleScroll} className='pt-5  pl-5 pr-5 overflow-y-auto '>
          {messages.map((message)=>

          <li className={`flex mb-2 ${message.senderId===currentUser?"justify-end":"justify-start"}`} key={message.id}>
            <div className={`px-4 py-[8px] rounded-2xl max-w-[700px] bg-[rgb(15,234,15)] text-white `}>
              <p className='inline-block'>{message.message}</p>
              <p className='ml-3 text-[14px] text-[rgb(230,230,230)] mt-[2px] inline-block'>{formatTime(message.timestamp)}</p>

            </div>
          </li>
          
          )}
          <p ref={scrollElement}></p>
        </ul>:<p>Loading... </p>}
    </>
    
  )
}

export default MessageList
