import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const UserInfo = ({ name, email }) => (
  <Fragment>
    <Typography>FACEBOOK USER:</Typography>
    <Typography>name: {name}</Typography>
    <Typography>email: {email}</Typography>
  </Fragment>
);

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default UserInfo;
