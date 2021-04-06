import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import UserAvatar from '../user-avatar';

function UserBadge(props) {
    const [user, setUser] = useState(props.user);

    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    return (
        <div className={styles.wrapper}>

            <UserAvatar username={user.username}/>
            <p className={styles.username}>{user.username}</p>
            <p>{user.email}</p>

            {typeof props.addUser === 'function'
                ? <button className={styles.btn} onClick={props.addUser} value={user._id}>+ Add User</button>
                : null}
            {typeof props.confirm === 'function'
                ? <button className={styles.btn} onClick={props.confirm} value={user._id}>Confirm</button>
                : null}
            {typeof props.delete === 'function'
                ? <button className={styles.btn2} onClick={props.delete} value={user._id}>Delete</button>
                : null}
            {typeof props.remove === 'function'
                ? <button className={styles.btn2} onClick={props.remove} value={user._id}>Remove</button>
                : null}

        </div>
    );
}

export default UserBadge;