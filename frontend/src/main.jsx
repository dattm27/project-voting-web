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
      <App/>
    </GlobalStyles>
  </React.StrictMode>

);