import React from 'react';
import styles from './index.module.css';

function AdminInput({ name, type, placeholder, value, onChange }) {
    return (
        <div>

            <input
                className={styles.input}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            >
            </input>

        </div>
    );
}

export default AdminInput;