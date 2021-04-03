import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../react/Context';
import styles from './index.module.css';


import Header from '../../components/header';
import Wrapper from '../../components/wrapper';
import FriendsMenu from '../../components/menu-friends';
import UserBadge from '../../components/user-badge';
import { removeFriend } from '../../utils/requester';


function AllFriendsPage() {
    const history = useHistory();
    const context = useContext(UserContext);
    const [user, setUser] = useState(context.user);

    const removeFriendFromList = async (e) => {
        const id = e.target.value;
        const response = await removeFriend({ user, id });
        if (!response) return;

        setUser(response);
        context.updateUser(response);
        history.push('/friends/all');
    }

    const RenderUsers = (props) => {
        const users = props.users
        const buttons = props.buttons
        if (!users || users.length === 0) return <p>There is no friends in your list</p>;
        return (
            users.map((user) => {
                return (<UserBadge user={user} {...buttons} key={user._id} />)
            })
        )
    }

    return (
        <div className={styles.container}>
            <Header />
            <Wrapper>
                <FriendsMenu />
                <div className={styles.holder}>
                    <div>
                        <h3>All Friends</h3>
                    </div>
                    <div className={styles.friends}>
                        <RenderUsers users={user.friends} buttons={{ remove: removeFriendFromList }} />
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}

export default AllFriendsPage;