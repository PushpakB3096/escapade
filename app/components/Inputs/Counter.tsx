'use client';

import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  onChange,
  subtitle,
  title,
  value
}) => {
  const onAdd = () => {
    onChange(value + 1);
  };

  const onReduce = () => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  };

  return (
    <div className='flex flex-row items-center justify-between'>
      <div className='flex flex-col'>
        <div className='font-medium'>{title}</div>
        <div className='font-light text-gray-600'>{subtitle}</div>
      </div>
      <div className='flex flex-row items-center gap-4'>
        <div
          className='w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center cursor-pointer transition hover:opacity-80'
          onClick={onReduce}
          data-testid='decrement-btn'
        >
          <AiOutlineMinus />
        </div>
        <div
          data-testid='value-elem'
          className='
            font-light 
            text-xl 
            text-neutral-600
          '
        >
          {value}
        </div>
        <div
          className='w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center cursor-pointer transition hover:opacity-80'
          onClick={onAdd}
          data-testid='increment-btn'
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
