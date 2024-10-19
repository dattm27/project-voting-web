import './index.scss';
import logo from "../../Assets/images/logo-voting.png";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MetaMaskAvatar } from 'react-metamask-avatar';
import { useState } from 'react';

function NavBar() {
    const [connect, setConnect] = useState(localStorage.getItem("connect") || "connect");
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleConnect = () => {
        const newStatus = connect === "connect" ? "connected" : "connect";
        setConnect(newStatus);
        localStorage.setItem("connect", newStatus);
    };

    return (
        <nav className="nav-bar glassmophsism">
            <Link className="nav-logo" to="/">
                <img style={{ height: "60px" }} src={logo} alt="logo" />
            </Link>

            <div className={`nav-tabs ${menuOpen ? 'open' : ''}`}>
                <Link className="nav-tab" to="/">Home page</Link>
                <Link className="nav-tab" to='/votes'>Vote page</Link>
                <Link className="nav-tab" to='/login'>
                    <button 
                        onClick={toggleConnect} 
                        className={`connect_btn ${connect}`} 
                        role="button">
                        {connect.toUpperCase()}
                    </button>
                </Link>
                <MetaMaskAvatar 
                    className='accountAvatar' 
                    address={localStorage.getItem('wallet_addr')} 
                    size={36} 
                />
                <span className='accountId'>{localStorage.getItem('wallet_addr')}</span>
            </div>

            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
        </nav>
    );
}

export default NavBar;
