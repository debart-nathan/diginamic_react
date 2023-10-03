import { CardInterface } from "../../../Interface/CardInterface";
import { ColumnInterface } from "../../../Interface/ColumnInterface";
import Card from "./column-sub/Card";
import CardForm from "./column-sub/CardForm";

interface ColumnProps {
    column: ColumnInterface;
    cards: CardInterface[];
    addCard: (question:string, answer:string, columnId: number ) => void;
    moveCardToNextColumn: (cardId: number) => void;
    moveCardToPrevColumn: (cardId: number) => void;
    deleteCard: (cardId: number) => void;
    cardEdit: (cardId:number,question:string,answer:string)=>void;
}
const Column: React.FC<ColumnProps> = ({
    column,
    cards,
    addCard,
    moveCardToNextColumn,
    moveCardToPrevColumn,
    deleteCard,
    cardEdit
}) => {

    const addCardToCurrentColumn = (question: string, answer: string) => {
        addCard(question, answer, column.id);
    };
    
    <CardForm cardHandler={addCardToCurrentColumn}/>
    return (
        <section>
            <div className="d-flex flex-columns gap-4">
                <div>
                    <CardForm cardHandler={addCardToCurrentColumn} formTitle="Ajouté une nouvelle carte" />
                </div>

                <h3>{column.label}</h3>
            </div>

            <section>
                {cards.map((card) => (
                    <Card
                        card={card}
                        moveCardToNextColumn={moveCardToNextColumn}
                        moveCardToPrevColumn={moveCardToPrevColumn}
                        deleteCard={deleteCard}
                        cardEdit={cardEdit}
                    />
                ))}
            </section>
        </section>
    );
};

export default Column;
