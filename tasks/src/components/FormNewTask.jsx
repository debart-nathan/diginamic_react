import React, { useRef } from 'react';

function sanitizeInput(input) {
    return input.replace(/<[^>]*>?/gm, '');
}

function FormNewTask({ onSubmit }) {
    const formRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        // Sanitize the input
        const title = sanitizeInput(formData.get('new-task-title'));
        formData.set('new-task-title', title);
        onSubmit(formData);
        // Reset the form
        formRef.current.reset();
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} className='form d-flex justify-content-around'>
            <div className='form-group d-flex'>
                <label className=' text-nowrap form-label p-3' htmlFor="new-task-title">
                    Nouvelle tache
                </label>
                <input
                    id="new-task-title"
                    name="new-task-title"
                    className="form-control"
                    type='text'
                />
            </div>
            <button
                className='btn btn-secondary'
                type="submit">
                Ajouté
            </button>
        </form>
    );
}

export default FormNewTask;