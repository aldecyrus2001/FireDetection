import React from 'react';

interface ButtonProps {
  title: string;
  className?: string;
  onClick?: () => void;
};

export const CustomButton = ({ title, className = '', onClick }: ButtonProps) => {
  return (
    <button className={`py-1 px-5 rounded-md cursor-pointer ${className}`} onClick={onClick}>
      {title}
    </button>
  );
};
