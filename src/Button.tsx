import * as React from 'react';

type ButtonProps = {} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
const Button: React.FC<ButtonProps> = ({
  id,
  disabled,
  onClick,
  children,
  className,
  ...rest
}) => {
  const buttonId = `${id}__button`;
  const classes = [
    'picky__input',
    disabled ? 'picky__input--disabled' : '',
    className,
  ].join(' ');

  return (
    <button
      id={buttonId}
      type="button"
      className={classes}
      onClick={onClick}
      data-testid="picky-input"
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Picky(Button)';
export default Button;
