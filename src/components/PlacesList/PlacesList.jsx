import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const PlacesList = ({ places }) => (
  <Fragment>
    <Typography style={{ marginTop: 30 }} color="textSecondary" gutterBottom>CLOSEST FACEBOOK PLACES</Typography>
    <List>
      {places.map((place, index) => {
        const {
          name, id, location, picture: { data: { url } },
        } = place;
        return (
          <ListItem key={id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="name" src={url} />
            </ListItemAvatar>
            <ListItemText
              primary={`${index + 1} - ${name}`}
              secondary={`${location.city}, ${location.country}`}
            />
          </ListItem>
        );
      })}
    </List>
  </Fragment>
);

PlacesList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlacesList;
