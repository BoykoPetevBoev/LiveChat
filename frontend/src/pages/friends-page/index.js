import React, { useState, useContext } from 'react';
import styles from './index.module.css';
import Header from '../../components/header';
import Menu from '../../components/aside-menu';
import Input from '../../components/user-input';
import SubmitButton from '../../components/user-submit-button';
import UserContext from '../../react/Context';
import { findUsers } from '../../utils/requester';



function FriendsPage() {
    const [username, setUsername] = useState('');
    const [errUsername, setErrUsername] = useState(null);
    const context = useContext(UserContext);

    console.log(context);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        sendRequest(username)
    }
    
    const sendRequest = async (username) => {
        await findUsers(username);
    }

    return (
        <div className={styles["container"]}>
            <Header />
            <main className={styles.main}>
                <div className={styles.aside}>
                    <Menu></Menu>
                </div>
                <div className={styles['holder']}>
                    <div>
                        <h3>Add Friend</h3>
                        <form onSubmit={onSubmit}>
                            <Input
                                name="username"
                                err={errUsername}
                                type="text"
                                placeholder='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <SubmitButton value='Search' />
                        </form>
                    </div>
                    <div>
                        <h3>Pending</h3>
                    </div>
                    <div>
                        <h3>All Friends</h3>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default FriendsPage;