import React, { useState, useContext, useEffect } from 'react';
import styles from './index.module.css';
import UserContext from '../../react/Context';
import Header from '../../components/header';
import Wrapper from '../../components/wrapper-main';
import BorderWrapper from '../../components/wrapper-border';
import ChangePasswordForm from '../../components/form-change-password';
import UserSettingsForm from '../../components/form-account-settings';
import UserCard from '../../components/card-user';


function ProfilePage() {
    const context = useContext(UserContext);
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(context.user);
    }, [context.user])

    return (
        <div className={styles.background}>
            <Header />
            <Wrapper>
                <BorderWrapper heading='Your card'>
                    <div className={styles['card-holder']}>
                        <UserCard user={user}/>
                    </div>
                </BorderWrapper>
                <UserSettingsForm />
                <ChangePasswordForm />
            </Wrapper>
        </div>
    )
}

export default ProfilePage;