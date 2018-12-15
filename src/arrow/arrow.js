import FontAwesome from 'react-fontawesome';

const Arrow = (props) => {
  const { className, disabled, onClick, direction, text } = props;
  const next = direction === 'next';
  const iconName = next ? 'angle-right' : 'angle-left';

  return React.createElement(
    'button', {
      className,
      onClick,
      disabled,
    }, [
      React.createElement(FontAwesome, { key: 'arrow', name: iconName }),
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
