import { FC, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface NewCardFormProps {
    addCard: (question:string, answer:string ) => void;
}

const NewCardForm: FC<NewCardFormProps> = ({
    addCard,
}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const question = formData.get('question') as string;
        const answer = formData.get('answer') as string;

        addCard(question, answer);
        handleClose();
    };

    return (
        <>
            <Button variant="success"  onClick={handleShow}>
                +
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Question:</Form.Label>
                            <Form.Control type="text" name="question" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Answer:</Form.Label>
                            <Form.Control type="text" name="answer" />
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

export default NewCardForm;
