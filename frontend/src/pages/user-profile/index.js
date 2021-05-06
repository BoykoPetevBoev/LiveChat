import React, { useState, useContext, useEffect } from 'react';
import styles from './index.module.css';
import UserContext from '../../react/Context';
import Header from '../../components/header';
import Wrapper from '../../components/wrapper-main';
import BorderWrapper from '../../components/wrapper-border';
import ChangePasswordForm from '../../components/form-change-password';
import UserSettingsForm from '../../components/form-account-settings';
import Card from '../../components/card';


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
                <h2>Settings</h2>
                <BorderWrapper heading='Your card'>
                    <div className={styles['card-holder']}>
                        <Card data={user}/>
                    </div>
                </BorderWrapper>
                <UserSettingsForm />
                <ChangePasswordForm />
            </Wrapper>
        </div>
    )
}

export default ProfilePage;