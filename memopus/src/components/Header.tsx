import React from 'react';

interface HeaderProps {
    onLogout: () => void;
    isConnected: boolean;
}

const Header: React.FC<HeaderProps> = ({ onLogout, isConnected }) => {
    return (
        <header className='bg-dark'>
            <h1>memopus</h1>
            {isConnected && <button onClick={onLogout}>Log out</button>}
        </header>
    );
}

export default Header;