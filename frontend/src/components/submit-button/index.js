import React from 'react';
import styles from './index.module.css'

function SubmitButton(props) {
    return (
        <button type="submit" className={styles['submit-button']} >{props.value}</button>
    );
}

export default SubmitButton;

