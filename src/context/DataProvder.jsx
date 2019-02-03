/* eslint-env browser */
import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { uniqBy } from 'lodash';
import getFacebookPlacesData from '../service/facebookPlaces';

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
              const results = await getFacebookPlacesData(coords, accessToken);
              const { data } = results.data;
              const places = uniqBy(data, 'name').slice(0, 5);
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
