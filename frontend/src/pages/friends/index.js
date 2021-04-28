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

                <div></div>
                <div>
                    <h2>Friends Page</h2>
                    <FriendsMenu />
                </div>
                <div></div>
            </Wrapper>
        </div>
    );
}

export default FriendsPage;