import React from 'react'
import {Trash2} from 'lucide-react'
function Main() {
  const [task,setTask]=React.useState('')
  const [todo,setTodo]=React.useState([])
  function addTodo(event)
  {
    if(task.trim()==='')
    {
      return null
    }
    setTodo(prev=>[...prev,{newTask:task,isCompleted:false}])
    setTask('')
    event.target.value=''
  }
 
  function deleteTodo(todoIndex)
  {
    const updatedTodo=todo.filter((_,index)=>index!==todoIndex)   
    setTodo(updatedTodo)
  }
  function toggleTodo(index)
  {
    setTodo(prev=>prev.map((todo,i)=>index===i?{...todo,isCompleted:!todo.isCompleted}:{...todo})
  )
  }

  return (  
    <main className='mt-10 px-8 pb-10 bg-[#FFF] shadow-lg rounded-lg main'>
      <div className="text-3xl font-bold mt-3 ">📝 Todo List</div>
      <div className="relative mt-4">
            <input onChange={(event)=>setTask(event.target.value)} onKeyDown={(event)=>{event.key==='Enter' && addTodo(event)}} className=" border-[1.6px] rounded-sm pl-4 w-60 py-2 shadow-lg border-[rgba(130,130,130,1)] text-black-500 focus:outline-none placeholder-[rgba(57,57,57,1)] text-lg " name="input-task" type="text" placeholder="+ Add a new task . . ."/>
            <button onClick={addTodo} className="w-15 h-11.5 text-white rounded-sm ml-4 cursor-pointer bg-[rgba(130,130,130,1)] shadow-lg">Add</button>
      </div>
      <ul className='mt-2 max-h-70 overflow-y-auto'>
        {todo.map((todo,index)=><li key={index} className={`relative flex justify-between border-2 rounded-sm px-5 py-2 mt-3  border-[rgba(130,130,130,1)] ${todo.isCompleted?'before:absolute before:content-[""] before:h-[2px] before:bg-gray-500 before:w-[86%] before:top-1/2 before:translate-y-1/2':''}`}> <span onClick={()=>toggleTodo(index)} className={`flex-1  cursor-pointer select-none text-lg ${todo.isCompleted?'opacity-60':''}`}>{todo.newTask}</span> <button className='text-red-500 cursor-pointer hover:text-red-700 ' onClick={(()=>deleteTodo(index))}><Trash2 /></button></li>)}         
      </ul>
    </main>
  
  )
}

export default Main