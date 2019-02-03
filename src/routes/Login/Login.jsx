import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import { DataContext } from '../../context/DataProvder';
import Panel from '../../helpers/Panel';

class Login extends Component {
    responseHandler = (response) => {
      const { getFBdata, history } = this.props;
      getFBdata(response, history.push);
    }

    render() {
      const { startLoader } = this.props;
      return (
        <Panel>
          <FacebookLogin
            appId="1906696502957358"
            fields="name,email,picture"
            onClick={startLoader}
            callback={this.responseHandler}
          />
        </Panel>
      );
    }
}

Login.propTypes = {
  getFBdata: PropTypes.func.isRequired,
  startLoader: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

const LoginWithContext = props => (
  <DataContext.Consumer>
    {dataContext => (
      <Login
        getFBdata={dataContext.actions.getFBdata}
        startLoader={dataContext.actions.startLoader}
        {...props}
      />
    )}
  </DataContext.Consumer>
);

export default LoginWithContext;
