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
    
        // Call the patchData method after setCards
        const updatedCard = cards.find(card => card.id === cardId);
        if (updatedCard) {
            const jsonServer= JsonServer.getInstance();
            jsonServer.patchData('cards', cardId, updatedCard);
        }
    };

    const addCard = async (question: string, answer: string,columnId:number, categoryId: number) => {
        const maxId = Math.max(...cards.map(card => card.id), 0);
    
        const tempCard: CardInterface = {
            id: maxId + 1,
            question,
            answer,
            column: columnId,
            selected: false,
            tid: categoryId
        };
    
        // Add the temporary card to the state
        setCards(prevCards => [...prevCards, tempCard]);
    
        const jsonServer = JsonServer.getInstance();
        const cardData: Omit<CardInterface, 'id'> = { ...tempCard };
        const createdCard = await jsonServer.postData('cards', cardData);
    
        // Update the id of the temporary card in the state
        setCards(prevCards => prevCards.map(card => card.id === tempCard.id ? {...card, id: createdCard.id} : card));
    };

    return (
        <main className="px-5">
            <CategoryNav setCategory={setCategory} category={category} />
            {category && (
                <CategoryContainer
                category={category}
                cards={cards.filter((card) => card.tid === category.id)}
                addCard={addCard}
                updateCardColumn={updateCardColumn}
            />
            )}
        </main>
    );
};

export default Main;
