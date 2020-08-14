import React from 'react';
import styles from './index.module.css';

function SimpleTable({characteristics}) {

    const loadLine = () => {    
        return characteristics.map((tuple, index) => {
            return (
                <tr key={index} className={styles.tr}>
                    <th>{tuple[0]}</th>
                    <td>{tuple[1]}</td>
                </tr>
            )
        })
    }

    return (
        <table className={styles.table}>
            <tbody className={styles.tbody}>
                {characteristics ? loadLine() : null}
            </tbody>
        </table>
    );
};

export default SimpleTable;