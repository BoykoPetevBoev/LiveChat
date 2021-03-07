import React, { useContext } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import UserContext from '../../react/Context';
import { Link } from 'react-router-dom';
import logo from './logo.png'

function Header() {
    const context = useContext(UserContext);
    const history = useHistory();
    const { loggedIn, isAdmin } = context;

    const logout = () => {
        context.logout();
        history.push('/');
    }

    return (
        <div className={styles.container}>

            <div className={styles.logo}>
                <Link to='/'>
                    <img src={logo} />
                </Link>
            </div>

            <nav className={styles.navigation}>

                <Link className={styles.button} to='/'> Home </Link>
                <Link className={styles.button} to='/chat'> Chat </Link>
                <Link className={styles.button} to='/'> About </Link>

                {loggedIn ? <Link className={styles.button} to='/' onClick={logout} > Logout </Link> : null}
                {loggedIn ? null : <Link className={styles.button} to='/register'> Register </Link>}
                {loggedIn ? null : <Link className={styles.button} to='/login'> Login </Link>}
            </nav>

        </div>
    )
}
export default Header

