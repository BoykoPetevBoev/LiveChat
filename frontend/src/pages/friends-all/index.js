import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../react/Context';
import styles from './index.module.css';

import Header from '../../components/header';
import Wrapper from '../../components/wrapper-main';
import FriendsMenu from '../../components/menu-friends';
import { removeFriend } from '../../requester';
import UsersList from '../../components/user-list';

function AllFriendsPage() {
    const history = useHistory();
    const context = useContext(UserContext);
    const [user, setUser] = useState(context.user);

    const removeFriendFromList = async (e) => {
        const id = e.target.value;
        const response = await removeFriend({ user, id });
        if (!response) return;

        setUser(response);
        context.updateUser(response);
        history.push('/friends/all');
    }

    const redirectToChat = () => {
        history.push(`/chat `);
    }

    return (
        <div className={styles.container}>
            <Header />
            <Wrapper>
                <FriendsMenu />
                <h2>All Friends</h2>

                <UsersList
                    users={user.friends}
                    rooms={user.rooms.filter(room => room.type === 'chat')}
                    heading={''}
                    empty={'There is no friends in your list'}
                    buttons={{ remove: removeFriendFromList, chat: redirectToChat, redirect: true }}
                />

            </Wrapper>
        </div>
    );
}

export default AllFriendsPage;