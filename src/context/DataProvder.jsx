/* eslint-env browser */
import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { getFacebookPlacesInfo, getFacebookPlaceCoords } from '../service/facebookPlaces';

export const DataContext = createContext();

class DataProvider extends Component {
  state = {
    loggedIn: false,
    fbAuthenticated: false,
    name: '',
    email: '',
    image: '',
    coords: [],
    accessToken: '',
    places: [],
  }

  render() {
    const { children } = this.props;
    return (
      <DataContext.Provider
        value={{
          state: { ...this.state },
          actions: {
            getFBdata: ({
              name, email, accessToken, picture: { data: { url } },
            }) => {
              this.setState({
                name,
                email,
                accessToken,
                fbAuthenticated: true,
                image: url,
              });
            },
            login: (redirectTo) => {
              this.setState({ loggedIn: true });
              redirectTo('/dashboard');
            },
            getCoordinates: () => new Promise((resolve, reject) => {
              if (navigator.geolocation) {
                navigator.geolocation
                  .getCurrentPosition(({ coords: { latitude, longitude } }) => {
                    resolve(this.setState({ coords: [latitude, longitude] }));
                  });
              } else {
                reject(new Error('No available Geolocation'));
              }
            }),
            getFacebookPlaces: async () => {
              const { coords, accessToken } = this.state;
              const results = await getFacebookPlacesInfo(coords, accessToken);
              const placesData = results.data.data;
              const locationsData = await Promise.all(placesData.map(place => getFacebookPlaceCoords(place.id, accessToken)));
              const places = placesData.map((place, i) => ({ ...place, location: locationsData[i].data.location }));
              this.setState({ places });
            },
          },
        }}
      >
        {children}
      </DataContext.Provider>
    );
  }
}

DataProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.shape({}),
  ]).isRequired,
};

export default DataProvider;
