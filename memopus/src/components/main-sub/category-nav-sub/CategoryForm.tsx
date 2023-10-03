import React, { FormEvent, FC, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface CategoryFormProps {
    addCategory: (name: string) => void;
    formTitle?: string;
    name?: string;
    buttonVariant?: string;
    buttonText?: string;
}

const CategoryForm: FC<CategoryFormProps> = ({
    addCategory,
    formTitle = "New Category",
    name ="",
    buttonVariant = "success",
    buttonText = "+",
}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const categoryName = formData.get("categoryName") as string;

        addCategory(categoryName);
        handleClose();
    };

    return (
        <>
            <Button variant={buttonVariant} onClick={handleShow}>
                {buttonText}
            </Button>

            <Modal
                className="d-flex flex-column justify-content-center"
                show={show}
                onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{formTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        className="d-flex flex-column justify-content-center"
                        onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Category Name:</Form.Label>
                            <Form.Control type="text" name="categoryName" defaultValue={name} required/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CategoryForm;