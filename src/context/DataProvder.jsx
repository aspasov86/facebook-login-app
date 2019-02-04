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
    loading: false,
  }

  displayError = (message, color) => this.setState({
    error: true,
    errorMessage: message,
    errorState: color,
    loading: false,
  });

  removeError = () => this.setState({ error: false, errorMessage: '', errorState: '' });

  startLoader = () => this.setState({ loading: true });

  closeLoader = () => this.setState({ loading: false });

  render() {
    const { children } = this.props;
    return (
      <DataContext.Provider
        value={{
          state: { ...this.state },
          actions: {
            getFBdata: (response, redirectTo) => {
              if (response.name) {
                const {
                  name, email, accessToken, picture: { data: { url } },
                } = response;
                this.setState({
                  name,
                  email,
                  accessToken,
                  loggedIn: true,
                  loading: false,
                  image: url,
                }, () => redirectTo('/dashboard'));
              } else {
                this.displayError('Error occured: Failed to login', 'red');
              }
            },
            getCoordinates: () => new Promise(async (resolve, reject) => {
              this.setState({ loading: true });
              if (navigator.geolocation) {
                const permission = await navigator.permissions.query({ name: 'geolocation' });
                if (permission.state === 'denied') {
                  reject(this.displayError('You have to allow access to your location', '#ff9800'));
                }
                permission.onchange = (e) => {
                  const { state } = e.target;
                  if (state === 'denied') {
                    reject(this.displayError('You have to allow access to your location', '#ff9800'));
                  }
                };
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
                this.setState({ places, loading: false });
              } catch (e) {
                this.displayError('Error occured: Network problems', 'red');
              }
            },
            startLoader: this.startLoader,
            removeError: this.removeError,
            closeLoader: this.closeLoader,
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
