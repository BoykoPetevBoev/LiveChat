import React from 'react';
import styles from './index.module.css';
import UserBadge from '../../components/user-badge';

function UsersList({ users, heading, buttons, empty }) {
    return (
        <div className={styles.container}>
            <p className={styles.heading}>{heading}</p>
            <div className={styles.friends}>    {
                !users || users.length === 0
                ? <p>{empty}</p>
                : users.map((user) => <UserBadge user={user} {...buttons} key={user._id} />)
            }</div>
        </div>
    )
}

export default UsersList