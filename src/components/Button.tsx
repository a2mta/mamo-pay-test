import { ButtonHTMLAttributes, FC } from 'react';

//NOTE: Classnames should be handled properly via classname lib or something similar

const Button: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { busy?: boolean }
> = ({ children, busy, ...rest }) => {
  return (
    <button
      {...rest}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
        busy ? 'cursor-wait' : ''
      }`}
    >
      {busy ? 'Loading...' : children}
    </button>
  );
};

export default Button;
