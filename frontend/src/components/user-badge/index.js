import React, { useState, useContext } from 'react';
import styles from './index.module.css';

function UserBadge(props) {
    const [id, setId] = useState(props.user._id);
    const [username, setUsername] = useState(props.user.username);
    const [email, setEmail] = useState(props.user.email);

    return (
        <div className={styles.wrapper}>

            <div className={styles.img}>
                <p>{username[0]} </p>
            </div>
            <p className={styles.username}>{username}</p>
            <p>{email}</p>

            {typeof props.addUser === 'function'
                ? <button className={styles.btn} onClick={props.addUser} value={id}>+ Add User</button>
                : null}
            {typeof props.confirm === 'function'
                ? <button className={styles.btn} onClick={props.confirm} value={id}>Confirm</button>
                : null}
            {typeof props.delete === 'function'
                ? <button className={styles.btn2} onClick={props.delete} value={id}>Delete</button>
                : null}

        </div>
    );
}

export default UserBadge;