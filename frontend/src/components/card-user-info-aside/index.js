import React from 'react';
import styles from './index.module.css';
import CardInfo from '../card-info';
import { Link } from 'react-router-dom';

function UserCardCompact({ user, chatId }) {
    if (!user) return null
    return (
        <div className={styles.container} >
            <div className={styles['img-holder']} style={user.image ? { backgroundImage: `url(${user?.image})` } : null}>
                <Link to={`/chat/${chatId}`}>
                    <h3>{user.username}</h3>
                </Link>
            </div>

            <div className={styles['info-holder']}>
                <CardInfo data={user} />
            </div>
        </div>
    )
}

export default UserCardCompact;