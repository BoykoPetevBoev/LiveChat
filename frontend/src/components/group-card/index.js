import React from 'react';
import styles from './index.module.css';
import UserAvatar from '../user-avatar';

function GroupCard({ room }) {

    return (
        <div className={styles.friend}>
            <UserAvatar username={room?.name} />
            <div className={styles.username}>
                {room ? <p>{room?.name}</p> : null}
            </div>
        </div>
    )
}

export default GroupCard;