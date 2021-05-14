import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../react/Context';
import styles from './index.module.css';
import { socket } from '../../socket';
import { getChat } from '../../requester';

import Header from '../../components/header';
import Wrapper from '../../components/wrapper-main';
import ChatHeader from '../../components/chat-header';
import ChatMessages from '../../components/chat-messages';
import ChatAside from '../../components/chat-aside';
import EmojiPicker from '../../components/chat-emoji-picker';

function ChatPage(props) {
    const context = useContext(UserContext);
    const [user, setUser] = useState(context.user);
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState({});
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [display, setDisplay] = useState(false)

    const fetchData = async (id) => {
        if (!id) return;
        const room = await getChat(id);
        if (!room) return;

        setUsers(room.members);
        setChat(room);
        setMessages([...room.messages]);
    }

    useEffect(() => {
        fetchData(props?.match?.params?.id);
        setUser(context.user);
        socket.on('message', async (updatedRoom) => {
            setChat(updatedRoom);
            setMessages([...updatedRoom.messages]);
        });
    }, [context.user, props.match.params.id]);

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

    const addEmoji = (e) => {
        const emoji = e.target.value;
        setMessage(message + emoji);
        
    };

    const emojiPickerView = () => {
        display ? setDisplay(false) : setDisplay(true);
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

                <div className={styles.chat}>
                    <ChatAside users={users} chat={chat} />

                    <div className={styles.main}>
                        <ChatHeader chat={chat} user={user} users={users} />
                        <ChatMessages messages={messages} users={users} />

                        <EmojiPicker onClick={addEmoji} display={display} />
                        <form className={styles.form} onSubmit={onSubmit}>
                            <div onClick={emojiPickerView} className={styles.emoji}>
                                <i className="fas fa-smile"></i>
                            </div>

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

            </Wrapper>
        </div>
    );
}

export default ChatPage;