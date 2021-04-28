import React, { useContext } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import UserContext from '../../react/Context';
import { Link } from 'react-router-dom';
import logo from './logo.png'

function Header() {
    const context = useContext(UserContext);
    const history = useHistory();
    const { loggedIn } = context;

    const logout = () => {
        context.logout();
        history.push('/');
    }

    return (
        <div className={styles.container}>

            <div className={styles.logo}>
                <Link to='/'>
                    <img src={logo} alt='Live Chat' />
                </Link>
            </div>

            <nav className={styles.navigation}>

                <Link className={styles.button} to='/'>
                    <div>
                        <i className="fas fa-home"></i>
                        <p>Home</p>
                    </div>
                </Link>

                {loggedIn ? <Link className={styles.button} to={`/chat`}>
                    <div>
                        <i className="fas fa-comments"></i>
                        <p>Chat</p>
                    </div>
                </Link> : null}

                {loggedIn ? <Link className={styles.button} to='/friends'>
                    <div>
                        <i className="fas fa-user-plus"></i>
                        <p>Friends</p>
                    </div>
                </Link> : null}

                {loggedIn ? <Link className={styles.button} to='/group'>
                    <div>
                    <i className="fas fa-users"></i>
                        <p>Groups</p>
                    </div>
                </Link> : null}

                {loggedIn ?
                    <div className={styles.dropdown}>

                        <Link className={styles.button} to='/profile'>
                            <div>
                                <i className="fas fa-user"></i>
                                <p>Profile</p>
                            </div>
                        </Link>

                        <div className={styles['dropdown-content']}>
                            <Link to='/profile'>
                                <div>
                                    <i className="fas fa-cog"></i>
                                    <p>Settings</p>
                                </div>
                            </Link>

                            <Link to='/' onClick={logout} >
                                <div>
                                    <i className="fas fa-sign-out-alt"></i>
                                    <p>Logout</p>
                                </div>
                            </Link>
                        </div>

                    </div> : null
                }

                {loggedIn ? null :
                    <div className={styles.dropdown}>

                        <Link className={styles.button} to='/login'>
                            <div>
                                <i className="fas fa-sign-in-alt"></i>
                                <p>Login</p>
                            </div>
                        </Link>

                        <div className={styles['dropdown-content']}>
                            <Link to='/login'>
                                <div>
                                    <i className="fas fa-sign-in-alt"></i>
                                    <p>Login</p>
                                </div>
                            </Link>

                            <Link to='/register'>
                                <div>
                                    <i className="fas fa-sign-in-alt"></i>
                                    <p>Register</p>
                                </div>
                            </Link>
                        </div>

                    </div>
                }
            </nav>

        </div>
    )
}
export default Header

