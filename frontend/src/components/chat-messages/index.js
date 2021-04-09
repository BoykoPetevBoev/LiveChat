import React from 'react';
import styles from './index.module.css';

function ChatMessages(props) {

    if (!props.messages) return null;

    return (
        <div className={styles.chat}> {
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
        } </div>
    )
}

export default ChatMessages