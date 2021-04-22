import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import styles from './index.module.css';
import UserContext from '../../react/Context';
import Header from '../../components/header';
import SubmitButton from '../../components/submit-button';
import Input from '../../components/user-input';
import Wrapper from '../../components/wrapper-main';
import BorderWrapper from '../../components/wrapper-border';
import UserAvatar from '../../components/user-avatar';
import { updatePassword } from '../../requester';


function ProfilePage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [errUsername, setErrUsername] = useState(null);
    const [errEmail, setErrEmail] = useState(null);
    const [phone, setPhone] = useState('');
    const [errPhone, setErrPhone] = useState('');

    const [currPassword, setCurrPassword] = useState('');
    const [errCurrPassword, setErrCurrPassword] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [errNewPassword, setErrNewPassword] = useState(null);
    const [rePassword, setRePassword] = useState('');
    const [errRePassword, setErrRePassword] = useState(null);

    const context = useContext(UserContext);
    const history = useHistory();
    const [user, setUser] = useState(context.user);

    useEffect(() => {
        setUser(context.user);
        setUsername(context.user.username);
        setEmail(context.user.email);

    }, [context.user])

    const validateUser = () => {
        setErrUsername(null);
        setErrEmail(null);

        let result = true;
        if (username === '' || username.length < 2 || username.length > 20) {
            setErrUsername('Your username must be between 2 and 20 characters!');
            result = false;
        }
        if (email === '' || !email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            setErrEmail('Enter a valid email address!');
            result = false;
        }
        if (!phone || phone.length !== 10) {
            setErrPhone('Pnone number must be 10 character long!');
            result = false;
        }

        return result;
    }

    const validatePassword = () => {
        setErrCurrPassword(null);
        setErrNewPassword(null);
        setErrRePassword(null);

        let result = false;
        if (currPassword === '') {
            setErrCurrPassword('Password must be between 3 and 15 caracter long!');
            result = true;
        }
        if (newPassword === '' || newPassword.length < 3 || newPassword.length > 50) {
            setErrNewPassword('Password must be between 3 and 15 caracter long!');
            result = true;
        }
        if (rePassword !== newPassword) {
            setErrRePassword('Password and Repeat password must be the same!');
            result = true;
        }
        return result;
    }

    const passwordHandler = async (e) => {
        e.preventDefault();
        const isInvalid = validatePassword();
        if (isInvalid) return;
        const body = {
            user,
            currPassword,
            newPassword,
            rePassword
        }
        const response = await updatePassword(body)
        if(!response) return setErrCurrPassword('Wrong password!');

        setCurrPassword('');
        setNewPassword('');
        setRePassword('');
        context.updateUser(response);
        history.push('/profile');
    }

    const updateUser = (e) => {
        e.preventDefault();
        const isValid = validateUser();
        if (isValid) console.log('yes');
    }

    return (
        <div className={styles.background}>
            <Header />
            <Wrapper>

                <BorderWrapper heading='Image'>
                    <UserAvatar username={user.username} />
                    <p>{user.username}</p>
                </BorderWrapper>

                <BorderWrapper heading='Account settings'>
                    <form className={styles.form} onSubmit={updateUser}>
                        <Input
                            name="username"
                            err={errUsername}
                            type="text"
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            name="email"
                            err={errEmail}
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            name="phone"
                            err={errPhone}
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <SubmitButton value='Save' />
                    </form>
                </BorderWrapper>

                <BorderWrapper heading='Change your password'>
                    <form className={styles.form} onSubmit={passwordHandler}>
                        <Input
                            err={errCurrPassword}
                            type="password"
                            name="password"
                            placeholder="Current password"
                            value={currPassword}
                            onChange={(e) => setCurrPassword(e.target.value)}
                        />
                        <Input
                            err={errNewPassword}
                            type="password"
                            name="password"
                            placeholder="New password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <Input
                            err={errRePassword}
                            type="password"
                            name="rePassword"
                            placeholder="Confirm new password"
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                        />
                        <SubmitButton value='Save' />
                    </form>
                </BorderWrapper>

            </Wrapper>
        </div>
    )
}

export default ProfilePage;