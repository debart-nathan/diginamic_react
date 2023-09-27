const Task = ({ task }) => {
    return (
        <section className="d-flex justify-content-between my-3 ">
            <h2 className={task.done && "text-decoration-line-through" }>{task.title}</h2>
            <div className="d-flex gap-3">
                <button className={"btn btn-success"} >{task.done ? "Invalidé": "Validé" }</button>
                <button className="btn btn-danger">Supprimer</button>
            </div>

        </section>
    );
}

export default Task;