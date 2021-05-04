import React from 'react';
import styles from './index.module.css';

function ChatHeader({ chat, user, users }) {

    if (!chat) return null;
    return (
        <div className={styles['chat-header']}>
            {
                chat.type === 'chat' && chat.name.includes('/')
                    ? <h2>{users.find(member => member._id !== user._id)?.username}</h2>
                    : <h2>{chat.name}</h2>
            }
        </div>
    )
}


export default ChatHeader;