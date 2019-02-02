import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const Panel = ({ children, image, title }) => (
  <Card style={{ margin: '50px auto', maxWidth: 345 }}>
    <CardMedia style={{ height: 140 }} image={image} title={title} />
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

Panel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Panel;
