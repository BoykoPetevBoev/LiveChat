import React, { useState, useEffect } from 'react';
import UserContext from './Context';
import Loading from './components/loading';
import { userAuthorization } from './utils/requester';

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return cookieValue ? cookieValue[2] : null;
}

function Authorization(props) {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getCookie('GameZoneToken');
        if (!token) {
            logout();
            return
        }
        sendRequest(token);
    }, []);

    const sendRequest = async (token) => {
        const response = await userAuthorization(token);

        response.status
            ? login(response.user)
            : logout()
    }

    const updateUser = (user) => {
        if (!loggedIn) {
            return;
        }
        setUser(user);
    }

    const login = (user) => {
        setUser(user);
        setLoggedIn(true);
        setLoading(false);
        if (user && user._id === '5f32a1136431e10fd0cce82f') {
            setIsAdmin(true);
        }
    }

    const logout = () => {
        document.cookie = 'GameZoneToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setUser(null);
        setLoggedIn(false);
        setIsAdmin(false);
        setLoading(false);
    }

    if (loading) {
        return <Loading />
    }

    return (
        <UserContext.Provider value={{
            loggedIn,
            isAdmin,
            user,
            updateUser,
            login,
            logout
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default Authorization;