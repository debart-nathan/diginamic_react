import { CardInterface } from "../../../Interface/CardInterface";
import { ColumnInterface } from "../../../Interface/ColumnInterface";
import Card from "./column-sub/Card";

interface ColumnProps {
    column: ColumnInterface;
    cards: CardInterface[];
    moveCardToNextColumn: (cardId: number) => void;
    moveCardToPrevColumn: (cardId: number) => void;
}

const Column: React.FC<ColumnProps> = ({
    column,
    cards,
    moveCardToNextColumn,
    moveCardToPrevColumn,
}) => {
    return (
        <section>
            <div className="d-flex flex-columns gap-4">
                <div>
                    <button className="btn btn-success">+</button>
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
