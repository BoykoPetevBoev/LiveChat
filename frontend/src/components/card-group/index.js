import React from 'react';
import styles from './index.module.css';
import UserLogo from '../user-avatar';

function GroupCard({ room }) {

    return (
        <div className={styles.friend}>
            <UserLogo username={room?.name} />
            <div className={styles.username}>
                {room ? <p>{room?.name}</p> : null}
            </div>
        </div>
    )
}

export default GroupCard;