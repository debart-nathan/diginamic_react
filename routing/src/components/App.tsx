import React from "react";
import {Outlet} from "react-router-dom"

function App() {
    return (
        <div className="App">
            <header>
                <h1>Header commun</h1>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}

export default App;
