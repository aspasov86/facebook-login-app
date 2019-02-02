import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FacebookLogin from 'react-facebook-login';
import fbPlacesImg from '../../media/fbplaces.jpg';

class Login extends Component {
    clickHandler = () => console.log('clicked');

    responseHandler = response => console.log('res', response);

    render() {
      return (
        <Card style={{ margin: '50px auto', maxWidth: 345 }}>
          <CardMedia style={{ height: 140 }} image={fbPlacesImg} title="Facebook Places" />
          <CardContent>
            <FacebookLogin
              autoLoad
              appId="1906696502957358"
              fields="name,email,picture"
              onClick={this.clickHandler}
              callback={this.responseHandler}
            />
          </CardContent>
        </Card>
      );
    }
}

export default Login;
