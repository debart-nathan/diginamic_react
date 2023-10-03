import React, { FormEvent, FC } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface NewCategoryFormProps {
    isOpen: boolean;
    onClose: () => void;
    newCategory: (name: string) => void;
}

const NewCategoryForm: FC<NewCategoryFormProps> = ({
    isOpen,
    onClose,
    newCategory,
}) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const categoryName = formData.get("categoryName") as string;

        newCategory(categoryName);
        onClose();
    };

    return (
        <Modal
            className="d-flex flex-column justify-content-center"
            show={isOpen}
            onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    className="d-flex flex-column justify-content-center"
                    onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Category Name:</Form.Label>
                        <Form.Control type="text" name="categoryName" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewCategoryForm;
