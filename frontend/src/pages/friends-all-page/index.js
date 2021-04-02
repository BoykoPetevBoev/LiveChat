import React, { useState, useContext } from 'react';
import styles from './index.module.css';
import Header from '../../components/header';
import UserContext from '../../react/Context';
import { findUsers } from '../../utils/requester';
import Wrapper from '../../components/wrapper';
import FriendsMenu from '../../components/menu-friends';




function AllFriendsPage() {
    const [username, setUsername] = useState('');
    const [errUsername, setErrUsername] = useState(null);
    const context = useContext(UserContext);

    console.log(context);
    
    return (
        <div className={styles.container}>
            <Header />
            <Wrapper>
                <FriendsMenu/>
                <div className={styles.holder}>
                    <div>
                        <h3>All Friends</h3>
                    </div>
                    <div>

                    </div>
                </div>
            </Wrapper>
        </div>
    );
}

export default AllFriendsPage;