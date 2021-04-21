import React, { useState, useEffect } from 'react';
import UserContext from './Context';
import Loading from '../pages/loading';
import { userAuthorization } from '../requester';

function getCookie(name) {
    const cookieValue = localStorage.getItem(name);
    return cookieValue;
}

function Authorization(props) {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        // setLoading(true);
        const token = getCookie('token');
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
        localStorage.removeItem('token');;
        setUser(null);
        setLoggedIn(false);
        setLoading(false);
    }

    // if (loading) return <Loading />

    return (
        <UserContext.Provider value={{
            loggedIn,
            user,
            updateUser,
            login,
            logout,
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default Authorization;