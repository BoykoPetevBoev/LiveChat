import React from 'react';
import styles from './index.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>

                <div className={styles.footerInfo}>
                    <p className={styles.headerColor}>Helpful Links</p>
                    <p>Services</p>
                    <p>Support</p>
                    <p>Terms and Condition</p>
                    <p>Privacy Policy</p>
                </div>
                <div className={styles.footerInfo}>
                    <p className={styles.headerColor}>About Us</p>
                    <p>GAME ZONE is an official sales representative and service partner of the brands it offers on the site, which guarantees you quality after-sales service.</p>
                </div>
                <div className={styles.footerInfo}>
                    <p className={styles.headerColor}>Contact Us</p>
                    <p>Phone: 0876 000 000</p>
                    <p>Email: boykopetevboev@gmail.com</p>
                </div>

            </div>
        </footer >
    )
}

export default Footer