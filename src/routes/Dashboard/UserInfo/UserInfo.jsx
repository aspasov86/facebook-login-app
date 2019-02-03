import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import './UserInfo.css';

const UserInfo = ({ name, email, image }) => (
  <Fragment>
    <Avatar className="user-info-avatar" alt="name" src={image} />
    <Typography color="textSecondary" gutterBottom>FACEBOOK USER</Typography>
    <Typography variant="h6">{name}</Typography>
    <Typography variant="subheading">{email}</Typography>
    <Divider />
  </Fragment>
);

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default UserInfo;
