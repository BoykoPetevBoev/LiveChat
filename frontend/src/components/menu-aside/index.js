import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import UserContext from '../../react/Context';
import UserCardCompact from '../card-info-aside';
import GroupCard from '../card-group';

function Menu() {
    const context = useContext(UserContext);
    const [user, setUser] = useState(context.user);
    const [chats, setChats] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        setUser(context.user)
        setChats(context.user.rooms.filter(room => room.type === 'chat'));
        setRooms(context.user.rooms.filter(room => room.type === 'group'));
    }, [context.user]);

    const RenderFriends = () => {
        if (chats.length === 0)
            return <p>Looks like you haven't added any friends yet.Invite friends to chat together.</p>

        return chats.map(chat => {
            const friend = user.friends.find(fr => chat.members.includes(fr._id))
            return (
                <Link to={`/chat/${chat._id}`} key={chat._id}>
                    <UserCardCompact user={friend} />
                </Link>
            );
        });
    }

    const RenderGroups = () => {
        return rooms.map(room => {
            return (
                <Link to={`/chat/${room._id}`} key={room?._id}>
                    <GroupCard room={room} />
                </Link>
            );
        });
    }

    return (
        <div className={styles.aside}>
            <div>
                <Link to='/chat'>
                    <UserCardCompact user={user} />
                </Link>
                <div className={styles['user-options']}>
                    {/* <Link to='/chat'><i className="fas fa-microphone-slash"></i></Link> */}
                    <Link to='/chat'><i className="fas fa-microphone"></i></Link>
                    {/* <Link to='/chat'><i className="fas fa-volume-mute"></i></Link> */}
                    <Link to='/chat'><i className="fas fa-volume-up"></i></Link>
                    <Link to='/profile'><i className="fas fa-cog"></i></Link>
                </div>
            </div>

            <div className={styles.border}>
                <p className={styles.heading}> <i className="fas fa-user"></i> Friends</p>
                <RenderFriends />
            </div>

            <div className={styles.border}>
                <p className={styles.heading}> <i className="fas fa-users"></i> Groups</p>
                <RenderGroups />
            </div>
        </div>
    )
}

export default Menu