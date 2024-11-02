

import { useState, useEffect } from 'react';
import { app_logo as Logo } from "../../Assets";
import styles from './Navbar.module.scss';
import { Link, useLocation } from "react-router-dom";
import { search, createVote, homeIcon } from '../../Assets';

import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { client } from '../../Utils/constant.js';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('');
    // const [account, setAccount] = useState();
    const location = useLocation();
    const wallets = [
        inAppWallet(),
        createWallet("io.metamask"),

    ];

    useEffect(() => {
        switch (location.pathname) {
            case '/create-vote':
                setActiveTab('createvote');
                break;
            case '/search':
                setActiveTab('search');
                break;
            case '/':
            default:
                setActiveTab('votes');
                break;
        }
    }, [location]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={`${styles.navbar} ${styles.glassmorphism}`}>
            <Link to='/'>
                <div className={styles.logo}>
                    <img src={Logo} alt="logo" />
                </div>
            </Link>

            <ul className={styles.navLinks}>
                <Link to="/search" onClick={() => setActiveTab("search")}>
                    <li className={`${activeTab === 'search' ? styles.active : ''}`}>
                        <img src={search} alt='icon' />
                        Search</li>
                </Link>
                <Link to="/" onClick={() => setActiveTab("votes")}>
                    <li className={`${activeTab === 'votes' ? styles.active : ''}`}>
                        <img src={homeIcon} alt='icon' />
                        Votes</li>
                </Link>
                <Link to="/create-vote" onClick={() => setActiveTab("createvote")}>
                    <li className={`${activeTab === 'createvote' ? styles.active : ''}`}>
                        <img src={createVote} alt='icon' style={{ 'maxWidth': '30px' }} />
                        Create Vote</li>
                </Link>
            </ul>

            <div className={`${styles.navRight}`}>
                <div >
                    <ConnectButton  client={client} wallets={wallets} />
                </div>
            </div>
            <div
                className={`${styles.hamburger} ${isOpen ? styles.hamburgerActive : ''}`}
                onClick={toggleMenu}
            >
                <span className={styles.line}></span>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
            </div>

            {/* Mobile Menu */}
            <div className={`${styles.menubar} ${isOpen ? styles.active : ''}`}>
                <ul>
                    <Link to="/create-vote">
                        <li>Create Vote</li>
                    </Link>
                    <Link to="/search">
                        <li>Search</li>
                    </Link>
                    <Link to="/">
                        <li>Votes</li>
                    </Link>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

