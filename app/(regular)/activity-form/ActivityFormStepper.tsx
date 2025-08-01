'use client';
import React from 'react';

import { useActivityFormStore } from './store';
import Stepper, { Step } from '@/components/app/Stepper';

const ActivityFormStepper = () => {
  const currentStep = useActivityFormStore(s => s.currentStep);
  const baseHref = '/activity-form';
  const steps: Step[] = [
    {
      title: 'Basic Details',
      description: 'Title & Description of the activity',
      href: `${baseHref}/basic-details`,
    },
    {
      title: 'Pricing & Capacity',
      description: 'What the activity offers',
      href: `${baseHref}/pricing-and-capacity`,
    },
    {
      title: 'Location & Duration',
      description:
        'Location, date, time, and members capacity of the activity.',
      href: `${baseHref}/location-and-duration`,
    },
    {
      title: 'Schedule',
      description: 'Choose how and when the activity is available.',
      href: `${baseHref}/schedule`,
    },
    {
      title: 'Media',
      description: 'Add relevant images, and videos.',
      href: `${baseHref}/media`,
    },
    {
      title: 'Review & Post',
      description: 'Review & finalize your activity.',
      href: `${baseHref}/review`,
    },
  ];

  return <Stepper steps={steps} currentStep={currentStep} />;
};

export default ActivityFormStepper;
