import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import fbPlacesImg from '../media/fbplaces.jpg';
import './Panel.css';

const Panel = ({ children }) => (
  <Card className="panel-card">
    <CardMedia className="panel-card-media" image={fbPlacesImg} title="Facebook Places" />
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
