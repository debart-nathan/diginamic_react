
import { useState, useEffect } from "react";
import Task from "./Task";
import JsonServer from '../services/JsonServer';
import FormNewTask from "./FormNewTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(
    () => {
      loadRemoteTasks();
    },
    []
  );

  async function loadRemoteTasks() {
    try {
      const loaded_tasks = await JsonServer.loadTasks()
      setTasks(loaded_tasks)
    } catch (error) {
      setError("Erreur attrapé dans loadTasks" + error)
      console.error("Erreur attrapé dans loadTasks" + error)
    }

  }

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

  function handleClickDelete(task_id) {
    setTasks(tasks => tasks.filter(task => task.id !== task_id));

    JsonServer.deleteRemoteTask(task_id).catch(error => {
      setError("Erreur attrapé dans handleClickDelete " + task_id + " " + error)
      console.error("Erreur attrapé dans handleClickDelete " + task_id + " " + error)
      loadRemoteTasks();
    })
  }

  async function handleSubmitNewTask(formData) {
    console.log(`in handleSubmitNewTask`);
    let copy_tasks = [...tasks];
    const newTask = { title: formData.get('new-task-title'), done: false };
    copy_tasks.push({
      id: Math.max(
        copy_tasks.map(task => task.id)
      )+1,
      ...newTask
    });
    setTasks(tasks=>copy_tasks);

    try {
      await JsonServer.addRemoteTask(newTask);
    } catch (error) {
      setError("Erreur insertion de nouvelle tache");
      
    } finally {
      loadRemoteTasks();
    }
  }

  return (
    <div className="App container">
      <h1>Gestion des tâches</h1>
      {error && (<h2 className=" text-danger">{error}</h2>)}
      <FormNewTask
        key="create-task"
        onSubmit={handleSubmitNewTask}
      />
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
