import React, { useContext } from 'react';
import styles from './index.module.css';
import UserContext from '../../react/Context';
import { Link } from 'react-router-dom';
import CardAside from '../card-aside';

function ChatAside({ users, chat }) {
    const context = useContext(UserContext);

    if (!users)
        return <div className={styles.aside}></div>
    return (
        <div className={styles.aside}>
            {chat.image
                ? <img className={styles.img} src={chat.image} alt="Chat" />
                : null
            }
            {chat.about
                ? <div>
                    <h3>About</h3>
                    <p>{chat.about}</p>
                </div>
                : null
            }
            {chat.website
                ? <div>
                    <h3>Website</h3>
                    <a href={chat.website} target="_blank" rel="noopener noreferrer">{chat.website}</a>
                </div>
                : null
            }
            {users.length > 0
                ? <div>
                    <h3>Users</h3>
                    {users.map((member) => <CardAside data={member} key={member._id} />)}
                </div>
                : null
            }
            {context.user._id === chat.admin
                ? <Link className={styles.buton} to={`/group/${chat._id}`}>Settings</Link>
                : null}
        </div>
    )
}

export default ChatAside;