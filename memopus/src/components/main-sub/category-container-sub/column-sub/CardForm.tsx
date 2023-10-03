import { FC, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface CardFormProps {
    cardHandler: (question:string, answer:string ) => void;
    question?: string;
    answer?: string;
    formTitle?: string;
    buttonText?: string;
    buttonVariant?: string;
}

const CardForm: FC<CardFormProps> = ({
    cardHandler,
    question = '',
    answer = '',
    formTitle= "",
    buttonText = '+',
    buttonVariant = 'success',
}) => {
    const [show, setShow] = useState(false);
    const [formQuestion, setFormQuestion] = useState(question);
    const [formAnswer, setFormAnswer] = useState(answer);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        cardHandler(formQuestion, formAnswer);
        handleClose();
    };

    return (
        <>
            <Button variant={buttonVariant} onClick={handleShow}>
                {buttonText}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Question:</Form.Label>
                            <Form.Control type="text" name="question" value={formQuestion} onChange={e => setFormQuestion(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Answer:</Form.Label>
                            <Form.Control type="text" name="answer" value={formAnswer} onChange={e => setFormAnswer(e.target.value)} />
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

export default CardForm;