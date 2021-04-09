import React from 'react';
import styles from './index.module.css';

function Loading(props) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <p className={styles.msg}>Loading...</p>
            </div>
        </div>
    );
}

export default Loading;