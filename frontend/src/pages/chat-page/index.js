import React from 'react';
import styles from './index.module.css';
import Header from '../../components/header';
import Chat from '../../components/chat-form';
import Wrapper from '../../components/wrapper';

function ChatPage() {

    return (
        <div className={styles.container}>
            <Header />
            <Wrapper>
                <div className={styles['chat-holder']}>
                    <Chat></Chat>
                </div>
            </Wrapper>
        </div>
    );
}

export default ChatPage;