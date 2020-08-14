import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from './pages/home-page';
import RegisterPage from './pages/user-register-page';
import LoginPage from './pages/user-login-page';
import AdminPage from './pages/admin-page';
import ProductFormPage from './pages/admin-product-form';
import UsersTable from './pages/admin-users-table';
import ProductTable from './pages/admin-products-table';
import ProductPage from './pages/product-page';
import ErrorPage from './pages/error-page';
import UserPage from './pages/user-profile-page';
import ShoppingCart from './pages/user-shopping-cart';
import Wishlist from './pages/user-wishlist-page';

import UserContext from './Context';

function App() {
  const { loggedIn, isAdmin } = useContext(UserContext)
  return (

    <Router>
      <Switch>

        <Route exact path='/'>
          <HomePage />
        </Route>

        <Route exact path='/mouse'>
          <HomePage filter='mouse' />
        </Route>

        <Route exact path='/keyboard' >
          <HomePage filter='keyboard' />
        </Route>

        <Route exact path='/headset' >
          <HomePage filter='headset' />
        </Route>

        <Route exact path='/mousepad' >
          <HomePage filter='mousepad' />
        </Route>

        <Route exact path='/accessory' >
          <HomePage filter='accessory' />
        </Route>

        <Route exact path='/login'>
          {loggedIn ? <ErrorPage /> : <LoginPage />}
        </Route>
        <Route exact path='/register'>
          {loggedIn ? <ErrorPage /> : <RegisterPage />}
        </Route>

        <Route exact path='/admin'>
          {isAdmin ? <AdminPage /> : <ErrorPage />}
        </Route >
        <Route exact path='/admin/form'>
          {isAdmin ? <ProductFormPage /> : <ErrorPage />}
        </Route>
        <Route exact path='/admin/users' >
          {isAdmin ? <UsersTable /> : <ErrorPage />}
        </Route>
        <Route exact path='/admin/products' >
          {isAdmin ? <ProductTable /> : <ErrorPage />}
        </Route>

        <Route exact path='/profile' >
          {loggedIn ? <UserPage /> : <ErrorPage />}
        </Route>
        <Route exact path='/shopping-cart' >
          {loggedIn ? <ShoppingCart /> : <ErrorPage />}
        </Route>
        <Route exact path='/wishlist' >
          {loggedIn ? <Wishlist /> : <ErrorPage />}
        </Route>

        <Route exact path='/mouse/:id' component={ProductPage} />
        <Route exact path='/keyboard/:id' component={ProductPage} />
        <Route exact path='/headset/:id' component={ProductPage} />
        <Route exact path='/mousepad/:id' component={ProductPage} />
        <Route exact path='/accessory/:id' component={ProductPage} />

        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
