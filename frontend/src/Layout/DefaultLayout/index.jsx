import { Fragment } from "react";
import NavBar from "../../Components/NavBar";

import styles from './DefaultLayout.module.scss'

function DefaultLayout({ children, login }) {
    

    return (
        <Fragment>
            
            <div className={styles['default-layout']}>
                <NavBar login={login} />
                <div className={styles["main-layout"]}>
                    {children}
                </div>  
            </div>
        </Fragment>
    );
}

export default DefaultLayout;