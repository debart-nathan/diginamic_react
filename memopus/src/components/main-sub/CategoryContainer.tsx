import React, { useEffect, useState } from "react";
import { CategoryInterface } from "../../Interface/CategoryInterface";
import { ColumnInterface } from "../../Interface/ColumnInterface";
import JsonServer from "../../services/JsonServer";
import Column from "./category-container-sub/Column";
import { CardInterface } from "../../Interface/CardInterface";
import CategoryForm from "./category-nav-sub/CategoryForm";

interface CategoryContainerProps {
    category: CategoryInterface;
    cards: CardInterface[];
    addCard: (question: string, answer: string, ColumnId:number , categoryId: number) => void;
    updateCardColumn: (cardId: number, newColumn: number) => void;
    deleteCard:(id:number)=>void;
    editCard: (cardId:number,question:string,answer:string)=>void;
    deleteCategory: ()=>void;
    editCategory: (title:string)=>void;
}

const CategoryContainer: React.FC<CategoryContainerProps> = ({
    category,
    cards,
    updateCardColumn,
    addCard,
    deleteCard,
    editCard,
    deleteCategory,
    editCategory
}) => {
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
        return cards.filter((card) => card.column === columnId);
    };

    const moveCardToNextColumn = (cardId: number) => {
        const card = cards.find((card) => card.id === cardId);
        if (card) {
            const columnIndex = columns.findIndex(
                (column) => column.id === card.column
            );
            if (columnIndex !== -1 && columnIndex < columns.length - 1) {
                const nextColumn = columns[columnIndex + 1];
                updateCardColumn(cardId, nextColumn.id);
            }
        }
    };

    const moveCardToPrevColumn = (cardId: number) => {
        const card = cards.find((card) => card.id === cardId);
        if (card) {
            const columnIndex = columns.findIndex(
                (column) => column.id === card.column
            );
            if (columnIndex > 0) {
                const prevColumn = columns[columnIndex - 1];
                updateCardColumn(cardId, prevColumn.id);
            }
        }
    };

    const addCardToCurrentCategory = (question: string, answer: string, columnId:number) => {
        addCard(question, answer, columnId, category.id);
    };

    return (
        <div>
            <h2 className="mb-4">{category.name}</h2>
            <button className="btn btn-danger" onClick={deleteCategory}>Delete</button>
            <CategoryForm addCategory={editCategory} name={category.name}  formTitle="Modifier une Category" buttonText="edit" buttonVariant="warning"/>
            <section className="row g-4 p-2">
                {columns.map((column) => {
                    const columnCards = getCardsForColumn(column.id);
                    return (
                        <div className="col-3">
                            <Column
                                column={column}
                                cards={columnCards}
                                addCard={addCardToCurrentCategory}
                                moveCardToNextColumn={moveCardToNextColumn}
                                moveCardToPrevColumn={moveCardToPrevColumn}
                                deleteCard={deleteCard}
                                cardEdit={editCard}
                            />
                        </div>
                    );
                })}
            </section>
        </div>
    );
};
export default CategoryContainer;
