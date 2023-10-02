import { CardInterface } from "../../../Interface/CardInterface";
import { ColumnInterface } from "../../../Interface/ColumnInterface";
import Card from "./column-sub/Card";

interface ColumnProps {
    column: ColumnInterface;
    cards: CardInterface[];
}

const Column: React.FC<ColumnProps> = ({ column, cards }) => {
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
                    <Card card={card} />
                ))}
            </section>
        </section>
    );
};

export default Column;
