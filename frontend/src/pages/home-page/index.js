import React from 'react';
import styles from './index.module.css'
import Header from '../../components/header';


function HomePage() {

    return (
        <div className={styles.page}>
            <Header />

            <div className={styles.content}>
                <h1>Your place to talk</h1>
                <p>Whether you’re part of a school club, gaming group, worldwide art community, or just a handful of friends that want to spend time together, Discord makes it easy to talk every day and hang out more often.</p>
            </div>
        </div>
    )
}

export default HomePage