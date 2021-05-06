import React, { useContext } from 'react';
import UserContext from '../../react/Context';
import styles from './index.module.css';

function ChatMessages({ messages, users }) {
    const context = useContext(UserContext);

    const MessageTitles = ({ message }) => {
        const sender = users.find(user => user._id === message.sender)
        return (
            <div className={styles['message-info']}  >
                <p className={styles.sender}>{sender?.username}</p>
                <p className={styles.time}>{message.time}</p>
                <div className={styles['user-ico']} style={{ backgroundImage: `url(${sender?.image})` }}></div>
            </div>
        )
    }

    const MessageContent = ({ message }) => {
        return (
            <div className={styles['message-holder']}>
                {message.content.startsWith('http')
                    ? <p className={context.user._id === message.sender ? styles.red : styles.green} >
                        <a target="_blank" rel="noopener noreferrer" href={message.content}>{message.content}</a>
                    </p>
                    : <p className={context.user._id === message.sender ? styles.red : styles.green}>
                        {message.content}
                    </p>}
            </div>
        )
    }

    if (!messages) return null;
    return (
        <div className={styles.chat}> {
            messages.map((message, index) => {
                return (
                    <div className={styles.message} key={index}>
                        <MessageTitles message={message} />
                        <MessageContent message={message} />
                    </div>
                )
            })
        } </div>
    )
}

export default ChatMessages