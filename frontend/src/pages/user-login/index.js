import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { userLogin } from '../../requester';
import UserContext from '../../react/Context';
import styles from './index.module.css';

import FormHolder from '../../components/user-form-holder';
import SubmitButton from '../../components/submit-button';
import Input from '../../components/user-input';
import Header from '../../components/header';


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(null);
    const context = useContext(UserContext);
    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            setErr('Invalid email or password!');
            return;
        }
        const user = await userLogin({ email, password });
        if (user) {
            context.login(user);
            history.push('/');
        }
        else {
            setErr('Invalid email or password!');
        }
    }

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <FormHolder className='login' title="Welcome Back!">
                    <form className='form' onSubmit={onSubmit}>
                        <Input
                            name='email'
                            err={err}
                            type='text'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            name='password'
                            err={err ? true : false}
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <SubmitButton value='LOGIN' />
                        <div className={styles.link}>
                            <p>Don't have an account?</p> 
                            <Link to='/register'>Sign up</Link>
                        </div>
                    </form>
                </FormHolder>
            </main>
        </div>
    )
}

export default LoginPage;