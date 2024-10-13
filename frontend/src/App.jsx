import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { publicRoutes } from './Routes'
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          {
            publicRoutes.map((route, index) => {
              const Page = route.component;

              return (
                <Route key={index} path={route.path} element={                 
                    <Page />
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
