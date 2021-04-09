import React, { useContext, useState } from 'react';
import styles from './index.module.css';
import UserContext from '../../react/Context';
import { useHistory } from 'react-router-dom';

import Header from '../../components/header';
import Wrapper from '../../components/wrapper';
import FriendsMenu from '../../components/menu-friends';
import UserBadge from '../../components/user-badge';
import { acceptFriendRequest, removeFriendRequest } from '../../requester';

function FriendRequestsPage() {
    const history = useHistory();
    const context = useContext(UserContext);
    const [user, setUser] = useState(context.user);

    const removeUser = async (e) => {
        const id = e.target.value;
        const response = await removeFriendRequest({ user, id });
        if (!response) return;

        setUser(response);
        context.updateUser(response);
        history.push('/friends/requests');
    }

    const addFriend = async (e) => {
        const id = e.target.value;
        const response = await acceptFriendRequest({ user, id });
        if (!response) return;

        setUser(response);
        context.updateUser(response);
        history.push('/friends/all');
    }

    const RenderUsers = (props) => {
        const users = props.users
        const buttons = props.buttons
        if (!users || users.length === 0) return <p>There is no requests in this section</p>;
        return (
            users.map((user) => {
                return (<UserBadge user={user} {...buttons} key={user._id} />)
            })
        )
    }

    return (
        <div className={styles.container}>
            <Header />
            <Wrapper>
                <FriendsMenu />
                <h2>Friend Requests</h2>

                <p className={styles.heading}>Your received requests</p>
                <div className={styles.requests}>
                    <RenderUsers users={user.receivedRequests} buttons={{ confirm: addFriend, delete: removeUser }} />
                </div>

                <p className={styles.heading}>Your sent requests</p>
                <div className={styles.requests}>
                    <RenderUsers users={user.sentRequests} buttons={{ delete: removeUser }} />
                </div>
            </Wrapper>

        </div>
    );
}

export default FriendRequestsPage;