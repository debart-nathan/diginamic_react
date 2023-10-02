import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/"></Route>
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
