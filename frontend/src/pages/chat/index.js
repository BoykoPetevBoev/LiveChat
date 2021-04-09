import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../react/Context';
import styles from './index.module.css';
import { socket } from '../../socket';

import Header from '../../components/header';
import Wrapper from '../../components/wrapper';
import UserList from '../../components/user-list';
import ChatMessages from '../../components/chat-messages';


function ChatPage(props) {
    const context = useContext(UserContext);
    const [user, setUser] = useState(context.user);
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState({});
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const chatId = props.match.params.id;
        const room = user.rooms.find(room => room._id === chatId);
        const members = user.friends.filter(user => room.members.includes(user._id));

        setUser(context.user);
        setUsers(members);
        setChat(room);
        setMessages([...room.messages]);

        socket.on('chat-message', (response) => {
            room.messages.unshift(response);
            setChat(room);
            setMessages([...room.messages]);
        });
    }, [props.match.params.id, user.rooms, setMessages, user.friends, context.user]);

    const messageHandler = (message) => {
        const msgTemplate = {
            sender: user.username,
            message: message.trim(),
            time: new Date().toLocaleString()
        }
        socket.emit('chat-message', msgTemplate)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(message);
        if (!message) return;
        messageHandler(message);
        setMessage('');
    }

    return (
        <div className={styles.container}>
            <Header />
            <Wrapper>

                <div className={styles.container}>
                    <div className={styles['chat-header']}>
                        {users.map((member, index) => {
                            return (
                                <UserList user={member}  key={index}/>
                            )
                        })}
                        <p>{chat.name}</p>
                        <p>{chat?._id}</p>
                    </div>

                    <ChatMessages messages={messages} />

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

            </Wrapper>
        </div>
    );
}

export default ChatPage;