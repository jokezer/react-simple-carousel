import * as React from 'react'
import PropTypes from 'prop-types';

const CarouselSlide = ({ className, content, image }) => {
  const style = image ? { backgroundImage: `url(${image})` } : {};

  return React.createElement('div', { className, style }, content);
};

CarouselSlide.propTypes = {
  content: PropTypes.node.isRequired,
  image: PropTypes.string,
  className: PropTypes.string.isRequired,
};

CarouselSlide.defaultProps = {
  image: null,
};

export default CarouselSlide;
