import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../react/Context';
import styles from './index.module.css';
import { sendFriendRequest, findUsers } from '../../requester';

import Header from '../../components/header';
import Input from '../../components/user-input';
import SubmitButton from '../../components/submit-button';
import Wrapper from '../../components/wrapper';
import FriendsMenu from '../../components/menu-friends';
import UserBadge from '../../components/user-badge';

function AddFriendsPage() {
    const history = useHistory();
    const context = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(context.user);


    const addUser = async (e) => {
        const id = e.target.value;
        const response = await sendFriendRequest({ user, id });
        if (!response) return;

        setUser(response);
        context.updateUser(response);
        history.push('/friends/requests');
    }

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
            users.map((friend, index) => {
                if (
                    user._id === friend._id ||
                    user.sentRequests.some(u => u._id === friend._id) ||
                    user.receivedRequests.some(u => u._id === friend._id) ||
                    user.friends?.some(u => u._id === friend._id) 
                ) return null;
  
                return (<UserBadge user={friend} addUser={addUser} key={friend._id}/>)
            })
        )
    }

    return (
        <div className={styles["container"]}>
            <Header />
            <Wrapper>
                <FriendsMenu />
                <h2>Add Friend</h2>
                
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