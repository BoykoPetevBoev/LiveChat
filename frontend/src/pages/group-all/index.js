import React, { useContext, useState } from 'react';
import styles from './index.module.css';
import UserContext from '../../react/Context';
import { useHistory } from 'react-router-dom';
import { removeFriend } from '../../requester';
import Header from '../../components/header';
import Wrapper from '../../components/wrapper-main';
import GroupsList from '../../components/list-groups';
import GroupsMenu from '../../components/menu-groups';

function AllGroupsPage() {
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

    return (
        <div className={styles.container}>
            <Header />
            <Wrapper>
                <GroupsMenu />
                <h2>My Groups</h2>

                <GroupsList
                    groups={user.rooms.filter(room => room.type !== 'chat')}
                    heading={''}
                    empty={'There is no groups in your list'}
                    buttons={{redirect: true }}
                />
            </Wrapper>
        </div>
    );
}

export default AllGroupsPage;