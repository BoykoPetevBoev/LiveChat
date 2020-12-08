import React, { useContext } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import UserContext from '../../Context';
import { Link } from 'react-router-dom';


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
                <h1>LOGO</h1>
            </div>

            <nav className={styles.navigation}>

                <Link className={styles.button} to='/'> Home </Link>
                <Link className={styles.button} to='/about'> About </Link>
                <Link className={styles.button} to='/register'> Register </Link>
                <Link className={styles.button} to='/login'> Login </Link>
                {/* 
                <HeaderButtons name='Home' path='/' />
                {loggedIn ? <HeaderButtons name='Logout' path='/' onClick={logout} /> : null}
                {loggedIn ? null : <HeaderButtons name='Login' path='/login' />}
                {loggedIn ? null : <HeaderButtons name='Register' path='/register' />} */}
            </nav>

        </div>
    )
}
export default Header

