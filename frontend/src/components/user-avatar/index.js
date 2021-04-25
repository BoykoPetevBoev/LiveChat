import React from 'react';
import styles from './index.module.css';

function UserLogo({ username, image }) {

    if (!username) return null;

    return (
        <div className={styles.img} >
            <p>{username[0]}</p>
        </div>
    );
}

export default UserLogo;