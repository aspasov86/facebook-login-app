import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import fbPlacesImg from '../media/fbplaces.jpg';

const Panel = ({ children }) => (
  <Card style={{ margin: '50px auto', maxWidth: 345 }}>
    <CardMedia style={{ height: 140 }} image={fbPlacesImg} title="Facebook Places" />
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

Panel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
};

export default Panel;
