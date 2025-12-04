import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ type = 'text', ...props }: InputProps) => {
  return <input type={type} {...props} />;
};

export default Input;
