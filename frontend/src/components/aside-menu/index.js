import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import UserContext from '../../react/Context';
import UserAvatar from '../user-avatar';

function Menu() {
    const context = useContext(UserContext);
    const [user, setUser] = useState(context.user);

    useEffect(() => {
        setUser(context.user)
    }, [context.user]);

    const RenderFriends = () => {
        return (
            user.friends.map(friend => {
                const room = user.rooms.find(room => room.members.includes(friend._id) && room.type === 'chat')
                return (
                    <Link to={`/chat/${room?._id}`} key={friend?._id}>
                        <div className={styles.friend}>     
                            <UserAvatar username={friend.username} />
                            <div className={styles.username}>
                                <p>{friend.username}</p>
                                <p>{friend.email}</p>
                            </div>
                        </div>
                    </Link>
                )
            })
        )
    }

    return (
        <div className={styles.aside}>
            <div>
                <p className={styles.heading}> <i className="fas fa-user"></i> Friends</p>
                <RenderFriends />
            </div>
            <div>
                <p className={styles.heading}> <i className="fas fa-users"></i> Rooms</p>
                {/* <i className="fas fa-users-slash"></i> */}
            </div>
        </div>
    )
}

export default Menu