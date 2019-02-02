import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import GoogleMapReact from 'google-map-react';
import Tooltip from '@material-ui/core/Tooltip';
import UserInfo from '../UserInfo/UserInfo';
import Panel from '../../helpers/Panel';
import { DataContext } from '../../context/DataProvder';

const Marker = ({ title }) => (
  <Tooltip title={title}>
    <div style={{
      height: 15, width: 15, background: 'firebrick', borderRadius: '50%',
    }}
    />
  </Tooltip>
);

Marker.propTypes = { title: PropTypes.string.isRequired };

class Dashboard extends Component {
  componentDidMount() {
    const { getCoordinates } = this.props;
    getCoordinates();
  }

  componentDidUpdate(prevProps) {
    const { data: { coords }, getFacebookPlaces } = this.props;
    if (isEmpty(prevProps.data.coords) && !isEmpty(coords)) {
      getFacebookPlaces();
    }
  }

  renderGoogleMap = () => {
    let map = null;
    const { data: { places, coords } } = this.props;
    if (!isEmpty(places)) {
      map = (
        <div style={{ height: '40vh' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyA4YY2s_y57R3Q7X4DOflKHchwEHsQCMXI' }}
            defaultCenter={{
              lat: coords[0],
              lng: coords[1],
            }}
            defaultZoom={11}
          >
            {places.map(place => (
              <Marker
                key={place.name}
                title={place.name}
                lat={place.latitude}
                lng={place.longitude}
              />
            ))}
          </GoogleMapReact>
        </div>
      );
    }
    return map;
  }

  render() {
    const {
      data: { name, email, image },
    } = this.props;
    return (
      <Panel image={image} title="User Info">
        <UserInfo name={name} email={email} />
        {this.renderGoogleMap()}
      </Panel>
    );
  }
}

Dashboard.propTypes = {
  data: PropTypes.shape({}).isRequired,
  getCoordinates: PropTypes.func.isRequired,
  getFacebookPlaces: PropTypes.func.isRequired,
};

const DashboardWithContext = props => (
  <DataContext.Consumer>
    {dataContext => (
      <Dashboard
        data={dataContext.state}
        getCoordinates={dataContext.actions.getCoordinates}
        getFacebookPlaces={dataContext.actions.getFacebookPlaces}
        {...props}
      />
    )}
  </DataContext.Consumer>
);


export default DashboardWithContext;
