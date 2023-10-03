import { FC, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface QuizProps {
    question: string;
    answer: string;
}

const Quiz: FC<QuizProps> = ({ question, answer }) => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);

    const handleClose = () => {
        setShow(false);
        setMessage("");
        setIsCorrect(false);
    };
    const handleShow = () => setShow(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const userAnswer = formData.get('answer') as string;

        if (userAnswer === answer) {
            setMessage("Correct answer!");
            setIsCorrect(true);
        } else {
            setMessage("Incorrect answer. Try again.");
            setIsCorrect(false);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Proposer une réponse
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>{question}</Form.Label>
                            <Form.Control type="text" name="answer" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <div className={isCorrect ? "text-success" : "text-danger"}>
                            {message}
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Quiz;