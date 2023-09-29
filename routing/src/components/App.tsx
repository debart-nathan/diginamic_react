import React from "react";
import {Outlet,Link} from "react-router-dom"

function App() {
    return (
        <div className="App">
            <header>
                <h1>Header commun</h1>
                <nav>
                    <ul  className=" d-flex list-unstyled gap-2">
                        <li>
                            <Link to="/">Accueil</Link>
                        </li>
                        <li>
                            <Link to="/articles">Article</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="container">
                <Outlet/>
            </main>
        </div>
    );
}

export default App;
