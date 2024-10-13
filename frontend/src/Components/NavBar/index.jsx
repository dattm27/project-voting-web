import './index.scss'
import logo from "../../Assets/images/logo-voting.png";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


function NavBar() {
    return ( 
        <nav className="nav-bar glassmophsism">
        <Link className="nav-tab" to="/">
        <img style={{ height: "60px" }} src={logo} />
        </Link>

        <div className="nav-tabs">
          <Link className="nav-tab" to="/">Home Page</Link>
          <Link className="nav-tab" to='/login'>Login Page</Link>
          <Link className="nav-tab" to='/votes'>Vote Page</Link>
        </div>
      </nav>
     );
}

export default NavBar;