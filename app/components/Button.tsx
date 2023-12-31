'use clients';

import type { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon: Icon,
  outline,
  small,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
        ${outline ? 'bg-white' : 'bg-[#3066BE]'}
        ${outline ? 'border-[#1D1E18]' : 'border-[#3066BE]'}
        ${outline ? 'text-[#1D1E18]' : 'text-white'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
    >
      {Icon && <Icon size={24} className='absolute left-4 top-3' />}
      {label}
    </button>
  );
};

export default Button;
