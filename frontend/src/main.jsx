import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "./Components/GlobalStyles";
import { ThirdwebProvider } from "thirdweb/react";
import {ApolloProvider } from '@apollo/client';
import {client } from './GraphQL/client'

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <GlobalStyles>
      <ThirdwebProvider>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </ThirdwebProvider>
    </GlobalStyles>
  </React.StrictMode>

);
