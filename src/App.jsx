import React from 'react';
import './App.css';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import PrivateRoute from './helpers/PrivateRoute';
import Header from './components/Header/Header';
import Login from './routes/Login/Login';
import Dashboard from './routes/Dashboard/Dashboard';
import DataProvider from './context/DataProvder';
import StatusMessage from './components/StatusMessage/StatusMessage';

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
      <StatusMessage />
    </DataProvider>
  </div>
);

export default App;
