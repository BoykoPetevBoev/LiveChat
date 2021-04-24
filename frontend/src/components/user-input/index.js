import React from 'react';
import styles from './index.module.css';

function Input({ name, err, type, placeholder, value, onChange, label }) {
    return (
        <div className={styles.container}>
            <p className={styles.line}>
                {err}
            </p>
            <div className={styles['input-wrap']} >
                {label ? <label className={styles.label} htmlFor={name}>{label}</label> : null}
                <input
                    name={name}
                    className={err ? styles.errorBox : styles.input}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    autoComplete="on" />
            </div >
        </div>
    )
}

export default Input