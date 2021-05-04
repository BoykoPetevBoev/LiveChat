import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import CardInfo from '../card-info';

function GroupCard({ room, buttons }) {
    if (!room) return null;
    return (
        <div className={styles.wrapper} style={{ backgroundImage: `url(${room.image})` }}>

            <div className={styles.name}>
                {<p>{room?.name}</p>}
            </div>

            <CardInfo data={room} />

            <div className={styles.buttons}>
                {typeof buttons?.add === 'function'
                    ? <button className={styles.btn} onClick={buttons.add} value={room._id}>+ Add</button>
                    : null}
                {typeof buttons?.confirm === 'function'
                    ? <button className={styles.btn} onClick={buttons.confirm} value={room._id}>Confirm</button>
                    : null}
                {buttons?.redirect
                    ? <Link className={styles.btn} to={`/chat/${room._id}`}>Message</Link>
                    : null}
                {typeof buttons?.remove === 'function'
                    ? <button className={styles.btn2} onClick={buttons.remove} value={room._id}>Remove</button>
                    : null}
            </div>
        </div>
    )
}

export default GroupCard;