import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";
import model from '../../Assets/images/3d-model.png';

import styles from './LoginPage.module.scss';

function LoginPage() {
  const [account, setAccount] = useState();
  const { sdk, connected, connecting, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      if (accounts?.length) {
        setAccount(accounts[0])
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
    <div className={styles['login-container']}>
      <div className={styles['login-container-card']}>
        <div className={styles['login-card']}>
          <h1 className={styles['login-title']}>
            Unlock New Horizons <br /> Login to Explore!
          </h1>
          <button className={styles.btn} onClick={connect}>
            {connecting ? "Connecting..." : "Connect"}
          </button>
          {connected && (
            <div className={styles.details}>
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
