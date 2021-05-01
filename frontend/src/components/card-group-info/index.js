import React from 'react';
import styles from './index.module.css';
// import { Link } from 'react-router-dom';

function GroupCardInfo({ data }) {
    // console.log(data);
    if (!data) return null;
    return (
        <div className={styles.holder}>
            {data.about ?
                <div className={styles['card-info']}>
                    <i className="fas fa-info-circle"></i>
                    <p>{data?.about}</p>
                </div>
                : null}
            {data.members ?
                <div className={styles['card-info']}>
                    <i className="fas fa-users"></i>
                    <p>{data?.members.length}</p>
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

export default GroupCardInfo;