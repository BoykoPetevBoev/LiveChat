import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../react/Context';
import { useHistory } from 'react-router-dom';

import styles from './index.module.css';
import { socket } from '../../socket';

import Header from '../../components/header';
import Wrapper from '../../components/wrapper-main';
import ChatHeader from '../../components/chat-header';
import ChatMessages from '../../components/chat-messages';
import UsersList from '../../components/user-list';
import GroupCard from '../../components/group-card';
import { getChat } from '../../requester';


function ChatPage(props) {
    const context = useContext(UserContext);
    const history = useHistory();
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

        const members = room.members.filter(u => u._id !== user._id);
        setUsers(members);
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
                        <UsersList
                            rooms={user.rooms.filter(room => room.type === 'group')}
                            heading='Groups'
                            empty='There is no groups in your list'
                            buttons={{ redirect: true }}
                        />
                    </div>
                    :
                    <div className={styles.container}>
                        <ChatHeader users={users} chat={chat} />
                        <ChatMessages messages={messages} users={[user, ...users]} />

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
                }

            </Wrapper>
        </div>
    );
}

export default ChatPage;