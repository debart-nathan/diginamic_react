import React from "react";
import TaskInterface from "../interfaces/TaskInterface";

type TaskProps = {
    task: TaskInterface;
    onClickDone: (task_id: number) => Promise<void>;
    onClickDelete: (task_id: number) => void;
};

const Task = ({
    task,
    onClickDone,
    onClickDelete,
}: TaskProps): React.JSX.Element => {
    return (
        <section className="d-flex justify-content-between my-3 ">
            <h2 className={task.done ? "text-decoration-line-through" : ""}>
                {task.title}
            </h2>
            <div className="d-flex gap-3">
                <button
                    className={"btn btn-success"}
                    onClick={() => {
                        onClickDone(task.id);
                    }}>
                    {task.done ? "Invalidé" : "Validé"}
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        onClickDelete(task.id);
                    }}>
                    Supprimer
                </button>
            </div>
        </section>
    );
};

export default Task;
