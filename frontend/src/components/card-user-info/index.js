import React from 'react';
import styles from './index.module.css';
// import { Link } from 'react-router-dom';

function UserCardInfo({ data }) {
    if (!data) return null;
    return (
        <div className={styles.holder}>
            {data.email ?
                <div className={styles['card-info']}>
                    <i className="fas fa-envelope"></i>
                    <p>{data?.email}</p>
                </div>
                : null}
            {data.phone ?
                <div className={styles['card-info']}>
                    <i className="fas fa-phone"></i>
                    <p>{data.phone}</p>
                </div>
                : null}
            {data.address ?
                <div className={styles['card-info']}>
                    <i className="fas fa-map-marker-alt"></i>
                    <p>{data.address}</p>
                </div>
                : null}
            {data.website ?
                <div className={styles['card-info']}>
                    <i className="fas fa-link"></i>
                    <p target="_blank" href={data.website}>{data.website.split('/')[2]}</p>
                </div>
                : null}
        </div>
    )
}

export default UserCardInfo;