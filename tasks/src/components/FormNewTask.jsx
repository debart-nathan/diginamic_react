

function FormNewTask({ newTask, setNewTask, onSubmit }) {
    // form state will go here
    return (
        <form
            className='form d-flex w-100 justify-content-around'
            onSubmit={(event)=>{
                event.preventDefault();
                onSubmit();
            }}
        >
            <div className='form-group d-flex'>
                <label className=' text-nowrap form-label p-3' htmlFor="new-task-title">
                    Nouvelle tache
                </label>
                <input
                    id="new-task-title"
                    name="new-task-title"
                    className="form-control"
                    type='text'
                    value={newTask.title}
                    onChange={event => setNewTask(
                        (task) => {
                            const copy_task = { ...task };
                            copy_task.title = event.target.value;
                            return copy_task;
                        }
                    )} />
            </div>
            <button
                className='btn btn-secondary'
                type="submit">
                Ajouté
            </button>
        </form>
    )
}

export default FormNewTask;