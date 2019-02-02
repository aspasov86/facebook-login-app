import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import { DataContext } from '../../context/DataProvder';
import Panel from '../../helpers/Panel';
import fbPlacesImg from '../../media/fbplaces.jpg';

class Login extends Component {
    clickHandler = () => {
      const { fbAuthenticated, login, history } = this.props;
      if (fbAuthenticated) login(history.push);
    };

    responseHandler = (response) => {
      const {
        fbAuthenticated, getFBdata, login, history,
      } = this.props;
      if (fbAuthenticated) {
        login(history.push);
      } else {
        getFBdata(response);
      }
    }

    render() {
      return (
        <Panel image={fbPlacesImg} title="Facebook Places">
          <FacebookLogin
            autoLoad
            appId="1906696502957358"
            fields="name,email,picture"
            onClick={this.clickHandler}
            callback={this.responseHandler}
          />
        </Panel>
      );
    }
}

Login.propTypes = {
  fbAuthenticated: PropTypes.bool.isRequired,
  getFBdata: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

const LoginWithContext = props => (
  <DataContext.Consumer>
    {dataContext => (
      <Login
        fbAuthenticated={dataContext.state.fbAuthenticated}
        getFBdata={dataContext.actions.getFBdata}
        login={dataContext.actions.login}
        {...props}
      />
    )}
  </DataContext.Consumer>
);

export default LoginWithContext;
