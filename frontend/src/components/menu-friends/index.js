import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

function FriendsMenu() {
    return (
        <div className={styles.container}>

            <Link to='/friends/add'>
                <div className={styles.links}>
                    <i className="fas fa-user-plus"></i>
                    <p>Add Friends</p>
                </div>
            </Link>

            <Link to='/friends/requests'>
                <div className={styles.links}>
                    <i className="fas fa-user-check"></i>
                    <p>Pending</p>
                </div>
            </Link>

            <Link to='/friends/all'>
                <div className={styles.links}>
                    <i className="fas fa-user-friends"></i>
                    <p>All Friends</p>
                </div>
            </Link>

        </div>
    );
}

export default FriendsMenu;