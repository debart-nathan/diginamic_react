import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import Login from "./Login";

const App: React.FC = () => {
    const [connected, setConnected] = useState<boolean>(false);

    const handleLogin = (): void => {
        setConnected(true);
    };

    const handleLogout = (): void => {
        setConnected(false);
    };

    return (
        <Router>
            <Header onLogout={handleLogout} isConnected={connected} />
            <Routes>
                {connected ? (
                    <Route path="/" element={<Main />}></Route>
                ) : (
                    <Route path="/" element={<Login onLogin={handleLogin} />}></Route>
                )}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;