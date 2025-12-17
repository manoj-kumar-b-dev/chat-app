import React, { useEffect } from 'react'
import  db  from '../Scripts/firebase'
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

function Main() {
const [message,setMessage]=React.useState("");
const [recievedMessage,setRecievedMessage]  =React.useState();
//for recieve message
React.useEffect(()=>
{
  const q=query(
    collection(db,"messages"),orderBy("time")
  );
  const unsubscribe=onSnapshot(q,(snapshot)=>
  {
    setRecievedMessage(snapshot.docs.map(doc=>({id:doc.id,...doc.data()})));
  });
  return () => unsubscribe()
},[])

//for sending message

  const sendMessage=async ()=>
  {
    if(!message) return ;
    await addDoc(collection(db,"messages"),{
      text:message,
      time:serverTimestamp()
    });
    setMessage("")
  }

  return (
    <div className='flex justify-center'>
      <main className="main w-110 h-screen relative bg-[rgba(59,250,6,1)] rounded-2xl relative">

        <section className='mt-5 ml-5'>
           <div>
             {recievedMessage?.map((data)=><p key={data.id} className='bg-white mt-3 py-2 pl-4 rounded-lg w-100'>{data.text}</p>)}
           </div>
        </section>

        <section className='absolute bottom-10 flex justify-between left-5'>
          <input id="fileInput" placeholder='hello' onChange={e=>console.log(e.target.files[0])} type="file" hidden />
          <label htmlFor="fileInput">File</label>
          <input onKeyUp={e=>e.key==="Enter"?sendMessage():"null"} onChange={(e)=>setMessage(e.target.value)} className=' outline-none pl-5 py-2 w-80 bg-[white] h-12 rounded-3xl' placeholder='hello' type="text" />
          <button onClick={sendMessage} className='cursor-pointer '>
            <img className=' rounded-3xl w-12 h-12 ml-2 h-8 object-cover' src=".\src\Projects\Chat App\Images\Send-Icon.jpg" alt="" />
          </button>
          
        </section>
      </main>

    </div>
  )
}


export default Main