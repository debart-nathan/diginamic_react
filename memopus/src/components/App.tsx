import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import Login from "./Login";
import ErrorService from "../services/ErrorService";


const App: React.FC = () => {
    const [connected, setConnected] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const subscription = ErrorService.errorMessage$.subscribe((message) => {
            setErrorMessage(message);
        });

        // Clean up the subscription on unmount
        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = (): void => {
        setConnected(true);
    };

    const handleLogout = (): void => {
        setConnected(false);
    };

    return (
        <Router>
            <Header onLogout={handleLogout} isConnected={connected} />
            {errorMessage && <div>{errorMessage}</div>}
            <Routes>
                {connected ? (
                    <Route path="/" element={<Main />}></Route>
                ) : (
                    <Route
                        path="/"
                        element={<Login onLogin={handleLogin} />}></Route>
                )}
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
