import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Arrow = (props) => {
  const { className, disabled, onClick, direction, text } = props;
  const next = direction === 'next';
  const iconName = next ? faChevronRight : faChevronLeft;

  return React.createElement(
    'button', {
      className,
      onClick,
      disabled,
    }, [
      React.createElement(FontAwesomeIcon, { key: 'arrow', icon: iconName }),
      React.createElement('span', { key: 'text' }, text ? ` ${text}` : ''),
    ]
  )
};

Arrow.propTypes = {
  direction: PropTypes.oneOf(['next', 'previous']).isRequired,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
};

Arrow.defaultProps = {
  text: '',
};

export default Arrow;
