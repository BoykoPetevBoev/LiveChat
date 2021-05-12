import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import styles from './index.module.css';
import UserContext from '../../react/Context';
import Header from '../../components/header';
import FormHolder from '../../components/user-form-holder';
import SubmitButton from '../../components/submit-button';
import Input from '../../components/user-input';
import { userRegister } from '../../requester';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errUsername, setErrUsername] = useState(null);
    const [errEmail, setErrEmail] = useState(null);
    const [errPassword, setErrPassword] = useState(null);
    const [errRePassword, setErrRePassword] = useState(null);
    const context = useContext(UserContext);
    const history = useHistory();

    const validateForm = () => {
        setErrUsername(null);
        setErrEmail(null);
        setErrPassword(null);
        setErrRePassword(null);

        let result = true;
        if (username === '' || username.length < 2 || username.length > 20) {
            setErrUsername('Your username must be between 2 and 20 characters!');
            result = false;
        }
        if (email === '' || !email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            setErrEmail('Enter a valid email address!');
            result = false;
        }
        if (password === '' || password.length < 3 || password.length > 50) {
            setErrPassword('Password must be between 3 and 15 caracter long!');
            result = false;
        }
        if (rePassword !== password) {
            setErrRePassword('Password and Repeat password must be the same!');
            result = false;
        }
        return result;
    }
    const registerHandler = async () => {
        const body = {
            username,
            email,
            password
        };
        const user = await userRegister(body);
        if (user) {
            context.login(user);
            history.push('/');
        }
        else setErrEmail('Email is already registered!');
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) registerHandler();
    }

    return (
        <div className={styles.background}>
            <Header />
            <main className={styles.main}>
                <FormHolder className='register' title='Sign Up for Free'>
                    <form onSubmit={onSubmit}>
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
                            err={errPassword}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                            err={errRePassword}
                            type="password"
                            name="rePassword"
                            placeholder="Confirm Password"
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                        />
                        <SubmitButton value='GET STARTED' />
                        <div className={styles.link}>
                            <p>Already have an account?</p>
                            <Link to='/login'>Login</Link>
                        </div>
                    </form>
                </FormHolder>
            </main>
        </div>
    )
}

export default RegisterPage;