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

                <Link className={styles.button} to='/'>
                    <div>
                        <i class="fas fa-home"></i>
                        <p>Home</p>
                    </div>
                </Link>

                {loggedIn ? <Link className={styles.button} to='/chat'>
                    <div>
                        <i class="fas fa-comments"></i>
                        <p>Chat</p>
                    </div>
                </Link> : null}

                {loggedIn ? <Link className={styles.button} to='/friends'>
                    <div>
                        <i class="fas fa-user-plus"></i>
                        <p>Friends</p>
                    </div>
                </Link> : null}

                {loggedIn ? <Link className={styles.button} to='/friends'>
                    <div>
                    <i class="fas fa-plus-circle"></i>
                        <p>New Group</p>
                    </div>
                </Link> : null}

                {loggedIn ? <Link className={styles.button} to='/' onClick={logout} >
                    <div>
                        <i class="fas fa-sign-out-alt"></i>
                        <p>Logout</p>
                    </div>
                </Link> : null}

                {loggedIn ? null : <Link className={styles.button} to='/login'>
                    <div>
                        <i class="fas fa-sign-in-alt"></i>
                        <p>Login</p>
                    </div>
                </Link>}
            </nav>

        </div>
    )
}
export default Header

