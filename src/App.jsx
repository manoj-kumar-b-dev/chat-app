import {useState} from 'react'
export default function App() {
 const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTodos([...todos, { text: task, completed: false }]);
    setTask("");
  };

  const toggleTask = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTask = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

 
  
  return (
    <div className="bg-white/20 backdrop-blur-md shadow-lg rounded-2xl p-6 w-[90%] sm:w-[400px] text-white">
      <h1 className="text-3xl font-bold text-center mb-6">📝 To-Do List</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a new task..."
          className="flex-1 p-2 rounded-l-lg outline-none text-gray-800"
        />
        <button
          onClick={addTask}
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-lg transition"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={` flex justify-between items-center bg-white/10 p-3 rounded-lg ${
              todo.completed ? "line-through opacity-60" : ""
            }`}
          >
            <span
              onClick={() => toggleTask(index)}
              className="cursor-pointer select-none flex-1"
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTask(index)}
              className="text-red-400 hover:text-red-600 ml-3 transition"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="text-center text-sm text-white/80 mt-4">
          No tasks yet — add one!
        </p>
      )}
    </div>
  );

}

