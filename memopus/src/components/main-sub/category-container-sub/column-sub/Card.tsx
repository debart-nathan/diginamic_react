import { FC } from "react";
import { CardInterface } from "../../../../Interface/CardInterface";

interface CardProps {
    card: CardInterface;
    moveCardToNextColumn: (cardId: number) => void;
    moveCardToPrevColumn: (cardId: number) => void;
}

const Card: FC<CardProps> = ({
    card,
    moveCardToNextColumn,
    moveCardToPrevColumn,
}) => {
    return (
        <article className="card d-flex flex-row bg-dark text-light p2">
            <div>
                <button onClick={() => moveCardToPrevColumn(card.id)}>
                    {" < "}
                </button>
            </div>
            <div className="card-content d-flex flex-column align-center p-3 w-100">
                <h4>{card.question}</h4>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary m-2">
                        Proposer une réponse
                    </button>
                </div>
            </div>
            <div>
                <button onClick={() => moveCardToNextColumn(card.id)}>
                    {" > "}
                </button>
            </div>
        </article>
    );
};

export default Card;
