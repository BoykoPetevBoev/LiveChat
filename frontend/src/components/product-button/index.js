import React from 'react';
import styles from './index.module.css';

function ProductButton({children, onClick, name}) {
    return (
        <button onClick={onClick} className={styles.button}>
            {children}
            {name}
        </button>
    );
}

export default ProductButton;