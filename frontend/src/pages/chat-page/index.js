import React from 'react';
import styles from './index.module.css';
import Header from '../../components/header';

function chatPage() {

    return (
        <div className={styles["container"]}>
            <Header />
            <main className={styles.main}>
                <div className={styles.aside}></div>
                <div className={styles['chat-holder']}></div>
                <div className={styles.aside}></div>
            </main>
        </div>
    );
}

export default chatPage;