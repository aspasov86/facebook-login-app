import React from 'react';
import './App.css';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import PrivateRoute from './helpers/PrivateRoute';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import DataProvider from './context/DataProvder';

const App = () => (
  <div className="App">
    <DataProvider>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="/" render={() => <Redirect to="/login" />} />
        </Switch>
      </BrowserRouter>
    </DataProvider>
  </div>
);

export default App;
