import React from 'react';
import styles from './index.module.css';
import UserLogo from '../user-avatar';
import GroupCardInfo from '../card-group-info';

function GroupCardCompact({ group }) {
    if (!group) return null
    return (
        <div className={styles.container} style={group.image ? { backgroundImage: `url(${group?.image})` } : null}>
            <div className={styles['img-holder']} >
                <h3>{group.name}</h3>
            </div>
            <div className={styles['info-holder']}>
                <GroupCardInfo data={group} />
            </div>
        </div>
    )
}

export default GroupCardCompact;