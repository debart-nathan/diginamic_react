
import { useState, useEffect } from "react";
import Task from "./Task";
import JsonServer from '../services/JsonServer';

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(
    () => {
      (async () => {
        try {
          const loaded_tasks = await JsonServer.loadTasks()
          setTasks(loaded_tasks)
        } catch (error) {
          setError("Erreur attrapé dans loadTasks" + error)
          console.error("Erreur attrapé dans loadTasks" + error)
        }

      })();
    },
    []
  );

  function handleClickDone(task_id) {
    console.log(`Dans handleClickDone`, task_id);
    const copy_tasks = tasks.map(task => {
      if (task.id === task_id) {
        task.done = !task.done;
      }
      return task;
    });
    setTasks(tasks => copy_tasks);
  }

  async function handleClickDelete(task_id) {
    try {
        JsonServer.deleteRemoteTask(task_id);
    } catch (error) {
      setError("Erreur attrapé dans handleClickDelete " + task_id + " " + error)
      console.error("Erreur attrapé dans handleClickDelete " + task_id + " " + error)
    }
  }

  return (
    <div className="App container">
      <h1>Gestion des tâches</h1>
      {error && (<h2 className=" text-danger">{error}</h2>)}
      {tasks.map((task) => {
        return <Task
          key={task.id}
          task={task}
          onClickDone={handleClickDone}
          onClickDelete={handleClickDelete}
        />
      })}
    </div>
  );
}

export default App;
