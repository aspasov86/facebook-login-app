import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { DataContext } from '../context/DataProvder';

const PrivateRoute = ({
  loggedIn, path, component: Component,
}) => (
  <Route
    path={path}
    render={() => (loggedIn ? <Component /> : <Redirect to="/login" />)}
  />
);

PrivateRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

const PrivateRouteWithContext = props => (
  <DataContext.Consumer>
    {dataContext => (
      <PrivateRoute
        loggedIn={dataContext.state.loggedIn}
        {...props}
      />
    )}
  </DataContext.Consumer>
);

export default PrivateRouteWithContext;
