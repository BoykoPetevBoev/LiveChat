import React from 'react';
import styles from './index.module.css';

function UserInfo({ data }) {
    if (!data) return null;
    return (
        <div className={styles.holder}>

            {data.email ?
                <a className={styles['card-info']} href={`mailto:${data.email}`} target="_blank">
                    <i className="fas fa-envelope"></i>
                    <p>{data?.email}</p>
                </a>
                : null}

            {data.phone ?
                <div className={styles['card-info']}>
                    <i className="fas fa-phone"></i>
                    <p>{data.phone}</p>
                </div>
                : null}

            {data.address ?
                <a className={styles['card-info']} href={`http://maps.google.com/?q=1200 ${data.address}`} target="_blank">
                    <i className="fas fa-map-marker-alt"></i>
                    <p>{data.address}</p>
                </a>
                : null}

            {data.website ?
                <a className={styles['card-info']} href={data.website} target="_blank">
                    <i className="fas fa-link"></i>
                    <p target="_blank" href={data.website}>{data.website.split('/')[2]}</p>
                </a>
                : null}

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
        </div>
    )
}

export default UserInfo;