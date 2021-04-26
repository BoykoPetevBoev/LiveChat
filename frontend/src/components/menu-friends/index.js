import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function FriendsMenu() {

    const [path, setPath] = useState('');
    const location = useLocation();

    useEffect(() => {
        setPath(location.pathname);
    })

    return (
        <div className={styles.container}>

            <Link to='/friends/add'>
                <div className={path === '/friends/add' ? styles['link-active'] : styles.links}>
                    <i className="fas fa-user-plus"></i>
                    <p>Add Friends</p>
                </div>
            </Link>

            <Link to='/friends/requests'>
                <div className={path === '/friends/requests' ? styles['link-active'] : styles.links}>
                    <i className="fas fa-user-check"></i>
                    <p>Pending</p>
                </div>
            </Link>

            <Link to='/friends/all'>
                <div className={path === '/friends/all' ? styles['link-active'] : styles.links}>
                    <i className="fas fa-user-friends"></i>
                    <p>All Friends</p>
                </div>
            </Link>

        </div>
    );
}

export default FriendsMenu;