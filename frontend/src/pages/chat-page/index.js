import React from 'react';
import styles from './index.module.css';
import Header from '../../components/header';
import Chat from '../../components/chat-form';
import Menu from '../../components/aside-menu';



function ChatPage() {


    return (
        <div className={styles["container"]}>
            <Header />
            <main className={styles.main}>
                <div className={styles.aside}>
                    <Menu></Menu>
                </div>
                <div className={styles['chat-holder']}>
                    <Chat></Chat>
                </div>
                {/* <div className={styles.aside}></div> */}
            </main>
        </div>
    );
}

export default ChatPage;