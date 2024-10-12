import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";
import './App.css';  // Import the CSS file

export const App = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  return (
    <div className="App">
      <button className="button" onClick={connect}>
        {connecting ? "Connecting..." : "Connect"}
      </button>
      {connected && (
        <div className="details">
          <p>{chainId && `Connected chain: ${chainId}`}</p>
          <p>{account && `Connected account: ${account}`}</p>
        </div>
      )}
    </div>
  );
};
