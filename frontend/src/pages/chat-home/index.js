import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../react/Context';
import styles from './index.module.css';
import { getPublicGroups, sendGroupRequest } from '../../requester';

import Header from '../../components/header';
import Wrapper from '../../components/wrapper-main';
import UsersList from '../../components/list-user';
import GroupsList from '../../components/list-groups';

function ChatHomePage() {
    const context = useContext(UserContext);
    const [user, setUser] = useState(context.user);
    const [groups, setGroups] = useState([]);

    const fetchData = async () => {
        const res = await getPublicGroups();
        if (!res) return;

        setGroups(res);
    }

    useEffect(() => {
        fetchData();
        setUser(context.user);
    }, [context.user]);

    const joinToGroup = async (e) => {
        await sendGroupRequest({
            senderId: user._id,
            groupId: e.target.value
        })
    }

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
                        // groups={[...new Set(user.rooms
                        //     .map(u => u._id)
                        //     .map(id => user.rooms.find(r => r._id == id)
                        //     ))]}
                        heading='Groups'
                        empty='There is no groups in your list'
                        buttons={{ redirect: true, settings: true }}
                    />
                    <GroupsList
                        groups={groups}
                        heading='Public Groups'
                        empty='There is no public groups'
                        buttons={{ join: joinToGroup, settings: true, redirect: true, }}
                    />
                </div>
            </Wrapper>
        </div>
    );
}

export default ChatHomePage;