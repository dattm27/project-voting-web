import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GradientBg from "./Components/GradientBg";
import { publicRoutes } from './Routes'


function App() {
  
  return (
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
  );
};

export default App;
