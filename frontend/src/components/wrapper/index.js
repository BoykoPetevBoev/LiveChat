import React from 'react';
import styles from './index.module.css';
import Header from '../header';
import Footer from '../footer';
import Navigation from '../navigation';

function Wrapper(props) {
    return (
        <div>
            <Header />

            <div className={styles.wrapper}>
            <Navigation />
                {props.children}
            </div>

            {/* <Footer /> */}
        </div>
    );
}

export default Wrapper;