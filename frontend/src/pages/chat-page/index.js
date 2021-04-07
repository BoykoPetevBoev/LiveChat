import React, { useContext, useEffect, useState } from 'react';
import styles from './index.module.css';
import Header from '../../components/header';
import Chat from '../../components/chat-form';
import Wrapper from '../../components/wrapper';
import UserContext from '../../react/Context';
import { getChat } from '../../utils/requester';
import io from 'socket.io-client';

let socket;

function ChatPage(props) {
    const context = useContext(UserContext);
    const [user, setUser] = useState(context.user);
    const [chat, setChat] = useState();

    useEffect(() => {
        const chatId = props?.match?.params?.id;

        getChat(chatId)
            .then(chatData => { setChat(chatData) })
            .catch(e => { console.error(e) });
        setUser(context.user)

        // socket = io('http://localhost:5000/chat', {
        //     withCredentials: true,
        //     extraHeaders: {
        //         "my-custom-header": "abcd"
        //     }
        // })

        // console.log(socket);

    }, [props])

    console.log(chat);

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