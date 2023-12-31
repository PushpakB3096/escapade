'use client';

import { PuffLoader } from 'react-spinners';

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({}) => {
  return (
    <div
      data-testid='loader'
      className='h-[70vh] flex flex-col justify-center items-center'
    >
      <PuffLoader size={100} color='#3066BE' />
    </div>
  );
};

export default Loader;
