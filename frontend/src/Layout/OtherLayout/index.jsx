import { Fragment } from "react";
import NavBar from "../../Components/NavBar";

function OtherLayout({children}) {
    return (  
        <Fragment>
            <div className="default-layout">

            <NavBar />
            <div className="main-layout">
            {children}
            </div>
            </div>
        </Fragment>
    );
}

export default OtherLayout;