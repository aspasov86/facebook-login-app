import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import './Marker.css';

const Marker = ({ title, index }) => (
  <Tooltip title={title}>
    <div className="marker">{index + 1}</div>
  </Tooltip>
);

Marker.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Marker;
