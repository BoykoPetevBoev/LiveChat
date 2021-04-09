import React, { useContext, useEffect, useState } from 'react';
import styles from './index.module.css';
import Header from '../../components/header';
// import Chat from '../../components/chat-form';
import Wrapper from '../../components/wrapper';
import UserContext from '../../react/Context';
// import { getChat } from '../../requester';
import { socket } from '../../socket';

function ChatPage(props) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const context = useContext(UserContext);
    const [user] = useState(context.user);
    const [chat, setChat] = useState();

    useEffect(() => {
        const chatId = props.match.params.id;
        const room = user.rooms.find(room => room._id === chatId);
        setChat(room)
        setMessages(room.messages)

        socket.on('chat-message', (response) => {
            room.messages.unshift(response);
            setChat(room)
            setMessages([...room.messages])
        })
    }, [props.match.params.id, user.rooms, setMessages])

    const messageHandler = (message) => {

        const msgTemplate = {
            sender: user.username,
            message: message,
            time: new Date().toLocaleString()
        }
        socket.emit('chat-message', msgTemplate)
    }

    const RenderMessages = (props) => {
        return (
           props.messages.map((msg, index) => {
                return (
                    <div key={index}>
                        <div className={styles['message-info']}>
                            <p className={styles.time}>{msg.time}</p>
                            <p className={styles.sender}>{msg.sender}</p>
                        </div>
                        <div className={styles['message-holder']}>
                            <p>{msg.message}</p>
                        </div>
                    </div>
                )
            })
        )
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
                <div className={styles['chat-holder']}>
                    {/* {chat ? <Chat chat={chat} messageHandler={messageHandler}/> : null} */}

                    <div className={styles.container}>
                        <p>{chat?._id}</p>

                        <div className={styles.chat}>
                            <RenderMessages messages={messages}/>
                        </div>

                        <form className={styles.form} onSubmit={onSubmit}>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Aa..."
                                value={message}
                                onChange={e => setMessage(e.target.value.trim())}
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