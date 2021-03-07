import React from 'react';

const UserContext = React.createContext({
    loggedIn: false,
    isAdmin: false,
    user: null,
    updateUser: () => {},
    login: () => {},
    logout: () => {},
});

export default UserContext;