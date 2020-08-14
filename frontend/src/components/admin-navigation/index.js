import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <div className={styles.conteiner}>
            <ul>
                <li>
                    <Link className={styles.link} to='/'>Home</Link>
                </li>
                <li>
                    <Link className={styles.link} to='/admin/form'>Add Product</Link>
                </li>
                <li>
                    <Link className={styles.link} to='/admin/users'>Users Table</Link>
                </li>
                <li>
                    <Link className={styles.link} to='/admin/products'>Products Table</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navigation