import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from '../pages/home-page';
import RegisterPage from '../pages/user-register-page';
import LoginPage from '../pages/user-login-page';
import ErrorPage from '../pages/error-page';
import ChatPage from '../pages/chat-page';
import FriendsPage from '../pages/friends-page';
import AllFriendsPage from '../pages/friends-all-page';
import AddFriendsPage from '../pages/friends-add-page';

import UserContext from './Context';

function App() {
  const { loggedIn } = useContext(UserContext)
  return (

    <Router>
      <Switch>

        <Route exact path='/'>
          <HomePage />
        </Route>
        
        <Route exact path='/chat'>
          <ChatPage />
        </Route>

        <Route exact path='/friends'>
          <FriendsPage />
        </Route>

        <Route exact path='/friends/all'>
          <AllFriendsPage/>
        </Route>

        <Route exact path='/friends/add'>
          <AddFriendsPage/>
        </Route>

        <Route exact path='/login'>
          {loggedIn ? <ErrorPage /> : <LoginPage />}
        </Route>

        <Route exact path='/register'>
          {loggedIn ? <ErrorPage /> : <RegisterPage />}
        </Route>


        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
