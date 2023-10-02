import React, { useState } from 'react';
import CategoryNav from "./main-sub/CategoryNav";
import { CategoryInterface } from './../Interface/CategoryInterface';
import CategoryContainer from './main-sub/CategoryContainer';

const Main = () => {
    const [category, setCategory] = useState<CategoryInterface | null>(null);

    return (
        <main className='container'>
            <CategoryNav setCategory={setCategory} category={category}/>
            <CategoryContainer category={(category)}/>
        </main>
    );
}

export default Main;