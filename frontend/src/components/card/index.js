import React from 'react';
import styles from './index.module.css';
import CardInfo from '../card-info';
import CardButtons from '../card-buttons';

function Card({ data, buttons, id }) {
    if (!data?._id) return null;
    return (
        <div className={styles.container}>
            <div className={styles.card} style={{ backgroundImage: `url(${data.image})` }}>
                <div className={styles.name}>
                    {data.username ? <p>{data.username}</p> : null}
                    {data.name ? <p>{data.name}</p> : null}
                </div>
                <CardInfo data={data} />
            </div>
            <CardButtons data={data} buttons={buttons} id={id} />
        </div>
    );
}

export default Card;