import React from "react";
import { CategoryInterface } from "./../../Interface/CategoryInterface";
import JsonServer from "../../services/JsonServer";
import NewCategoryForm from './category-nav-sub/CategoryForm';

interface CategoryNavProps {
    setCategory: (category: CategoryInterface) => void;
    category: CategoryInterface | null;
    terms: CategoryInterface[];
    setTerms: React.Dispatch<React.SetStateAction<CategoryInterface[]>>;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ setCategory, category,terms,setTerms }) => {


    function newCategory(name: string): void {
        const tempCategory: CategoryInterface = {
            id: Math.max(...terms.map((term) => term.id), 0)+ 1, // temporary id
            name: name,
            selected : false
        };
    
        // Add the temporary category to the state
        setTerms((prevTerms: CategoryInterface[])  => [...prevTerms, tempCategory]);
    
        const jsonServer = JsonServer.getInstance();
        const categoryData: Omit<CategoryInterface, 'id'> = { ...tempCategory };
        jsonServer.postData('terms', categoryData).then(createdCategory => {
            // Update the id of the temporary category in the state
            setTerms((prevTerms: CategoryInterface[]) => prevTerms.map(term => term.id === tempCategory.id ? {...term, id: createdCategory.id} : term));
        });
    }

    return (
        <div className="d-flex justify-content-center m-4 p-1 gap-4">
           
                <NewCategoryForm
                    addCategory={newCategory}
                    formTitle="Créer une catégorie"
                />
       
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
