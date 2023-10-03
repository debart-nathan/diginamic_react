import React from 'react';

interface HeaderProps {
    onLogout: () => void;
    isConnected: boolean;
}

const Header: React.FC<HeaderProps> = ({ onLogout, isConnected }) => {
    return (
        <header className='navbar navbar-dark bg-dark justify-content-center'>
            <div className="container-fluid d-flex justify-content-center">
                <h1 className="navbar-brand mb-0 h1 fw-bold">memopus</h1>
                {isConnected && <button className="btn btn-outline-light position-absolute end-0">Log out</button>}
            </div>
        </header>
    );
}

export default Header;