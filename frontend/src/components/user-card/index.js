import React from 'react';
import styles from './index.module.css';
import UserAvatar from '../user-avatar';

function UserCard({ user, room }) {

    return (
        <div className={styles.friend}>
            <UserAvatar username={user?.username || room?.name} />
            <div className={styles.username}>
                {room ? <p>{room?.name}</p> : null}
                {user ? <p>{user?.username}</p> : null}
                {user ? <p>{user?.email}</p> : null}
            </div>
        </div>
    )
}

export default UserCard;