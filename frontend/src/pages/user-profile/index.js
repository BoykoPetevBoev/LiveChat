import React, { useState, useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom'
import styles from './index.module.css';
import UserContext from '../../react/Context';
import Header from '../../components/header';
import Wrapper from '../../components/wrapper-main';
import BorderWrapper from '../../components/wrapper-border';
import UserLogo from '../../components/user-avatar';
import ChangePasswordForm from '../../components/form-change-password';
import UserSettingsForm from '../../components/form-account-settings';
import UserCardCompact from '../../components/card-info-aside';
import UserCard from '../../components/card-user';


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