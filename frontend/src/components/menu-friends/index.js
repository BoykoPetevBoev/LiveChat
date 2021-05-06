import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function FriendsMenu() {
    const location = useLocation();
    return (
        <div className={styles.container}>

            <Link to='/friends/add'>
                <div className={
                    location.pathname === '/friends/add' ? styles['link-active'] : styles['links']
                }>
                    <i className="fas fa-user-plus"></i>
                    <p>Add Friends</p>
                </div>
            </Link>

            <Link to='/friends/requests'>
                <div className={
                    location.pathname === '/friends/requests' ? styles['link-active'] : styles['links']
                }>
                    <i className="fas fa-user-check"></i>
                    <p>Friend Requests</p>
                </div>
            </Link>

            <Link to='/friends/all'>
                <div className={
                    location.pathname === '/friends/all' ? styles['link-active'] : styles['links']
                }>
                    <i className="fas fa-user-friends"></i>
                    <p>All Friends</p>
                </div>
            </Link>

        </div>
    );
}

export default FriendsMenu;