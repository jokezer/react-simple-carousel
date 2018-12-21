import React from 'react';
import { isNumber } from 'lodash';
import addBemName from 'add-bem-name';
import Arrow from '../arrow/arrow';
import CarouselSlide from '../slide/slide';
import CarouselDots from '../dots/dots';
import getElementHeight from '../utils/getElementHeight';

import './style.scss';

const bemName = addBemName('_rsc-main');

class ReactSimleCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.setSlide = this.setSlide.bind(this);
    this.setNextSlide = this.setNextSlide.bind(this);
    this.setPrevioutSlide = this.setPrevioutSlide.bind(this);
    this.setSlideHeight = this.setSlideHeight.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.stopTimeout = this.stopTimeout.bind(this);
    const slidesCount = props.children.length;

    this.slides = {};
    this.state = {
      slideIndex: 0,
      slidesCount,
      autoplay: props.autoplay,
      navigation: slidesCount > 1,
      offset: 0,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.setSlideHeight, false);
    this.runAutoplay();
  }

  componentDidMount() {
    this.setSlideHeight(0);
  }

  componentWillUnmount() {
    this.stopTimeout();
    window.removeEventListener('resize', this.setSlideHeight, false);
  }

  onKeyDown({ keyCode }) {
    switch (keyCode) {
      case 37:
        this.stopTimeout();
        return this.setPrevioutSlide();
      case 39:
        this.stopTimeout();
        return this.setNextSlide();
      default:
        return null;
    }
  }

  setSlideHeight(index) {
    if (!this.props.changeSlideHeight) return;
    const slideIndex = isNumber(index) ? index : this.state.slideIndex;
    const currentSlide = _.get(this.slides, `[${slideIndex}].firstChild`, null);

    if (!currentSlide) return;
    const height = getElementHeight(currentSlide);
    this.slidesContainer.style.height = `${height}px`;
  }

  setNextSlide() {
    const { slideIndex } = this.state;
    return this.isLastSlide() ? this.setSlide(0) : this.setSlide(slideIndex + 1);
  }

  setPrevioutSlide() {
    const { slidesCount, slideIndex } = this.state;
    return this.isFirstSlide() ? this.setSlide(slidesCount - 1) : this.setSlide(slideIndex - 1);
  }

  setSlide(slideIndex) {
    this.setState({
      slideIndex,
      offset: slideIndex * -100,
    });

    this.setSlideHeight(slideIndex);
    this.props.afterSlideCallback();
  }

  runAutoplay() {
    const { autoplay } = this.state;
    const { autoplayInterval } = this.props;

    if (!autoplay) return;

    this.autoplayInterval = setInterval(this.setNextSlide, autoplayInterval);
  }

  stopTimeout() {
    clearInterval(this.autoplayInterval);
    this.setState({ autoplay: false });
  }

  isLastSlide() {
    const { slideIndex, slidesCount } = this.state;
    return slideIndex + 1 === slidesCount;
  }

  isFirstSlide() {
    return this.state.slideIndex === 0;
  }

  render() {
    const {
      wrapAround, autoplay, autoplayInterval, children, className, mobile
    } = this.props;

    const { slideIndex, slidesCount, navigation, offset } = this.state;

    const slides = React.Children.map(children, (slide, index) => (
      React.createElement(
        'div', {
          key: index,
          className: bemName('slide-container'),
          ref: (node) => { this.slides[index] = node; }
        },
        slide,
      )));

    return React.createElement(
      'div', {
        className: classnames(bemName(), className, {
          [bemName(null, 'mobile')]: mobile,
        }),
        onClick: this.stopTimeout,
        onKeyDown: this.onKeyDown,
        role: 'presentation'
      }, [
        React.createElement(
          'div',
          {
            key: 'slides',
            ref: (node) => { this.slidesContainer = node; },
            className: bemName('slides'),
            style: { marginLeft: `${offset}%` },
          },
          slides
        ),
        navigation ? React.createElement(
          Arrow, {
            key: 'left-arrow',
            direction: "previous",
            className: classnames(bemName('arrow'), bemName('arrow', 'left')),
            disabled: !wrapAround || this.isFirstSlide(),
            onClick: this.setPrevioutSlide,
            text: mobile ? 'Previous' : '',
          },
        ) : null,
        navigation ? React.createElement(
          Arrow, {
            key: 'right-arrow',
            direction: "next",
            className: classnames(bemName('arrow'), bemName('arrow', 'right')),
            disabled: !wrapAround || this.isLastSlide(),
            onClick: this.setNextSlide,
            text: mobile ? 'Next' : '',
          },
        ) : null,
        navigation ? React.createElement(
          CarouselDots, {
            key: 'dots',
            className: bemName('dots'),
            setSlide: this.setSlide,
            slidesCount: slidesCount,
            slideIndex: slideIndex,
          },
        ) : null,
      ],
    )
  }
}

ReactSimleCarousel.propTypes = {
  className: PropTypes.string,
  wrapAround: PropTypes.bool.isRequired,
  autoplayInterval: PropTypes.number.isRequired,
  autoplay: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  mobile: PropTypes.bool.isRequired,
  changeSlideHeight: PropTypes.bool,
  afterSlideCallback: PropTypes.func,
};

ReactSimleCarousel.defaultProps = {
  className: null,
  afterSlideCallback: () => false,
  changeSlideHeight: true,
};

export default ReactSimleCarousel;
