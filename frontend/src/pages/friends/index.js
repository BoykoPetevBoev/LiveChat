import React from 'react';
import styles from './index.module.css';
import Header from '../../components/header';
import Wrapper from '../../components/wrapper-main';
import FriendsMenu from '../../components/menu-friends';

function FriendsPage() {
    return (
        <div className={styles.container}>
            <Header />
            <Wrapper>
                <FriendsMenu/>
            </Wrapper>
        </div>
    );
}

export default FriendsPage;