import React from 'react';
import styles from './index.module.css';
import CardWrapper from '../wrapper-card';

function BorderWrapper({  heading, children }) {
    return (
        <div className={styles.container}>
            {heading ? <p className={styles.heading}>{heading}</p> : null}
            <div className={styles.friends}>
                {children}
            </div>
        </div>
    )
}

export default BorderWrapper