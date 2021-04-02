import React from 'react';
import styles from './index.module.css';
import Header from '../../components/header';

function ErrorPage() {

    return (
        <div className={styles["container"]}>
            <Header />
            {/* <img className={styles.img} src={image} alt="404 NotFound" /> */}
            <h1>404 Not Found</h1>
        </div>
    );
}

export default ErrorPage;