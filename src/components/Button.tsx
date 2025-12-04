import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ type = 'button', ...props }: ButtonProps) => {
  return <button type={type} {...props} />;
};

export default Button;
