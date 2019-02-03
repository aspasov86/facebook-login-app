import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

const Marker = ({ title }) => (
  <Tooltip title={title}>
    <div style={{
      height: 15, width: 15, background: 'firebrick', borderRadius: '50%', border: '2px solid gray',
    }}
    />
  </Tooltip>
);

Marker.propTypes = { title: PropTypes.string.isRequired };

export default Marker;
