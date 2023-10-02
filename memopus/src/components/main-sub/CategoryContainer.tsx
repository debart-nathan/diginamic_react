import React, { useEffect, useState } from "react";
import { CategoryInterface } from "../../Interface/CategoryInterface";
import { ColumnInterface } from "../../Interface/ColumnInterface";
import JsonServer from "../../services/JsonServer";
import Column from "./category-container-sub/Column";
import { CardInterface } from "../../Interface/CardInterface";

interface CategoryContainerProps {
    category: CategoryInterface;
    cards : CardInterface[];
}

const CategoryContainer: React.FC<CategoryContainerProps> = ({ category, cards }) => {
    const jsonServer = JsonServer.getInstance();
    const [columns, setColumns] = useState<ColumnInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const result = await jsonServer.getData("columns");
            setColumns(result);
            setIsLoading(false);
        };

        fetchData();
    }, [jsonServer]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const getCardsForColumn = (columnId: number) => {
        return cards.filter(card => card.column === columnId);
    }

    return (
        <div>
            <h2 className="mb-4">{category.name}</h2>
            <section className="row g-4 p-2">
                {columns.map((column) => {
                    const columnCards = getCardsForColumn(column.id);
                    return (
                        <div className="col-3">
                            <Column column={column} cards={columnCards} />
                        </div>
                    );
                })}
            </section>
        </div>
    );
};
export default CategoryContainer;