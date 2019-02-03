import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import UserInfo from './UserInfo/UserInfo';
import Panel from '../../helpers/Panel';
import Map from './Map/Map';
import PlacesList from './PlacesList/PlacesList';
import { DataContext } from '../../context/DataProvder';


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

  render() {
    const {
      data: {
        name, email, image, places, coords,
      },
    } = this.props;
    return (
      <Fragment>
        <Panel>
          <UserInfo name={name} email={email} image={image} />
          <PlacesList places={places} />
        </Panel>
        {!isEmpty(places) && (
          <Map coords={coords} places={places} />
        )}
      </Fragment>
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
