import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserContext from './Context';

import HomePage from '../pages/home';
import RegisterPage from '../pages/user-register';
import LoginPage from '../pages/user-login';
import ErrorPage from '../pages/error';
import ChatPage from '../pages/chat';
import GroupPage from '../pages/group';
import FriendsPage from '../pages/friends';
import AllFriendsPage from '../pages/friends-all';
import AddFriendsPage from '../pages/friends-add';
import FriendRequestsPage from '../pages/friends-requests';

function App() {
  const { loggedIn } = useContext(UserContext)
  return (

    <Router>
      <Switch>

        <Route exact path='/'>
          <HomePage />
        </Route>

        <Route exact path='/chat/:id' component={loggedIn ? ChatPage : ErrorPage}/>

        <Route exact path='/chat'>
          {loggedIn ? <ChatPage /> : <ErrorPage />}
        </Route>

        <Route exact path='/group'>
          {loggedIn ? <GroupPage /> : <ErrorPage />}
        </Route>

        <Route exact path='/friends'>
          {loggedIn ? <FriendsPage /> : <ErrorPage />}
        </Route>

        <Route exact path='/friends/all'>
          {loggedIn ? <AllFriendsPage /> : <ErrorPage />}
        </Route>

        <Route exact path='/friends/requests'>
          {loggedIn ? <FriendRequestsPage /> : <ErrorPage />}
        </Route>

        <Route exact path='/friends/add'>
          {loggedIn ? <AddFriendsPage /> : <ErrorPage />}
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
