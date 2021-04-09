import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

function UserAvatar({ username }) {

    if (!username) return null;

    return (
        <div className={styles.img}>
            <p>{username[0]}</p>
        </div>
    );
}

export default UserAvatar;