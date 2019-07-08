import React from 'react';
import PropTypes from 'prop-types';
import { onlyUpdateForKeys } from 'recompose';
function Button({ id, disabled, onClick, children, className, ...rest }) {
  const buttonId = `${id}__button`;
  const classes = [
    'picky__input',
    disabled ? 'picky__input--disabled' : '',
    className
  ].join(' ');

  return (
    <button
      id={buttonId}
      type="button"
      className={classes}
      onClick={onClick}
      data-testid="picky-input"
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className:PropTypes.string
};
Button.displayName = 'Button';
export default onlyUpdateForKeys(['disabled', 'children'])(Button);
