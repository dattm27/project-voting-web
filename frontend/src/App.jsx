import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GradientBg from "./Components/GradientBg";
import { publicRoutes } from './Routes'
import { WagmiProvider } from "wagmi";
import { config } from "./Services/web3Config";
function App() {
  
  return (
    <WagmiProvider config = {config}>
      <Router>
      <div className="App">
        <GradientBg />
        <Routes>
          {
            publicRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route key={index} path={route.path} element={ 
                                    
                    <Page/>
                }/>
              )
            }
            )
          }
        </Routes>
      </div>
    </Router>
    </WagmiProvider>
    
  );
};

export default App;
