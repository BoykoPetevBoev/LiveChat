import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

function CardWrapper({ children, id, add, confirm, remove, redirect }) {

    if (!id) return null;
    return (
        <div className={styles.wrapper}>

            {children}

            <div className={styles.buttons}>
                {typeof add === 'function'
                    ? <button className={styles.btn} onClick={add} value={id}>+ Add</button>
                    : null}
                {typeof confirm === 'function'
                    ? <button className={styles.btn} onClick={confirm} value={id}>Confirm</button>
                    : null}
                {redirect
                    ? <Link className={styles.btn} to={`/chat/${id}`}>Message</Link>
                    : null}
                {typeof remove === 'function'
                    ? <button className={styles.btn2} onClick={remove} value={id}>Remove</button>
                    : null}
            </div>

        </div>
    );
}

export default CardWrapper;