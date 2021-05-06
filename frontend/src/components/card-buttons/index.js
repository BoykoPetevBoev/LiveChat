import React, { useContext } from 'react';
import UserContext from '../../react/Context';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

function CardButtons({ data, buttons, id }) {
    const context = useContext(UserContext);
    if (!data) return null;
    return (
        <div className={styles.buttons}>
            {typeof buttons?.add === 'function'
                ? <button className={styles.btn} onClick={buttons.add} value={data._id}>+ Add</button>
                : null}
            {typeof buttons?.confirm === 'function'
                ? <button className={styles.btn} onClick={buttons.confirm} value={data._id}>Confirm</button>
                : null}
            {buttons?.redirect && !id
                ? <Link className={styles.btn} to={`/chat/${data._id}`}>Message</Link>
                : null}
            {buttons?.redirect && id
                ? <Link className={styles.btn} to={`/chat/${id}`}>Message</Link>
                : null}
            {buttons?.settings && context.user._id === data.admin
                ? <Link className={styles.btn2} to={`/group/${data._id}`}>Settings</Link>
                : null}
            {typeof buttons?.remove === 'function'
                ? <button className={styles.btn2} onClick={buttons.remove} value={data._id}>Remove</button>
                : null}
        </div>
    )
}

export default CardButtons;