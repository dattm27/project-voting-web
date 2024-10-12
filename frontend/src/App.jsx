import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";

import GlassContainer from "./Components/GlassContainer/index.jsx";
import CircleIcon from "./Components/CircleIcon/index.jsx"

import './App.css';  // Import the CSS file

export const App = () => {
  const [account, setAccount] = useState();
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
      <GlassContainer>
      <GlassContainer>
        
      </GlassContainer>
        <h2>Creating Voting With Us</h2>
        <div>
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

      </GlassContainer>
    </div>
  );
};
