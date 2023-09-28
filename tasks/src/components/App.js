import { useState, useEffect } from "react";
import Task from "./Task";
import JsonServer from '../services/JsonServer';
import FormNewTask from "./FormNewTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadRemoteTasks();
  }, []);

  async function loadRemoteTasks() {
    try {
      const loaded_tasks = await JsonServer.loadTasks()
      setTasks(loaded_tasks)
    } catch (error) {
      setError("Erreur attrapé dans loadTasks" + error)
    }
  }

  async function handleClickDone(task_id) {
    let updatedDoneStatus;

    const updatedTasks = tasks.map(task => {
      if (task.id === task_id) {
        updatedDoneStatus = !task.done;
        return { ...task, done: updatedDoneStatus };
      }
      return task;
    });

    setTasks(updatedTasks);

    try {
      await JsonServer.patchRemoteTaskDone(task_id, updatedDoneStatus)
    } catch (error) {
      setError("Erreur validation de tache " + task_id + " " + error);
      loadRemoteTasks();
    }
  }

  function handleClickDelete(task_id) {
    const newTasks = tasks.filter(task => task.id !== task_id);
    setTasks(newTasks);

    JsonServer.deleteRemoteTask(task_id).catch(error => {
      setError("Erreur attrapé dans handleClickDelete " + task_id + " " + error);
      loadRemoteTasks();
    })
  }

  async function handleSubmitNewTask(formData) {
    const tempId = Math.max(...tasks.map(task => task.id)) + 1;
    const newTask = { id: tempId, title: formData.get('new-task-title'), done: false };

    setTasks(prevTasks => [...prevTasks, newTask]);

    try {
      const newRemoteTask = await JsonServer.addRemoteTask(newTask);
      setTasks(prevTasks => prevTasks.map(task => task.id === tempId ? newRemoteTask : task));
    } catch (error) {
      setError("Erreur insertion de nouvelle tache");
      setTasks(prevTasks => prevTasks.filter(task => task.id !== tempId));
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
      {[...tasks]
        .sort((a, b) => a.done - b.done)
        .map((task) => {
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