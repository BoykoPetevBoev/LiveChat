import React from 'react';
import styles from './index.module.css';

function UserBadge(props) {
    return (
        <div className={styles.wrapper} key={props.user._id}>
            <div className={styles.img}>
                <p>{props.user.username[0]} </p></div>
            <p className={styles.username}>{props.user.username}</p>
            <p>{props.user.email}</p>
            <button className={styles.btn} value={props.user._id}>Add User</button>
        </div>
    );
}

export default UserBadge;