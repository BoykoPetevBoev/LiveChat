import React from 'react';
import styles from './index.module.css';
import UserCardCompact from '../card-info-aside';

function ChatHeader({ users, chat }) {
    if (!users) return null;
    return (
        <div className={styles['chat-header']}>
            {
                users.map((member) => {
                    return (<UserCardCompact user={member} key={member._id} />)
                })
            }
        </div>
    )
}


export default ChatHeader;