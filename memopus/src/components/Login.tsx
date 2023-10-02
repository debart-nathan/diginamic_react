import React from "react";
import JsonServer from "../services/JsonServer";

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        const jsonServer = JsonServer.getInstance();

        const isValid = await jsonServer.checkCredentials(username, password);

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
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="d-flex flex-column me-3">
                    <label htmlFor="login-password">mot de passe :</label>
                    <input
                        id="login-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
