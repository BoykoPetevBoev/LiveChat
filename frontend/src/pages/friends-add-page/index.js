import React, { useState, useContext } from 'react';
import styles from './index.module.css';
import Header from '../../components/header';
import Input from '../../components/user-input';
import SubmitButton from '../../components/user-submit-button';
import UserContext from '../../react/Context';
import { findUsers } from '../../utils/requester';
import Wrapper from '../../components/wrapper';

import FriendsMenu from '../../components/menu-friends';
import UserBadge from '../../components/user-badge';



function AddFriendsPage() {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);
    const context = useContext(UserContext);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!username) return;
        sendRequest(username);
    }

    const sendRequest = async (username) => {
        const response = await findUsers(username);
        setUsers(response);
    }

    const renderUsers = () => {
        if (users.length === 0) return <p>Find Friends</p>;

        return (
            users.map((user, index) => {
                if (
                    context?.user?._id === user._id ||
                    context?.user?.friendRequests?.includes(user._id) ||
                    context?.user?.friendSend?.includes(user._id)
                ) return null;
                return (<UserBadge user={user} />)
            })
        )
    }

    return (
        <div className={styles["container"]}>
            <Header />
            <Wrapper>
                <FriendsMenu />
                <h3>Add Friend</h3>

                <div className={styles['form-holder']}>
                    <form onSubmit={onSubmit}>
                        <Input
                            name="username"
                            type="text"
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <SubmitButton value='Search' />
                    </form>
                </div>

                <div className={styles['result-holder']}>
                    {renderUsers()}
                </div>

            </Wrapper>
        </div>
    );
}

export default AddFriendsPage;