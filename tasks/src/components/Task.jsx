const Task = ({ task, onClickDone, onClickDelete }) => {
    return (
        <section className="d-flex justify-content-between my-3 ">
            <h2 className={task.done ? "text-decoration-line-through" : ""}>{task.title}</h2>
            <div className="d-flex gap-3">
                <button
                    className={"btn btn-success"}
                    onClick={() => { onClickDone(task.id); }}
                >
                    {task.done ? "Invalidé" : "Validé"}
                </button>
                <button className="btn btn-danger"
                    onClick={() => { onClickDelete(task.id); }}>
                    Supprimer
                </button>
            </div>

        </section>
    );
}

export default Task;