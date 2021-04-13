import React from 'react';
import styles from './index.module.css';
import UserList from '../user-list';

function ChatHeader({ users, chat }) {
    return (
        <div className={styles['chat-header']}>
            {users.map((member, index) => {
                return (<UserList user={member} key={index} />)
            })}
            <p>{chat.name}</p>
            <p>{chat?._id}</p>
        </div>
    )
}


export default ChatHeader;