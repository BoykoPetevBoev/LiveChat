import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

function Navigation() {

    return (
        <div className={styles['menu-list']}>
            <ul>

                <li className={styles['special-effects']} >
                    <Link className={styles.link} to="/mouse">
                        MOUSE
                    </Link>
                </li>
                <li className={styles['special-effects']}>
                    <Link className={styles.link} to="/keyboard">
                        KEYBOARDS
                    </Link>
                </li>
                <li className={styles['special-effects']}>
                    <Link className={styles.link} to="/headset">
                        HEADSETS
                    </Link>
                </li>
                <li className={styles['special-effects']}>
                    <Link className={styles.link} to="/mousepad">
                        MOUSEPADS
                    </Link>
                </li>
                <li className={styles['special-effects']}>
                    <Link className={styles.link} to="/accessory">
                        ACCESSORIES
                    </Link>
                </li>

            </ul>
        </div>
    );
}

export default Navigation