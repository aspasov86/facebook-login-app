import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import { DataContext } from '../../context/DataProvder';
import Panel from '../../helpers/Panel';

class Login extends Component {
    responseHandler = async (response) => {
      const {
        getFBdata, login, history,
      } = this.props;
      await getFBdata(response);
      login(history.push);
    }

    render() {
      return (
        <Panel>
          <FacebookLogin
            appId="1906696502957358"
            fields="name,email,picture"
            callback={this.responseHandler}
          />
        </Panel>
      );
    }
}

Login.propTypes = {
  getFBdata: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

const LoginWithContext = props => (
  <DataContext.Consumer>
    {dataContext => (
      <Login
        getFBdata={dataContext.actions.getFBdata}
        login={dataContext.actions.login}
        {...props}
      />
    )}
  </DataContext.Consumer>
);

export default LoginWithContext;
