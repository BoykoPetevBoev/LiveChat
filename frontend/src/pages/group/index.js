import React from 'react';
import styles from './index.module.css';
import Header from '../../components/header';
import Wrapper from '../../components/wrapper-main';
import GroupsMenu from '../../components/menu-groups';

function GroupsPage() {
    return (
        <div className={styles.container}>
            <Header />
            <Wrapper>
                <div></div>
                <div>
                    <h2>Groups Page</h2>
                    <GroupsMenu />
                </div>
                <div></div>
            </Wrapper>
        </div>
    );
}

export default GroupsPage;