import React from 'react';
import styles from './index.module.css';
import UserAvatar from '../user-avatar';

function UserCard({ user }) {

    return (
        <div className={styles.friend}>
            <UserAvatar username={user?.username} />
            <div className={styles.username}>
                {user ? <p>{user?.username}</p> : null}
                {user
                    ? <p>{user?.email}</p>
                    : null}
            </div>
        </div>
    )
}

export default UserCard;