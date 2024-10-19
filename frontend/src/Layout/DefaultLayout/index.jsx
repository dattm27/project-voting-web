import { Fragment, useState } from "react";
import NavBar from "../../Components/NavBar";
import './index.scss'

function DefaultLayout({ children, login }) {
    

    return (
        <Fragment>
            
            <div className="default-layout">
                <NavBar login={login} />
                <div className="main-layout">
                    {children}
                </div>  
            </div>
        </Fragment>
    );
}

export default DefaultLayout;