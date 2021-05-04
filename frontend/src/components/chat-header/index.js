import React from 'react';
import styles from './index.module.css';
import UserCardCompact from '../card-user-info-aside';

function ChatHeader({ chat }) {
    if (!chat) return null;
    return (
        <div className={styles['chat-header']}>
            <h2>{chat.name}</h2>
        </div>
    )
}


export default ChatHeader;