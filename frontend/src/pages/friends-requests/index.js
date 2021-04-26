import React, { useContext, useState } from 'react';
import styles from './index.module.css';
import UserContext from '../../react/Context';
import { useHistory } from 'react-router-dom';

import Header from '../../components/header';
import Wrapper from '../../components/wrapper-main';
import FriendsMenu from '../../components/menu-friends';
import UsersList from '../../components/user-list';
import { acceptFriendRequest, removeFriendRequest } from '../../requester';

function FriendRequestsPage() {
    const history = useHistory();
    const context = useContext(UserContext);
    const [user, setUser] = useState(context.user);

    const removeUser = async (e) => {
        const id = e.target.value;
        if (!id) return;

        const response = await removeFriendRequest({ user, id });
        if (!response) return;

        setUser(response);
        context.updateUser(response);
        history.push('/friends/requests');
    }

    const addFriend = async (e) => {
        const id = e.target.value;
        if (!id) return;
        const response = await acceptFriendRequest({ user, id });
        if (!response) return;

        setUser(response);
        context.updateUser(response);
        history.push('/friends/all');
    }

    return (
        <div className={styles.container}>
            <Header />
            <Wrapper>
                <FriendsMenu />
                <h2>Friend Requests</h2>
                <UsersList
                    users={user.receivedRequests}
                    heading={'Your received requests'}
                    buttons={{ confirm: addFriend, remove: removeUser }}
                    empty={'There is no requests in this section'}
                    />
                <UsersList
                    users={user.sentRequests}
                    heading={'Your sent requests'}
                    buttons={{ remove: removeUser }}
                    empty={'There is no requests in this section'}
                />
            </Wrapper>

        </div>
    );
}

export default FriendRequestsPage;