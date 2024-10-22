import styles from './NavBar.module.scss';

import { app_logo } from "../../Assets/images";
import { Link } from "react-router-dom";
import { MetaMaskAvatar } from 'react-metamask-avatar';
import { useState, useEffect } from 'react';

function NavBar() {
    const [connect, setConnect] = useState(localStorage.getItem("connect") || "connect");
    const [menuOpen, setMenuOpen] = useState(false);
    const walletAddress = localStorage.getItem('wallet_addr');

    const toggleConnect = () => {
        const newStatus = connect === "connect" ? "connected" : "connect";
        setConnect(newStatus);
        localStorage.setItem("connect", newStatus);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const closeMenu = () => setMenuOpen(false);
        window.addEventListener('click', closeMenu);
        return () => window.removeEventListener('click', closeMenu);
    }, []);

    return (
        <nav className={`${styles.navBar} ${styles['nav-bar']} ${styles.glassmorphism}`}>
            <Link className={styles.navLogo} to="/">
                <img style={{ height: "60px" }} src={app_logo} alt="logo" />
            </Link>

            <div className={`${styles.navTabs} ${styles['nav-tabs']} ${menuOpen ? styles.open : ''}`}>
                <Link className={styles.navTab} to='/login'>
                    <button 
                        onClick={toggleConnect} 
                        className={`${styles['connect_btn']} ${styles.connect}`} 
                        role="button"
                        aria-pressed={connect === "connected"}>
                        {connect.toUpperCase()}
                    </button>
                </Link>
                {walletAddress && (
                    <>
                        <MetaMaskAvatar 
                            className={styles.accountAvatar} 
                            address={walletAddress} 
                            size={36} 
                        />
                        <span className={styles.accountId}>{walletAddress}</span>
                    </>
                )}
            </div>

            <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </button>
        </nav>
    );
}

export default NavBar;
