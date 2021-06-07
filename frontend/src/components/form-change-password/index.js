import React, { useState, useContext, useEffect } from 'react';
import styles from './index.module.css';
import UserContext from '../../react/Context';
import SubmitButton from '../../components/submit-button';
import Input from '../../components/user-input';
import BorderWrapper from '../../components/wrapper-border';
import { updatePassword } from '../../requester';

function ChangePasswordForm() {
    
    const context = useContext(UserContext);
    const [user, setUser] = useState({});
    const [currPassword, setCurrPassword] = useState('');
    const [errCurrPassword, setErrCurrPassword] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [errNewPassword, setErrNewPassword] = useState(null);
    const [rePassword, setRePassword] = useState('');
    const [errRePassword, setErrRePassword] = useState(null);

    useEffect(() => {
        setUser(context.user);
    }, [context.user])

    const isInvalid = () => {
        setErrCurrPassword(null);
        setErrNewPassword(null);
        setErrRePassword(null);

        let result = false;
        if (currPassword === '') {
            setErrCurrPassword('Wrong password!');
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
        if (isInvalid()) return;
        const body = {
            user,
            currPassword,
            newPassword,
        }
        const response = await updatePassword(body)
        if(!response) return setErrCurrPassword('Wrong password!');
        context.updateUser(response);
        setCurrPassword('');
        setNewPassword('');
        setRePassword('');
    }

    return (
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
    )
}

export default ChangePasswordForm