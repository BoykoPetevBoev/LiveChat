import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function GroupsMenu() {
    const location = useLocation();
    return (
        <div className={styles.container}>

            <Link to='/group/create'>
                <div className={location.pathname === '/group/create' ? styles['link-active'] : styles.links}>
                    <i className="fas fa-user-plus"></i>
                    <p>Create New Group</p>
                </div>
            </Link>

            <Link to='/group/all'>
                <div className={location.pathname === '/group/all' ? styles['link-active'] : styles.links}>
                    <i className="fas fa-users"></i>
                    <p>My Groups</p>
                </div>
            </Link>

            {/* <Link to='/group/find'>
                <div className={location.pathname === '/group/find' ? styles['link-active'] : styles.links}>
                    <i className="fas fa-user-friends"></i>
                    <p>Find Group</p>
                </div>
            </Link> */}

        </div>
    );
}

export default GroupsMenu;