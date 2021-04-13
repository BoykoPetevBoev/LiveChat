import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../react/Context';
import styles from './index.module.css';

function ChatMessages({ messages, users }) {

    const context = useContext(UserContext);
    const [user, setUser] = useState(context.user);

    useEffect(() => {
        setUser(context.user)
    }, [context.user])

    if (!messages) return null;


    return (
        <div className={styles.chat}> {
            messages.map((message, index) => {
                return (
                    <div key={index}>
                        <div className={styles['message-info']}>
                            <p className={styles.sender}>{
                                users.find(user => user._id === message.sender)?.username
                            }</p>
                            <p className={styles.time}>{message.time}</p>
                        </div>
                        <div className={styles['message-holder']}>
                            <p className={user._id === message.sender ? styles.green : styles.red}>
                                {message.content}
                            </p>
                        </div>
                    </div>
                )
            })
        } </div>
    )
}

export default ChatMessages