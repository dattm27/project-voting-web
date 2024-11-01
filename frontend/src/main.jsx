import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "./Components/GlobalStyles";
import { MetaMaskProvider } from "@metamask/sdk-react";
const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <GlobalStyles>
      <MetaMaskProvider
        debug={true}
        sdkOptions={{
          dappMetadata: {
            name: "Example React Dapp",
            url: window.location.href,
          },
          infuraAPIKey: import.meta.env.VITE_INFURA_API_KEY,
        }}
      >

        <App />
      </MetaMaskProvider>
    </GlobalStyles>
  </React.StrictMode>

);
