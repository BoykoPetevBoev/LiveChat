import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import UserList from '../user-list';

function UserBadge(props) {

    const [user, setUser] = useState(props.user);

    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    if(!user) return null;

    return (
        <div className={styles.wrapper}>
            
            <UserList user={user}/>

            {typeof props.addUser === 'function'
                ? <button className={styles.btn} onClick={props.addUser} value={user._id}>+ Add User</button>
                : null}
            {typeof props.confirm === 'function'
                ? <button className={styles.btn} onClick={props.confirm} value={user._id}>Confirm</button>
                : null}
            {typeof props.delete === 'function'
                ? <button className={styles.btn2} onClick={props.delete} value={user._id}>Delete</button>
                : null}
            {typeof props.remove === 'function'
                ? <button className={styles.btn2} onClick={props.remove} value={user._id}>Remove</button>
                : null}

        </div>
    );
}

export default UserBadge;