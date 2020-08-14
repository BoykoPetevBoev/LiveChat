import React from 'react';
import styles from './index.module.css';
import Header from '../../components/header';
import image from './404.jpg'
import { Link } from 'react-router-dom'

function ErrorPage() {

    return (
        <div className={styles["container"]}>
            <Header />
            <img className={styles.img} src={image} alt="404 NotFound" />
        </div>
    );
}

export default ErrorPage;