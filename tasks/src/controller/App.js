
import { useState } from "react";
import Task from "./Task";

function App() {
  const [tasks, setTasks] = useState([
    { "id": 1, "title": "test", "done": false }, 
  { "id": 2, "title": "test2", "done": true }
]);
  return (
    <div className="App container">
      <h1>Gestion des tâches</h1>
      {tasks.map((task) => {
        return <Task
          key={task.id}
          task={task}
        />
      })}
    </div>
  );
}

export default App;
