import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import Marker from './Marker';

const Map = ({ coords, places }) => (
  <div style={{ height: '40vh' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyA4YY2s_y57R3Q7X4DOflKHchwEHsQCMXI' }}
      defaultCenter={{
        lat: coords[0],
        lng: coords[1],
      }}
      defaultZoom={15}
    >
      {places.map((place) => {
        const { name } = place;
        const { latitude, longitude } = place.location;
        return (
          <Marker
            key={name}
            title={name}
            lat={latitude}
            lng={longitude}
          />
        );
      })}
    </GoogleMapReact>
  </div>
);

Map.defaultProps = {
  coords: [],
  places: [],
};

Map.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.number),
  places: PropTypes.arrayOf(PropTypes.object),
};

export default Map;
