import { Fragment } from "react";
import GradientBg from "../../Components/GradientBg";
import NavBar from "../../Components/NavBar";
import './index.scss'

function DefaultLayout({ children }) {
    return (
        <Fragment>
            <GradientBg />
            <div className="default-layout">
                <NavBar/>
                <div className="nav1"></div>
                <div className="main-layout">
                    {children}
                </div>
            </div>
        </Fragment>
    );
}

export default DefaultLayout;