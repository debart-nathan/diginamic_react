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
      let loaded_tasks = await JsonServer.loadTasks()

      // Sort tasks so that tasks with done are put at the end
      loaded_tasks = loaded_tasks.sort((a, b) => a.done - b.done);

      setTasks(loaded_tasks)
    } catch (error) {
      setError("Erreur attrapé dans loadTasks" + error)
    }
  }

  async function handleClickDone(task_id) {
    const taskToMoveIndex = tasks.findIndex(task => task.id === task_id);
    const taskToMove = { ...tasks[taskToMoveIndex], done: !tasks[taskToMoveIndex].done };

    const copy_tasks = tasks.filter(task => task.id !== task_id);
    if (taskToMove) {
      // If taskToMove is done, push it to the end
      if (taskToMove.done) {
        copy_tasks.push(taskToMove);
      } else {
        // Find the index of the last task with done set to false
        const insertIndex = copy_tasks.findIndex(task => task.done);

        // Insert taskToMove after the last task with done set to false
        copy_tasks.splice(insertIndex, 0, taskToMove);
      }
    }

    setTasks(copy_tasks);

    try {
      JsonServer.patchRemoteTaskDone(task_id, taskToMove.done)
    } catch (error) {
      setError("Erreur validation de tache " + task_id + " " + error);
      loadRemoteTasks();
    }
  }

  function handleClickDelete(task_id) {
    setTasks(tasks => tasks.filter(task => task.id !== task_id));

    JsonServer.deleteRemoteTask(task_id).catch(error => {
      setError("Erreur attrapé dans handleClickDelete " + task_id + " " + error)
      loadRemoteTasks();
    })
  }

  async function handleSubmitNewTask(formData) {
    const copy_tasks = [...tasks];
    const tempId = Math.max(...copy_tasks.map(task => task.id)) + 1;
    const newTask = { id: tempId, title: formData.get('new-task-title'), done: false };

    // Find the index of the last task with done set to false
    const insertIndex = copy_tasks.findIndex(task => task.done);

    // Insert newTask after the last task with done set to false
    copy_tasks.splice(insertIndex, 0, newTask);

    setTasks(copy_tasks);

    try {
      const newRemoteTask = await JsonServer.addRemoteTask(newTask);
      copy_tasks[insertIndex] = newRemoteTask;
      setTasks([...copy_tasks]);
    } catch (error) {
      setError("Erreur insertion de nouvelle tache");
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