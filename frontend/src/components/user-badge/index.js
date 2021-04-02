import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import UserContext from '../../react/Context';
import { sendFriendRequest } from '../../utils/requester';

function UserBadge(props) {
    const [id, setId] = useState(props.user._id);
    const [username, setUsername] = useState(props.user.username);
    const [email, setEmail] = useState(props.user.email);
    const context = useContext(UserContext);
    const [user, setUser] = useState(context.user);
    const history = useHistory();

    const addUser = async () => {
        if (user._id === id ||
            user?.friends.includes(id) ||
            user?.friendRequests.includes(id)
        ) return;

        await sendFriendRequest({ user, id });
        history.push('/friends');
    }

    return (
        <div className={styles.wrapper} key={props.user._id}>

            <div className={styles.img}>
                <p>{username[0]} </p></div>
            <p className={styles.username}>{username}</p>
            <p>{email}</p>
            <button className={styles.btn} onClick={addUser}>+ Add User</button>

        </div>
    );
}

export default UserBadge;