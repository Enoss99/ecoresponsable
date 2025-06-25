import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Button.css';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  to?: string; // optionnel, si on veut rediriger
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

export default function Button({ label, onClick, to, type = 'button', className }: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button className={`btn ${className || ''}`} type={type} onClick={handleClick}>
      {label}
    </button>
  );
}
