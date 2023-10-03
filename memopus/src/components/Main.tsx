import React, { useEffect, useState } from "react";
import CategoryNav from "./main-sub/CategoryNav";
import { CategoryInterface } from "./../Interface/CategoryInterface";
import CategoryContainer from "./main-sub/CategoryContainer";
import { CardInterface } from "../Interface/CardInterface";
import JsonServer from "../services/JsonServer";

const Main = () => {
    const [category, setCategory] = useState<CategoryInterface | null>(null);
    const [cards, setCards] = useState<CardInterface[]>([]);
    useEffect(() => {
        const fetchCards = async () => {
            const jsonServer = JsonServer.getInstance();
            const allCards = await jsonServer.getData("cards");
            setCards(allCards);
        };

        fetchCards();
    }, []);

    const updateCardColumn = (cardId: number, newColumn: number) => {
        setCards((prevCards) => {
            const cardIndex = prevCards.findIndex((card) => card.id === cardId);
            if (cardIndex !== -1) {
                const card = prevCards[cardIndex];
                card.column = newColumn;
                return [...prevCards];
            }
            return prevCards;
        });
    };

    return (
        <main className="px-5">
            <CategoryNav setCategory={setCategory} category={category} />
            {category && (
                <CategoryContainer
                    category={category}
                    cards={cards.filter((card) => card.tid === category.id)}
                    updateCardColumn={updateCardColumn}
                />
            )}
        </main>
    );
};

export default Main;
