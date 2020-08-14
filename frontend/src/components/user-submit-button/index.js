import React from 'react';
import styles from './index.module.css'


function SubmitButton(props) {
    return (
        <button type="submit" className={styles['submit-button']} >{props.value}</button>
    );
}

export default SubmitButton;


        // class SubmitButton extends Component {
        //     render() {
        //         return (
        //         <button type="submit" className={styles['submit-button']} >{this.props.value}</button>
        //         );
        //     }
        // }