import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

function HeaderButtons({ name, path, onClick }) {
    return (

        <div className={styles.skew}>
            <Link className={styles.button} to={path} onClick={onClick}>
                    {name}
            </Link>
        </div>
        
    );
}
export default HeaderButtons
