import React from "react";
import JsonServer from "../services/JsonServer";

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');

        const jsonServer = JsonServer.getInstance();
        const isValid = await jsonServer.checkCredentials(username as string, password as string);

        if (isValid) {
            onLogin();
        }
    };

    return (
        <main className="container">
            <form onSubmit={handleSubmit} className="d-flex align-items-center justify-content-center">
                <div className="d-flex flex-column me-3">
                    <label htmlFor="login-username">login :</label>
                    <input
                        id="login-username"
                        name="username"
                        type="text"
                        required
                    />
                </div>
                <div className="d-flex flex-column me-3">
                    <label htmlFor="login-password">mot de passe :</label>
                    <input
                        id="login-password"
                        name="password"
                        type="password"
                        required
                    />
                </div>

                <button type="submit" className="mt-3 btn btn-secondary ">
                    Log in
                </button>
            </form>
        </main>
    );
};

export default Login;