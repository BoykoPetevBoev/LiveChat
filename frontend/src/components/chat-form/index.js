import React, { useState, useContext, useEffect } from 'react';
import styles from './index.module.css';

function Chat() {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!message) return;

        setMessages([message, ...messages]);
        setMessage('');
    }

    const renderMessages = (msg) => {
        return (
            <div>
                <p>{msg}</p>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.chat}>
                {messages.map(msg => renderMessages(msg))}
            </div>
            <form className={styles.form} onSubmit={onSubmit}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Aa"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button 
                    type="submit"
                    value="Send"
                    className={styles['send-button']}
                >Send</button>
            </form>
        </div>
    )
}

export default Chat