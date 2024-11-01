

import { useState, useEffect } from 'react';
import { app_logo as Logo } from "../../Assets/index";  // Adjust the path as needed
import styles from './Navbar.module.scss';
import { Link, useLocation } from "react-router-dom";
import { MetaMaskAvatar } from 'react-metamask-avatar';
import { search, createVote, homeIcon } from '../../Assets/index';

import { useSDK } from "@metamask/sdk-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('');
    // const [account, setAccount] = useState();
    const location = useLocation();

    const { sdk} = useSDK();

    const connectt = async () => {
      try {
        const accounts = await sdk?.connect();
        if (accounts?.length) {
        //   setAccount(accounts[0])
          localStorage.setItem("wallet_addr", accounts[0]);
        } else {
          console.warn("No accounts found.");
        }
      } catch (err) {
        console.error("Failed to connect:", err);
        alert("MetaMask connection failed. Please try again.");
      }
    };

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

    const [connect, setConnect] = useState(localStorage.getItem("connect") || "connect");
    const walletAddress = localStorage.getItem('wallet_addr');

    const toggleConnect = () => {
        connectt();
        const newStatus = connect === "connect" ? "connected" : "connect";
        setConnect(newStatus);
        localStorage.setItem("connect", newStatus);
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
                
                    <button
                        onClick={toggleConnect}
                        className={`${styles['connect_btn']} ${connect === "connect" ? styles.connect : styles.connected}`}
                        role="button"
                        aria-pressed={connect === "connected"}>
                        {connect.toUpperCase()}
                    </button>
                {connect === "connected" && (
                    <MetaMaskAvatar
                        className={styles.accountAvatar}
                        address={walletAddress}
                        size={36}
                    />
                )}
                <span className={styles.accountId}>{walletAddress}</span>
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

