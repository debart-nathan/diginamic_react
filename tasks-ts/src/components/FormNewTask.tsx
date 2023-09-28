import React, { useRef } from "react";

function sanitizeInput(input: string): string {
    return input.replace(/<[^>]*>?/gm, "");
}

type FormNewTaskProps = {
    onSubmit: (title: string) => void;
    setError: (error: string) => void;
};
function FormNewTask({
    onSubmit,
    setError,
}: FormNewTaskProps): React.JSX.Element {
    const formRef: React.RefObject<HTMLFormElement> =
        useRef<HTMLFormElement>(null);

    const handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void = (
        event: React.FormEvent<HTMLFormElement>
    ): void => {
        event.preventDefault();
        if (formRef.current) {
            const formData: FormData = new FormData(formRef.current);
            // Sanitize the input
            let title: string | null = formData.get("new-task-title") as
                | string
                | null;
            if (title === null || title.trim() === "") {
                setError("votre tache doit avoir un titre");
                return;
            }
            title = sanitizeInput(title);
            onSubmit(title);
            // Reset the form
            formRef.current.reset();
        }
    };

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="form d-flex justify-content-around">
            <div className="form-group d-flex">
                <label
                    className=" text-nowrap form-label p-3"
                    htmlFor="new-task-title">
                    Nouvelle tache
                </label>
                <input
                    id="new-task-title"
                    name="new-task-title"
                    className="form-control"
                    type="text"
                />
            </div>
            <button className="btn btn-secondary" type="submit">
                Ajouté
            </button>
        </form>
    );
}

export default FormNewTask;
