import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import UserCardInfo from '../card-info';

function UserCard({ user, buttons, id }) {

    if (!user?._id) return null;
    return (
        <div className={styles.wrapper} style={{ backgroundImage: `url(${user.image})` }}>

                <div className={styles.username}>
                    <p>{user?.username}</p>
                </div>

           <UserCardInfo data={user}/>
          

            <div className={styles.buttons}>
                {typeof buttons?.add === 'function'
                    ? <button className={styles.btn} onClick={buttons.add} value={user._id}>+ Add</button>
                    : null}
                {typeof buttons?.confirm === 'function'
                    ? <button className={styles.btn} onClick={buttons.confirm} value={user._id}>Confirm</button>
                    : null}
                {buttons?.redirect
                    ? <Link className={styles.btn} to={`/chat/${id}`}>Message</Link>
                    : null}
                {typeof buttons?.remove === 'function'
                    ? <button className={styles.btn2} onClick={buttons.remove} value={user._id}>Remove</button>
                    : null}
            </div>

        </div>
    );
}

export default UserCard;