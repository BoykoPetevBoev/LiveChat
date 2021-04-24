import React, { useState, useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom'
import styles from './index.module.css';
import UserContext from '../../react/Context';
import Header from '../../components/header';
import Wrapper from '../../components/wrapper-main';
import BorderWrapper from '../../components/wrapper-border';
import UserAvatar from '../../components/user-avatar';
import ChangePasswordForm from '../../components/form-change-password';
import UserSettingsForm from '../../components/form-account-settings';


function ProfilePage() {
    const context = useContext(UserContext);
    // const history = useHistory();
    const [user, setUser] = useState(context.user);

    useEffect(() => {
        setUser(context.user);
    }, [context.user])

    return (
        <div className={styles.background}>
            <Header />
            <Wrapper>

                <BorderWrapper heading='Your business card'>
                    <UserAvatar username={user.username} />
                    <p>{user.username}</p>
                </BorderWrapper>

                <UserSettingsForm />
                <ChangePasswordForm/>

            </Wrapper>
        </div>
    )
}

export default ProfilePage;