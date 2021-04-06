import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

function UserAvatar(props) {
    const [username, setUsername] = useState(props.username);
    const [color, setColor] = useState('#66ad00');

    useEffect(() => {
        setUsername(props.username);
        setColor('#66ad00');
    }, [props.username])

    return (
        <div className={styles.img} style={{'backgroundColor': color}}>
            <p>{username[0]}</p>
        </div>
    );
}

export default UserAvatar;