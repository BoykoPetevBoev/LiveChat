import React from 'react';
import styles from './index.module.css';

function Menu() {
    return (
        <div className={styles.aside}>
            <div>
                <p> <i className="fas fa-user"></i> Friends</p>
                {/* <i className="fas fa-user-slash"></i> */}
            </div>
            <div>
                <p> <i className="fas fa-users"></i> Rooms</p>
                {/* <i className="fas fa-users-slash"></i> */}
            </div>
        </div>
    )
}

export default Menu