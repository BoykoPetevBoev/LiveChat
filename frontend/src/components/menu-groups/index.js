import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function GroupsMenu() {

    const [path, setPath] = useState('');
    const location = useLocation();

    useEffect(() => {
        setPath(location.pathname);
    })

    return (
        <div className={styles.container}>

            <Link to='/group/create'>
                <div className={path === '/group/create' ? styles['link-active'] : styles.links}>
                    <i className="fas fa-user-plus"></i>
                    <p>Greate Group</p>
                </div>
            </Link>

            <Link to='/group/all'>
                <div className={path === '/group/all' ? styles['link-active'] : styles.links}>
                    <i className="fas fa-users"></i>
                    <p>My Groups</p>
                </div>
            </Link>

            <Link to='/group/find'>
                <div className={path === '/group/find' ? styles['link-active'] : styles.links}>
                    <i className="fas fa-user-friends"></i>
                    <p>Find Group</p>
                </div>
            </Link>

        </div>
    );
}

export default GroupsMenu;