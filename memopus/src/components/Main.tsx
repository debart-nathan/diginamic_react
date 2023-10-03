import React, { useEffect, useState } from "react";
import CategoryNav from "./main-sub/CategoryNav";
import { CategoryInterface } from "./../Interface/CategoryInterface";
import CategoryContainer from "./main-sub/CategoryContainer";
import { CardInterface } from "../Interface/CardInterface";
import JsonServer from "../services/JsonServer";
import ErrorService from "../services/ErrorService";

const Main = () => {
    const [categories, setCategories] = useState<CategoryInterface[]>([]);
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
    useEffect(() => {
        const fetchTerms = async () => {
            const jsonServer = JsonServer.getInstance();
            const terms = await jsonServer.getData("terms");
            setCategories(terms);
        };
    
        fetchTerms();
    }, []);

    const updateCardColumn = async (cardId: number, newColumn: number) => {
        // Find the old card
        const oldCard = cards.find((card) => card.id === cardId);
        if (!oldCard) {
            ErrorService.setErrorMessage(
                "ERROR: Update: Could not find the card in the Display, please actualise the page"
            );
            return;
        }

        // Update the card in the state
        setCards((prevCards) => {
            const cardIndex = prevCards.findIndex((card) => card.id === cardId);
            if (cardIndex !== -1) {
                const card = prevCards[cardIndex];
                card.column = newColumn;
                return [...prevCards];
            }
            return prevCards;
        });

        try {
            // Try to update the card on the server
            const jsonServer = JsonServer.getInstance();
            await jsonServer.patchData("cards", cardId, oldCard);
        } catch (error) {
            // If the server update fails, revert the changes in the state
            ErrorService.setErrorMessage(
                "ERROR: Update: could not change the card column in the Database"
            );
            setCards((prevCards) =>
                prevCards.map((card) =>
                    card.id === oldCard.id
                        ? { ...card, column: oldCard.column }
                        : card
                )
            );
        }
    };

    const addCard = async (
        question: string,
        answer: string,
        columnId: number,
        categoryId: number
    ) => {
        const maxId = Math.max(...cards.map((card) => card.id), 0);

        const tempCard: CardInterface = {
            id: maxId + 1,
            question,
            answer,
            column: columnId,
            selected: false,
            tid: categoryId,
        };

        // Add the temporary card to the state
        setCards((prevCards) => [...prevCards, tempCard]);

        const jsonServer = JsonServer.getInstance();
        const cardData: Omit<CardInterface, "id"> = { ...tempCard };
        const createdCard = await jsonServer.postData("cards", cardData);

        // Update the id of the temporary card in the state
        setCards((prevCards) =>
            prevCards.map((card) =>
                card.id === tempCard.id ? { ...card, id: createdCard.id } : card
            )
        );
    };

    const deleteCard = async (
        cardId: number,
        confirmDelete: boolean = false
    ) => {
        if (!confirmDelete)
            confirmDelete = window.confirm(
                "Voulez vous vraiment supprimer cette carte?"
            );
        if (!confirmDelete) {
            return;
        }
        // Remove the card from the state
        const oldCard = cards.find((card) => card.id === cardId);
        if (!oldCard) {
            ErrorService.setErrorMessage(
                "ERROR: Delete: Could not find the card in the Display, please actualise the page"
            );
            return;
        }
        setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));

        try {
            // Try to delete the card from the server
            const jsonServer = JsonServer.getInstance();
            await jsonServer.deleteData("cards", cardId);
        } catch (error) {
            // If the server deletion fails, add the card back to the state
            ErrorService.setErrorMessage(
                "ERROR: Delete: could not delete the card from the Database"
            );
            setCards((prevCards) => [...prevCards, oldCard]);
        }
    };

    const editCard = async (
        cardId: number,
        newQuestion: string,
        newAnswer: string
    ) => {
        // Find the old card
        const oldCard = cards.find((card) => card.id === cardId);
        if (!oldCard) {
            ErrorService.setErrorMessage(
                "ERROR: Edit: Could not find the card in the Display, please actualise the page"
            );
            return;
        }

        // Update the card in the state
        setCards((prevCards) => {
            const cardIndex = prevCards.findIndex((card) => card.id === cardId);
            if (cardIndex !== -1) {
                const card = prevCards[cardIndex];
                card.question = newQuestion;
                card.answer = newAnswer;
                return [...prevCards];
            }
            return prevCards;
        });

        try {
            // Try to update the card on the server
            const jsonServer = JsonServer.getInstance();
            await jsonServer.patchData("cards", cardId, oldCard);
        } catch (error) {
            // If the server update fails, revert the changes in the state
            ErrorService.setErrorMessage(
                "ERROR: Edit: could not update the card in the Database"
            );
            setCards((prevCards) =>
                prevCards.map((card) =>
                    card.id === oldCard.id
                        ? {
                              ...card,
                              question: oldCard.question,
                              answer: oldCard.answer,
                          }
                        : card
                )
            );
        }
    };

    const deleteCategory = async ( confirmDelete: boolean = false) => {
        if(!category){
            return;
        }
        // Find all cards in the category
        const categoryCards = cards.filter((card) => card.tid === category.id);
    
        // Ask for confirmation, indicating the number of cards in the category
        if (!confirmDelete)
            confirmDelete = window.confirm(
                `Are you sure you want to delete this category? It contains ${categoryCards.length} cards.`
            );
        if (!confirmDelete) {
            return;
        }
    
        // Delete all cards in the category
        for (const card of categoryCards) {
            await deleteCard(card.id, true);
        }
    
        // Delete the category from the server
        try {
            const jsonServer = JsonServer.getInstance();
            await jsonServer.deleteData("terms", category.id);
        } catch (error) {
            // If the server deletion fails, show an error message
            ErrorService.setErrorMessage(
                "ERROR: Delete: could not delete the category from the Database"
            );
        }
    };

    const editCategory = async ( newTitle: string) => {
        if(!category){
            return;
        }
        // Find the old category
        const oldCategory = categories.find((categoryE) => categoryE.id === category.id);
        if (!oldCategory) {
            ErrorService.setErrorMessage(
                "ERROR: Edit: Could not find the category in the Display, please actualise the page"
            );
            return;
        }
    
        // Update the category in the state
        setCategories((prevCategories:CategoryInterface[]) => {
            const categoryIndex = prevCategories.findIndex((categoryE) => categoryE.id === category.id);
            if (categoryIndex !== -1) {
                const category = prevCategories[categoryIndex];
                category.name = newTitle;
                return [...prevCategories];
            }
            return prevCategories;
        });
    
        try {
            // Try to update the category on the server
            const jsonServer = JsonServer.getInstance();
            await jsonServer.patchData("terms", category.id, oldCategory);
        } catch (error) {
            // If the server update fails, revert the changes in the state
            ErrorService.setErrorMessage(
                "ERROR: Edit: could not update the category in the Database"
            );
            setCategories((prevCategories:CategoryInterface[]) =>
                prevCategories.map((category:CategoryInterface) =>
                    category.id === oldCategory.id
                        ? {
                              ...category,
                              name: oldCategory.name,
                          }
                        : category
                )
            );
        }
    };

    return (
        <main className="px-5">
            <CategoryNav setCategory={setCategory} category={category} terms={categories} setTerms={setCategories} />
            {category && (
                <CategoryContainer
                    category={category}
                    cards={cards.filter((card) => card.tid === category.id)}
                    addCard={addCard}
                    updateCardColumn={updateCardColumn}
                    deleteCard={deleteCard}
                    editCard={editCard}
                    deleteCategory={deleteCategory}
                    editCategory={editCategory}
                />
            )}
        </main>
    );
};

export default Main;
