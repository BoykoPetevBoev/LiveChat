import React from 'react';
import styles from './index.module.css';
import Menu from '../../components/aside-menu';

function Wrapper(props) {
    return (
        <main className={styles.main}>
            <Menu></Menu>
            <div className={styles.holder}>
                {props.children}
            </div>
        </main>
    );
}

export default Wrapper;