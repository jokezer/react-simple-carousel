import FontAwesome from 'react-fontawesome';

import { partial, times } from 'lodash';
import addBemName from 'add-bem-name';
import './style.scss';

const bemName = addBemName('_rsc-dots');

const CarouselDots = ({ className, setSlide, slideIndex, slidesCount }) =>
  React.createElement(
    'div',
    { className: classnames(bemName(), className) },
    times(slidesCount).map(index =>
      React.createElement(
        'button', {
          key: index,
          className: bemName('dot'),
          onClick: partial(setSlide, index),
          disabled: slideIndex === index,
        },
        React.createElement(FontAwesome, { name: 'circle' }),
    )),
  );

CarouselDots.propTypes = {
  setSlide: PropTypes.func.isRequired,
  slideIndex: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  slidesCount: PropTypes.number.isRequired,
};

export default CarouselDots;
