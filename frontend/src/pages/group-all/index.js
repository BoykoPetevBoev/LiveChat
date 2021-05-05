import React, { useContext, useState } from 'react';
import styles from './index.module.css';
import UserContext from '../../react/Context';
import { useHistory } from 'react-router-dom';
import Header from '../../components/header';
import Wrapper from '../../components/wrapper-main';
import GroupsList from '../../components/list-groups';
import GroupsMenu from '../../components/menu-groups';

function AllGroupsPage() {
    const history = useHistory();
    const context = useContext(UserContext);
    const [user, setUser] = useState(context.user);

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