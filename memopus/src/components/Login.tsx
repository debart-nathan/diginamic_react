import React from "react";
import JsonServer from "../services/JsonServer";
import ErrorService from "../services/ErrorService";

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");
        try {
            const jsonServer = JsonServer.getInstance();

            const isValid = await jsonServer.checkCredentials(
                username as string,
                password as string
            );

            if (isValid) {
                onLogin();
            } else {
                ErrorService.setErrorMessage(
                    "Nous avons pas pue validé vos informations. Si il vous plait, vérifiez que elles soit correct "
                );
            }
        } catch (error) {
            ErrorService.setErrorMessage(
                "Nous avons rencontré une erreur en traitent votre demande. Désolé du désagrément"
            );
        }
    };

    return (
        <main className="container">
            <form
                onSubmit={handleSubmit}
                className="d-flex align-items-center justify-content-center">
                <div className="d-flex flex-column me-3">
                    <label htmlFor="login-username">login :</label>
                    <input
                        id="login-username"
                        name="username"
                        autoComplete="username"
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
                        autoComplete="current-password"
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
