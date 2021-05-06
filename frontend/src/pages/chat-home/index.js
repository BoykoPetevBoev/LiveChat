import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../react/Context';
import styles from './index.module.css';
import Header from '../../components/header';
import Wrapper from '../../components/wrapper-main';
import UsersList from '../../components/list-user';
import GroupsList from '../../components/list-groups';

function ChatHomePage() {
    const context = useContext(UserContext);
    const [user, setUser] = useState(context.user);

    useEffect(() => {
        setUser(context.user);
    }, [context.user]);

    return (
        <div className={styles.container}>
            <Header />
            <Wrapper>
                <div className={styles['chat-list']}>
                    <h2>Chat Page</h2>
                    <UsersList
                        users={user.friends}
                        rooms={user.rooms.filter(room => room.type === 'chat')}
                        heading='Friends'
                        empty='There is no friends in your list'
                        buttons={{ redirect: true }}
                    />
                    <GroupsList
                        groups={user.rooms.filter(room => room.type !== 'chat')}
                        heading='Groups'
                        empty='There is no groups in your list'
                        buttons={{ redirect: true, settings: true }}
                    />
                    <GroupsList
                        groups={user.rooms.filter(room => room.type === 'public')}
                        heading='Public Groups'
                        empty='There is no public groups'
                        buttons={{ redirect: true, settings: true }}
                    />
                </div>
            </Wrapper>
        </div>
    );
}

export default ChatHomePage;