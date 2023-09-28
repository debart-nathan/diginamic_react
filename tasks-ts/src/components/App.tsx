import { useState, useEffect } from "react";
import Task from "./Task";
import JsonServer from '../services/JsonServer';
import FormNewTask from "./FormNewTask";
import TaskInterface from "../interfaces/TaskInterface";

function App():React.JSX.Element {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadRemoteTasks();
  }, []);

  async function loadRemoteTasks():Promise<void> {
    try {
      const loaded_tasks :TaskInterface[] = await JsonServer.loadTasks()
      setTasks(loaded_tasks)
    } catch (er) {
      setError("Erreur attrapé dans loadTasks" + er)
    }
  }

  async function handleClickDone(task_id:number):Promise<void> {
    let updatedDoneStatus : boolean =false;

    const updatedTasks :TaskInterface[] = tasks.map(task => {
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

  function handleClickDelete(task_id:number):void {
    const newTasks: TaskInterface[] = tasks.filter(task => task.id !== task_id);
    setTasks(newTasks);

    JsonServer.deleteRemoteTask(task_id).catch(error => {
      setError("Erreur attrapé dans handleClickDelete " + task_id + " " + error);
      loadRemoteTasks();
    })
  }

  async function handleSubmitNewTask(title:string):Promise<void> {
    const tempId :number = Math.max(...tasks.map(task => task.id)) + 1;
    const newTask :TaskInterface = { id: tempId, title: title, done: false };

    setTasks((prevTasks):TaskInterface[] => [...prevTasks, newTask]);

    try {
      const newRemoteTask :TaskInterface = await JsonServer.addRemoteTask(newTask);
      setTasks(prevTasks => prevTasks.map(task => task.id === tempId ? newRemoteTask : task));
    } catch (err) {
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
        setError={setError}
      />
      {[...tasks]
        .sort((a:TaskInterface, b:TaskInterface) => Number(a.done) - Number(b.done))
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