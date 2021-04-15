import React from 'react';
import styles from './index.module.css';
import UserCard from '../user-card';

function UserBadge({user, add, confirm, remove}) {

    if(!user) return null;
    return (
        <div className={styles.wrapper}>
            
            <UserCard user={user}/>

            {typeof add === 'function'
                ? <button className={styles.btn} onClick={add} value={user._id}>+ Add</button>
                : null}
            {typeof confirm === 'function'
                ? <button className={styles.btn} onClick={confirm} value={user._id}>Confirm</button>
                : null}
            {typeof remove === 'function'
                ? <button className={styles.btn2} onClick={remove} value={user._id}>Remove</button>
                : null}

        </div>
    );
}

export default UserBadge;