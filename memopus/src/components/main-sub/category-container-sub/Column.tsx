import { CardInterface } from "../../../Interface/CardInterface";
import { ColumnInterface } from "../../../Interface/ColumnInterface";
import Card from "./column-sub/Card";
import NewCardForm from "./column-sub/NewCardForm";

interface ColumnProps {
    column: ColumnInterface;
    cards: CardInterface[];
    addCard: (question:string, answer:string, columnId: number ) => void;
    moveCardToNextColumn: (cardId: number) => void;
    moveCardToPrevColumn: (cardId: number) => void;
}
const Column: React.FC<ColumnProps> = ({
    column,
    cards,
    addCard,
    moveCardToNextColumn,
    moveCardToPrevColumn,
}) => {

    const addCardToCurrentColumn = (question: string, answer: string) => {
        addCard(question, answer, column.id);
    };
    
    <NewCardForm addCard={addCardToCurrentColumn}/>
    return (
        <section>
            <div className="d-flex flex-columns gap-4">
                <div>
                    <NewCardForm addCard={addCardToCurrentColumn}/>
                </div>

                <h3>{column.label}</h3>
            </div>

            <section>
                {cards.map((card) => (
                    <Card
                        card={card}
                        moveCardToNextColumn={moveCardToNextColumn}
                        moveCardToPrevColumn={moveCardToPrevColumn}
                    />
                ))}
            </section>
        </section>
    );
};

export default Column;
