import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "./Components/GlobalStyles";
import { ThirdwebProvider } from "thirdweb/react";


const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <GlobalStyles>
        <ThirdwebProvider>
          <App />
        </ThirdwebProvider>
    </GlobalStyles>
  </React.StrictMode>

);
