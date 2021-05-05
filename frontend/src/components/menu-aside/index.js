import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import UserContext from '../../react/Context';
import UserCardCompact from '../card-user-aside';
import GroupCardCompact from '../card-group-aside';

function Menu() {
    const context = useContext(UserContext);
    const [user, setUser] = useState(context.user);
    const [chats, setChats] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        setUser(context.user)
        setChats(context.user.rooms.filter(room => room.type === 'chat'));
        setRooms(context.user.rooms.filter(room => room.type !== 'chat'));
    }, [context.user]);

    const RenderFriends = () => {
        return chats.length === 0
            ? null
            : chats.map(chat => {
                const friend = user.friends.find(fr => chat.members.includes(fr._id))
                return <UserCardCompact user={friend} chatId={chat._id} key={chat._id} />;
            });
    }

    return (
        <div className={styles.aside}>
            <div>
                <UserCardCompact user={user} />
                <div className={styles['user-options']}>
                    <Link to='/chat'><i className="fas fa-microphone"></i></Link>
                    <Link to='/chat'><i className="fas fa-volume-up"></i></Link>
                    <Link to='/profile'><i className="fas fa-cog"></i></Link>
                </div>
            </div>

            <div className={styles.border}>
                <p className={styles.heading}> <i className="fas fa-user"></i>Friends</p>
                <RenderFriends />
            </div>

            <div className={styles.border}>
                <p className={styles.heading}> <i className="fas fa-users"></i>Groups</p>
                {rooms.length === 0
                    ? null
                    : rooms.map(room => <GroupCardCompact group={room} key={room._id} />)
                }
            </div>
        </div>
    )
}

export default Menu