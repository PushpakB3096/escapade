'use client';

import useRentModal from '@/app/hooks/useRentModal';
import Modal from './Modal';
import { useMemo, useState } from 'react';
import Heading from '../Heading';
import { categories } from '@/app/global/constants';
import CategoryInput from '../Inputs/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CountrySelect from '../Inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../Inputs/Counter';
import ImageUpload from '../Inputs/ImageUpload';
import Input from '../Inputs/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { STEPS_FOR_RENTING } from '@/app/global/types';

interface RentModalProps {}

const RentModal: React.FC<RentModalProps> = ({}) => {
  const [currentStep, setCurrentStep] = useState<STEPS_FOR_RENTING>(
    STEPS_FOR_RENTING.CATEGORY
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset: resetForm
  } = useForm<FieldValues>({
    defaultValues: {
      categories: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 0,
      title: '',
      description: ''
    }
  });
  const rentModal = useRentModal();
  const router = useRouter();

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

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

  const onSubmit: SubmitHandler<FieldValues> = data => {
    if (currentStep !== STEPS_FOR_RENTING.PRICE) {
      onForward();
      return;
    }

    setIsLoading(true);

    axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('Listing created!');
        // Reset the form when submission is done
        resetForm();
        setCurrentStep(STEPS_FOR_RENTING.CATEGORY);
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
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

  if (currentStep === STEPS_FOR_RENTING.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Share some basics about your place'
          subtitle='What amenities do you have?'
          center
        />
        <Counter
          title='Guests'
          subtitle='How many guests do you allow?'
          value={guestCount}
          onChange={value => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title='Rooms'
          subtitle='How many rooms do you have?'
          value={roomCount}
          onChange={value => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title='Bathrooms'
          subtitle='How many bathrooms do you have?'
          value={bathroomCount}
          onChange={value => setCustomValue('bathroomCount', value)}
        />
      </div>
    );
  }

  if (currentStep === STEPS_FOR_RENTING.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Add a photo of your place'
          subtitle='Show guests what your place looks like!'
          center
        />
        <ImageUpload
          onChange={value => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (currentStep === STEPS_FOR_RENTING.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='How would you describe your place?'
          subtitle='Short and sweet works best!'
          center
        />
        <Input
          id='title'
          label='Title'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id='description'
          label='Description'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (currentStep === STEPS_FOR_RENTING.PRICE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Now set your price'
          subtitle='How much do you charge per night?'
          center
        />
        <Input
          id='price'
          label='Price'
          type='number'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          formatPrice
        />
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
      onSubmit={handleSubmit(onSubmit)}
      title='Rent your property'
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;
