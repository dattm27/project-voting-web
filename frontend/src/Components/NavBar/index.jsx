

import { useState, useEffect } from 'react';
import { app_logo as Logo } from "../../Assets";
import styles from './Navbar.module.scss';
import { Link, useLocation } from "react-router-dom";
import { search, createVote, homeIcon } from '../../Assets';

import { ConnectButton,darkTheme } from "thirdweb/react";
import { createWallet, inAppWallet} from "thirdweb/wallets";
import { client } from '../../Utils/constant.js';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('');
    // const [account, setAccount] = useState();
    const location = useLocation();
    const wallets = [
        inAppWallet({
            auth: {
                options: ["passkey", "google", "x"],
            },
        }),
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
                setActiveTab('votes');
                break;
            default:
                setActiveTab('no-active');
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

            <div className={styles.navRight}>
                <div >
                    <ConnectButton
                        client={client}
                        wallets={wallets}
                        theme={darkTheme({
                            colors: {
                                primaryButtonBg: "hsl(112, 72%, 33%)",
                                primaryButtonText: "hsl(0, 0%, 100%)",
                            },
                        })}
                        connectModal={{ size: "compact" }}
                        // className={styles.transactBtn}
                    />
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

