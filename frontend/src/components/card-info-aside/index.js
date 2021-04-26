import React from 'react';
import styles from './index.module.css';
import UserLogo from '../user-avatar';
import UserCardInfo from '../card-info';

function UserCardCompact({ user }) {
    if (!user) return null
    return (
        <div className={styles.container} style={user.image ? { backgroundImage: `url(${user?.image})` } : null}>
            <div className={styles['img-holder']} >
                <UserLogo username={user?.username} image={user.image} />
            </div>
            <div className={styles['info-holder']}>
                <UserCardInfo data={user} />
            </div>
        </div>
    )
}

export default UserCardCompact;