import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./App";
import { MetaMaskProvider } from "@metamask/sdk-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MetaMaskProvider
      debug={true}
      sdkOptions={{
        dappMetadata: {
          name: "Example React Dapp",
          url: window.location.href,
        },
        infuraAPIKey: import.meta.env.VITE_INFURA_API_KEY,
        // Other options
      }}
    >
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);