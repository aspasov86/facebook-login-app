import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

const Marker = ({ title, index }) => (
  <Tooltip title={title}>
    <div style={{
      height: 15, width: 15, background: 'firebrick', borderRadius: '50%', border: '2px solid gray', color: 'white',
    }}
    >
      {index + 1}
    </div>
  </Tooltip>
);

Marker.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Marker;
