import React from 'react';

const UserContext = React.createContext({
    loggedIn: false,
    user: null,
    // socket: null,
    updateUser: () => {},
    login: () => {},
    logout: () => {},
});

export default UserContext;