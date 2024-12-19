import { Fragment } from "react";
import NavBar from "../../Components/NavBar";

import styles from './DefaultLayout.module.scss'

function DefaultLayout({children}) {
    

    return (
        <Fragment>
            
            <div className={styles['default-layout']}>
                <NavBar />
                <div className={styles["main-layout"]}>
                    {children}
                </div>  
            </div>
        </Fragment>
    );
}

export default DefaultLayout;