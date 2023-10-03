import { FC } from "react";
import { CardInterface } from "../../../../Interface/CardInterface";
import Quiz from "./Quiz";
import CardForm from "./CardForm";

interface CardProps {
    card: CardInterface;
    moveCardToNextColumn: (cardId: number) => void;
    moveCardToPrevColumn: (cardId: number) => void;
    deleteCard: (cardId: number) => void;
    cardEdit: (cardId:number,question:string,answer:string)=>void;
}

const Card: FC<CardProps> = ({
    card,
    moveCardToNextColumn,
    moveCardToPrevColumn,
    deleteCard,
    cardEdit
}) => {

    function cardEditHandler(question:string, answer:string){
        cardEdit(card.id,question,answer);
    }
    return (
        <article className="card d-flex flex-row bg-dark text-light p2 mb-3">
            <div className="d-flex flex-column">
                <button
                    className="btn btn-light"
                    onClick={() => moveCardToPrevColumn(card.id)}>
                    {" < "}
                </button>
                <CardForm cardHandler={cardEditHandler} question={card.question} answer={card.answer} formTitle="Modifier une Cate" buttonText="edit" buttonVariant="warning" />
            </div>
            <div className="card-content d-flex flex-column align-center p-3 w-100">
                <h4>{card.question}</h4>
                <div className="d-flex justify-content-center">
                    <Quiz question={card.question} answer={card.answer} />
                </div>
            </div>
            <div className="d-flex flex-column">
                <button
                    className="btn btn-light"
                    onClick={() => moveCardToNextColumn(card.id)}>
                    {" > "}
                </button>
                <button className="btn btn-danger" onClick={() => deleteCard(card.id)}>Delete</button>
                
            </div>
        </article>
    );
};

export default Card;
