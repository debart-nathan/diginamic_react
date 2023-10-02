import React, { useEffect, useState } from "react";
import { CategoryInterface } from "./../../Interface/CategoryInterface";
import JsonServer from "../../services/JsonServer";
import NewCategoryForm from './category-nav-sub/NewCategoryForm';

interface CategoryNavProps {
    setCategory: (category: CategoryInterface) => void;
    category: CategoryInterface | null;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ setCategory, category }) => {
    const [terms, setTerms] = useState<CategoryInterface[]>([]);
    const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);

    useEffect(() => {
        const fetchTerms = async () => {
            const jsonServer = JsonServer.getInstance();
            const terms = await jsonServer.getData("terms");
            setTerms(terms);
        };

        fetchTerms();
    }, []);

    const handleOpenModal = () => {
        setIsNewCategoryModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsNewCategoryModalOpen(false);
    };

    return (
        <div className="d-flex justify-content-center m-4 p-1 gap-4">
            <div>
                <button className="btn btn-success" onClick={handleOpenModal}>+</button>
                <NewCategoryForm
                    isOpen={isNewCategoryModalOpen}
                    onClose={handleCloseModal}
                />
            </div>
            {terms.map((term) => (
                <button 
                    key={term.id} 
                    onClick={() => setCategory(term)}
                    className={`btn ${category && category.id === term.id ? 'btn-primary text-dark' : 'btn-dark'}`}
                >
                    {term.name}
                </button>
            ))}
        </div>
    );
};

export default CategoryNav;
