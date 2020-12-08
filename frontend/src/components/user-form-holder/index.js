import React from 'react';
import styles from './index.module.css'


function FormHolder(props) {
    
    return (
        <div className={styles['form-holder']}>
            <h1>{props.title}</h1>
            <div>
                {props.children}
            </div>
        </div>
    );
}

export default FormHolder;