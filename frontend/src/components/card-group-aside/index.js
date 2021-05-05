import React from 'react';
import styles from './index.module.css';
import CardInfo from '../card-info';
import { Link } from 'react-router-dom';

function GroupCardCompact({ group }) {
    if (!group) return null
    return (
        <div className={styles.container}>
            <div className={styles['img-holder']} style={group.image ? { backgroundImage: `url(${group?.image})` } : null} >
                <Link to={`/chat/${group._id}`}>
                    <h3>{group.name}</h3>
                </Link>
            </div>
            <div className={styles['info-holder']}>
                <CardInfo data={group} />
            </div>
        </div>
    )
}

export default GroupCardCompact;