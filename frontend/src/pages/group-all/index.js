import React, { useContext } from 'react';
import styles from './index.module.css';
import UserContext from '../../react/Context';
import Header from '../../components/header';
import Wrapper from '../../components/wrapper-main';
import GroupsList from '../../components/list-groups';
import GroupsMenu from '../../components/menu-groups';

function AllGroupsPage() {
    const context = useContext(UserContext);
    return (
        <div className={styles.container}>
            <Header />
            <Wrapper>
                <GroupsMenu />
                <h2>My Groups</h2>
                <GroupsList
                    groups={context.user.rooms.filter(room => room.type !== 'chat')}
                    heading={''}
                    empty={'There is no groups in your list'}
                    buttons={{redirect: true, settings: true}}
                />
            </Wrapper>
        </div>
    );
}

export default AllGroupsPage;