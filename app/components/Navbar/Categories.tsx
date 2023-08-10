'use client';

import React from 'react';
import Container from '../Container';
import { categories } from '@/app/global/constants';
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

interface CategoriesProps {}

const Categories: React.FC<CategoriesProps> = ({}) => {
  const params = useSearchParams();
  const currentCategory = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {categories.map(category => (
          <CategoryBox
            key={category.label}
            label={category.label}
            description={category.description}
            icon={category.icon}
            selected={currentCategory === category.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
