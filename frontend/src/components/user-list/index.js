import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import UserAvatar from '../user-avatar';

function UserList(props) {
    const [user, setUser] = useState(props.user);

    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    return (
        <div className={styles.friend}>
            <UserAvatar username={user.username} />
            <div className={styles.username}>
                <p>{user.username}</p>
                <p>{user.email}</p>
            </div>
        </div>
    )
}

export default UserList;