import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../react/Context';
import styles from './index.module.css';
import { socket } from '../../socket';
import { getChat } from '../../requester';

import Header from '../../components/header';
import Wrapper from '../../components/wrapper-main';
import ChatHeader from '../../components/chat-header';
import ChatMessages from '../../components/chat-messages';
import UsersList from '../../components/list-user';
import GroupsList from '../../components/list-groups';
import ChatAside from '../../components/chat-aside';


function ChatPage(props) {
    const context = useContext(UserContext);
    const [chatId, setChatId] = useState(props?.match?.params?.id)
    const [user, setUser] = useState(context.user);
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState({});
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);


    const fetchData = async (id) => {
        if (!id) return;
        const room = await getChat(id);
        if (!room) return;

        setUsers(room.members);
        setChat(room);
        setMessages([...room.messages]);
    }

    useEffect(() => {
        setChatId(props?.match?.params?.id);
        fetchData(props?.match?.params?.id);
        setUser(context.user);
        socket.on('message', async (updatedRoom) => {
            setChat(updatedRoom);
            setMessages([...updatedRoom.messages]);
        });
    }, [props.match?.params?.id, context.user]);

    const messageHandler = (message) => {
        const msgTemplate = {
            chat: chat,
            message: {
                sender: user,
                content: message.trim(),
                time: new Date().toLocaleString()
            }
        }
        socket.emit('chat-message', msgTemplate)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        messageHandler(message);
        setMessage('');
    }

    return (
        <div className={styles.container}>
            <Header />
            <Wrapper>
                {!chatId
                    ?
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
                            buttons={{ redirect: true }}
                        />
                        <GroupsList
                            groups={user.rooms.filter(room => room.type === 'public')}
                            heading='Public Groups'
                            empty='There is no public groups'
                            buttons={{ redirect: true }}
                        />
                    </div>
                    :
                    <div className={styles.chat}>
                        <ChatAside users={users} chat={chat} />

                        <div className={styles.main}>
                            <ChatHeader chat={chat} user={user} users={users}/>
                            <ChatMessages messages={messages} users={users} />
                            <form className={styles.form} onSubmit={onSubmit}>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Aa..."
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    value="Send"
                                    className={styles['send-button']}
                                >
                                    <i className="fas fa-arrow-right"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                }
            </Wrapper>
        </div>
    );
}

export default ChatPage;