'use client';
import React from 'react';

import { useActivityFormStore } from './store';
import Stepper, { Step } from '@/components/app/Stepper';

const ActivityFormStepper = () => {
  const currentStep = useActivityFormStore(s => s.currentStep);
  const steps: Step[] = [
    {
      title: 'Basic Details',
      description: 'Title & Description of the activity',
    },
    {
      title: "What's Included",
      description: 'What the activity offers',
    },
    {
      title: 'Location & Schedule',
      description:
        'Location, date, time, and members capacity of the activity.',
    },
    {
      title: 'Summary',
      description: 'Review & Post the activity',
    },
  ];

  return <Stepper steps={steps} currentStep={currentStep} />;
};

export default ActivityFormStepper;
