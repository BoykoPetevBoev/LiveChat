import React, { useState, useEffect } from 'react';
import UserContext from './Context';
import Loading from '../components/loading';
import { userAuthorization } from '../utils/requester';

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
        const token = getCookie('Token');
        if (!token) return logout();
        sendRequest(token);
    }, []);

    const sendRequest = async (token) => {
        const user = await userAuthorization(token);
        user ? login(user) : logout();
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
    }

    const logout = () => {
        document.cookie = 'Token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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