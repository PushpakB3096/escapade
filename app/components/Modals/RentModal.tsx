'use client';

import useRentModal from '@/app/hooks/useRentModal';
import Modal from './Modal';
import { useMemo, useState } from 'react';
import Heading from '../Heading';
import { categories } from '@/app/global/constants';
import CategoryInput from '../Inputs/CategoryInput';
import { FieldValues, useForm } from 'react-hook-form';
import CountrySelect from '../Inputs/CountrySelect';
import dynamic from 'next/dynamic';

interface RentModalProps {}

enum STEPS_FOR_RENTING {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal: React.FC<RentModalProps> = ({}) => {
  const [currentStep, setCurrentStep] = useState<STEPS_FOR_RENTING>(
    STEPS_FOR_RENTING.CATEGORY
  );
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      categories: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  });
  const rentModal = useRentModal();

  const category = watch('category');
  const location = watch('location');

  // directly importing Map was causing issues with SSR sometimes
  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
  };

  const onForward = () => {
    setCurrentStep(val => {
      if (val === STEPS_FOR_RENTING.PRICE) {
        return STEPS_FOR_RENTING.CATEGORY;
      }
      return val + 1;
    });
  };

  const onBack = () => {
    setCurrentStep(val => {
      if (val === STEPS_FOR_RENTING.CATEGORY) {
        return STEPS_FOR_RENTING.PRICE;
      }
      return val - 1;
    });
  };

  const actionLabel = useMemo(() => {
    if (currentStep === STEPS_FOR_RENTING.PRICE) {
      return 'Create';
    }
    return 'Next';
  }, [currentStep]);

  const secondaryActionLabel = useMemo(() => {
    if (currentStep !== STEPS_FOR_RENTING.PRICE) {
      return 'Back';
    }
    return undefined;
  }, [currentStep]);

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Which of these best describes your place?'
        subtitle='Pick a category'
        center
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
        {categories.map(item => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput
              onClick={category => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (currentStep === STEPS_FOR_RENTING.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Where is your place located?'
          subtitle='Help guests find you!'
          center
        />
        <CountrySelect
          onChange={value => setCustomValue('location', value)}
          value={location}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={
        currentStep === STEPS_FOR_RENTING.CATEGORY ? undefined : onBack
      }
      onSubmit={onForward}
      title='AirBnb your home'
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;