import { useSDK } from "@metamask/sdk-react";
import React, { useState } from "react";
import './LoginPage.scss';
import model from '../../Assets/images/3d-model.png';

function LoginPage() {
  const [account, setAccount] = useState();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      if (accounts?.length) {
        setAccount(accounts[0])
        setLogin(accounts[0])
        localStorage.setItem("wallet_addr", accounts[0]);
      } else {
        console.warn("No accounts found.");
      }
    } catch (err) {
      console.error("Failed to connect:", err);
      alert("MetaMask connection failed. Please try again.");
    }
  };

  return (
    <div className="login-container"> 
        <div className="login-container-card">
          <div className="login-card">

          <h1 className="login-title">Unlock New Horizons <br></br> Login to Explore!</h1>
            <button className="btn" onClick={connect}>
              {connecting ? "Connecting..." : "Connect"}
            </button>
            {connected && (
              <div className="details">
                {chainId && <p>Connected chain: {chainId}</p>}
                {account ? (
                  <p>Connected account: {account}</p>
                ) : (
                  <p>No account connected</p>
                )}
              </div>
            )}
          </div>
        </div>
        <img src={model} alt="3D model" />
    </div>
  );
}

export default LoginPage;
