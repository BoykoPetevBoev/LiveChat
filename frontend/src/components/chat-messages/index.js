import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../react/Context';
import styles from './index.module.css';

function ChatMessages({ messages, users }) {

    const context = useContext(UserContext);
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(context.user)
    }, [context.user])


    if (!messages) return null;

    return (
        <div className={styles.chat}> {
            messages.map((message, index) => {
                const sender = users.find(user => user._id === message.sender)
                return (
                    <div className={styles.message} key={index}>
                        <div className={styles['message-info']}  >
                            <p className={styles.sender}>{sender?.username}</p>
                            <p className={styles.time}>{message.time}</p>
                            <div className={styles['user-ico']} style={{ backgroundImage: `url(${sender?.image})` }}></div>
                        </div>
                        <div className={styles['message-holder']}>
                            {message.content.startsWith('http')
                                ? <a className={user._id === message.sender ? styles.red : styles.green} href={message.content}>
                                    {message.content}
                                </a>
                                : <p className={user._id === message.sender ? styles.red : styles.green}>
                                    {message.content}
                                </p>}

                        </div>
                    </div>
                )
            })
        } </div>
    )
}

export default ChatMessages