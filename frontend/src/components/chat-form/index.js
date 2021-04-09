import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

function Chat(props) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [room, setRoom] = useState();

    useEffect(() => {
        console.log(props.chat);
        setRoom(props.chat)
        setMessages(props.chat.messages)
    }, [props.chat.messages])

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        props.messageHandler(message);
        setMessage('');
    }

    const renderMessages = (msg, index) => {
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
    }

    return (
        <div className={styles.container}>
                <p>{room?._id}</p>
            <div className={styles.chat}>
                {messages.map((msg, index) => renderMessages(msg, index))}
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
    )
}

export default Chat