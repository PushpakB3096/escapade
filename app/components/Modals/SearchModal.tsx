'use client';

import useSearchModal from '@/app/hooks/useSearchModal';
import Modal from './Modal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { CountrySelectValue, STEPS_FOR_SEARCH } from '@/app/global/types';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import qs from 'query-string';
import { formatISO, setDate } from 'date-fns';
import Heading from '../Heading';
import CountrySelect from '../Inputs/CountrySelect';
import Calendar from '../Inputs/Calendar';
import Counter from '../Inputs/Counter';

interface SearchModalProps {}

const SearchModal: React.FC<SearchModalProps> = ({}) => {
  const [currentStep, setCurrentStep] = useState<STEPS_FOR_SEARCH>(
    STEPS_FOR_SEARCH.LOCATION
  );
  const [guestCount, setGuestCount] = useState<number>(1);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [bathroomCount, setBathroomCount] = useState<number>(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });
  const [location, setLocation] = useState<CountrySelectValue>();
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const Map = useMemo(
    () => dynamic(() => import('../Map'), { ssr: false }),
    [location]
  );

  const onBack = useCallback(() => {
    setCurrentStep(value => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setCurrentStep(value => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (currentStep !== STEPS_FOR_SEARCH.INFO) {
      onNext();
      return;
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery
      },
      { skipNull: true }
    );

    setCurrentStep(STEPS_FOR_SEARCH.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    bathroomCount,
    currentStep,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    onNext,
    params,
    roomCount,
    router,
    searchModal
  ]);

  const actionLabel = useMemo(() => {
    if (currentStep === STEPS_FOR_SEARCH.INFO) {
      return 'Search';
    }
    return 'Next';
  }, [currentStep]);

  const secondaryActionLabel = useMemo(() => {
    if (currentStep === STEPS_FOR_SEARCH.LOCATION) {
      return undefined;
    }
    return 'Back';
  }, [currentStep]);

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        center
        title='Where do you wanna go?'
        subtitle='Find the perfect location!'
      />

      <CountrySelect
        value={location}
        onChange={value => setLocation(value as CountrySelectValue)}
      />

      <hr />

      <Map center={location?.latlng} />
    </div>
  );

  if (currentStep === STEPS_FOR_SEARCH.DATE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          center
          title='When do you want to go?'
          subtitle='Make sure everyone is free!'
        />

        <Calendar
          value={dateRange}
          onChange={value => setDateRange(value.selection)}
        />

        <hr />
      </div>
    );
  }

  if (currentStep === STEPS_FOR_SEARCH.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          center
          title='More information'
          subtitle='Find your perfect place!'
        />

        <Counter
          title='Guests'
          subtitle='How many guests are coming?'
          value={guestCount}
          onChange={value => setGuestCount(value)}
        />
        <Counter
          title='Rooms'
          subtitle='How many rooms do you need?'
          value={roomCount}
          onChange={value => setRoomCount(value)}
        />
        <Counter
          title='Bathrooms'
          subtitle='How many bathrooms are needed?'
          value={bathroomCount}
          onChange={value => setBathroomCount(value)}
        />

        <hr />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title='Filters'
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={
        currentStep === STEPS_FOR_SEARCH.LOCATION ? undefined : onBack
      }
      body={bodyContent}
    />
  );
};

export default SearchModal;
