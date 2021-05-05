import React from 'react';
import styles from './index.module.css';
import UserCardCompact from '../card-user-aside'

function ChatAside({ users, chat }) {
    if (!users) return (
        <div className={styles.aside}></div>
    );
    return (
        <div className={styles.aside}>
            {chat.image
                ? <img className={styles.img} src={chat.image} />
                : null
            }
            {chat.about
                ? <div>
                    <h3>About</h3>
                    <p>{chat.about}</p>
                </div>
                : null
            }
            {users.length > 0
                ? <div>
                    <h3>Users</h3>
                    {users.map((member) => <UserCardCompact user={member} key={member._id} />)}
                </div>
                : null
            }
        </div>
    )
}

export default ChatAside;