/* eslint-env browser */
import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { uniqBy } from 'lodash';
import getFacebookPlacesData from '../service/facebookPlaces';

export const DataContext = createContext();

class DataProvider extends Component {
  state = {
    loggedIn: false,
    name: '',
    email: '',
    image: '',
    coords: [],
    accessToken: '',
    places: [],
    error: false,
    errorMessage: '',
    errorState: '',
  }

  displayError = (message, color) => this.setState({ error: true, errorMessage: message, errorState: color });

  removeError = () => this.setState({ error: false, errorMessage: '', errorState: '' });

  render() {
    const { children } = this.props;
    return (
      <DataContext.Provider
        value={{
          state: { ...this.state },
          actions: {
            getFBdata: (response) => {
              if (response.name) {
                const {
                  name, email, accessToken, picture: { data: { url } },
                } = response;
                this.setState({
                  name,
                  email,
                  accessToken,
                  image: url,
                });
              } else if (response.status === undefined) {
                this.displayError('Error occured: Network problems', 'red');
              } else if (response.status === 'unknown') {
                this.displayError('Warning: You have to login using your Facebook account', '#ff9800');
              } else {
                this.displayError('Error occured: Unknown problems', 'red');
              }
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
                reject(this.displayError('Error occured: Can\'t fetch coordinates', 'red'));
              }
            }),
            getFacebookPlaces: async () => {
              const { coords, accessToken } = this.state;
              try {
                const results = await getFacebookPlacesData(coords, accessToken);
                const { data } = results.data;
                const places = uniqBy(data, 'name').slice(0, 5);
                this.setState({ places });
              } catch (e) {
                this.displayError('Error occured: Network problems', 'red');
              }
            },
            removeError: this.removeError,
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
