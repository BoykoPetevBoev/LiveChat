import React from 'react';
import styles from './index.module.css';

function Input({name, err, type, placeholder, value, onChange}) {
    return (
        <div className={styles['field-wrap']} >
            <p className={styles.line}>
                {err}
            </p>
            <input
                name={name}
                className={err ? styles.errorBox : styles.input}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange} />
        </div >
    )
}

export default Input