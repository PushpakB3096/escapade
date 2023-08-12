'use client';

import Select from 'react-select';
import { CountrySelectValue } from '@/app/global/types';
import useCountries from '@/app/hooks/useCountries';

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ onChange, value }) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder='Anywhere'
        options={getAll()}
        value={value}
        onChange={value => onChange(value as CountrySelectValue)}
        isClearable
        formatOptionLabel={option => (
          <div className='flex flex-row items-center gap-3 p-2'>
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className='text-neutral-500 ml-1'>{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-2 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
                ...theme.colors,
                primary: 'black',
                primary25: '#FFE4E6'
            }
        })}
      />
    </div>
  );
};

export default CountrySelect;
