import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const UserInfo = ({ name, email, image }) => (
  <Fragment>
    <Avatar alt="name" src={image} style={{ margin: '10px auto', width: 60, height: 60 }} />
    <Typography color="textSecondary" gutterBottom>FACEBOOK USER</Typography>
    <Typography variant="h6">{name}</Typography>
    <Typography variant="caption">{email}</Typography>
    <Divider />
  </Fragment>
);

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default UserInfo;
