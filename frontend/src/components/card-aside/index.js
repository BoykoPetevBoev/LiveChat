import React from 'react';
import styles from './index.module.css';
import CardInfo from '../card-info';
import { Link } from 'react-router-dom';

function CardAside({ data, path }) {
    if (!data) return null
    return (
        <div className={styles.container}>
            <div
                className={styles['img-holder']}
                style={data.image ? { backgroundImage: `url(${data?.image})` } : null}
            >
                <Link to={path ? path : '/chat'}>
                    <h3>{data.name}</h3>
                    <h3>{data.username}</h3>
                </Link>
            </div>

            <div className={styles['info-holder']}>
                <CardInfo data={data} />
            </div>

        </div>
    )
}

export default CardAside;