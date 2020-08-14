import React from 'react';
import styles from './index.module.css';

function Loading(props) {
    return (
        <div className={styles.background}>
            <p className={styles.msg}>Loading...</p>
        </div>
    );
}

export default Loading;