import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import UserContext from '../../react/Context';
import UserList from '../user-list';

function Menu() {
    const context = useContext(UserContext);
    const [user, setUser] = useState(context.user);

    useEffect(() => {
        setUser(context.user)
    }, [context.user]);

    const RenderFriends = () => {

        if (user.friends.length === 0) return null;

        return (
            user.friends.map(friend => {

                const room = user.rooms.find(room =>
                    room?.members.includes(friend._id) &&
                    room.type === 'chat'
                )

                return (
                    <Link to={`/chat/${room?._id}`} key={friend?._id}>
                        <UserList user={friend} />
                    </Link>
                )
            })
        )
    }

    return (
        <div className={styles.aside}>
            <div>
                <UserList user={user} />
                <div className={styles['user-options']}>
                    {/* <Link to='/chat'><i className="fas fa-microphone-slash"></i></Link> */}
                    <Link to='/chat'><i className="fas fa-microphone"></i></Link>
                    {/* <Link to='/chat'><i className="fas fa-volume-mute"></i></Link> */}
                    <Link to='/chat'><i className="fas fa-volume-up"></i></Link>
                    <Link to='/chat'><i className="fas fa-cog"></i></Link>
                </div>
            </div>
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