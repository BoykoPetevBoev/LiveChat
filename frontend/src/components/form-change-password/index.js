import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import styles from './index.module.css';
import UserContext from '../../react/Context';
import SubmitButton from '../../components/submit-button';
import Input from '../../components/user-input';
import BorderWrapper from '../../components/wrapper-border';
import { updatePassword } from '../../requester';

function ChangePasswordForm() {

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
    }, [context.user])

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