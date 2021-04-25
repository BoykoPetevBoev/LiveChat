import React from 'react';
import styles from './index.module.css';
import UserCardCompact from '../card-info-aside';

function ChatHeader({ users, chat }) {
    return (
        <div className={styles['chat-header']}>
            {
                users.map((member) => {
                    return (<UserCardCompact user={member} />)
                })
            }
            {/* <p>{chat.name}</p>
            <p>{chat?._id}</p> */}
        </div>
    )
}


export default ChatHeader;