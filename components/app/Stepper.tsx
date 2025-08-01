import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface Step {
  title: string;
  description: string;
  href?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep?: number;
  className?: string;
}

export default function Stepper({
  steps,
  className,
  currentStep = 1,
}: StepperProps) {
  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      <div className='space-y-0'>
        {steps.map((step, index) => {
          const isCurrent = index + 1 === currentStep;
          const completed = index + 1 < currentStep;
          const upcoming = index + 1 > currentStep;

          return (
            <div key={index + 1} className='flex items-start gap-4'>
              {/* Step Indicator */}
              <div className='flex flex-col items-center relative'>
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium relative z-10 bg-white',
                    {
                      ' bg-primary text-white': completed,
                      ' border-primary': isCurrent,
                      'border-gray-300 bg-white text-gray-400': upcoming,
                    }
                  )}
                >
                  {completed ? (
                    <Check className='h-4 w-4' />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {/* Connector Line - extends from bottom of current circle to top of next circle */}
                {index < steps.length - 1 && (
                  <div className='w-px h-12 bg-gray-200 mt-0' />
                )}
              </div>

              {/* Step Content */}
              <div className='flex-1 pb-8 justify-start'>
                <h3
                  className={cn('text-sm font-medium', {
                    'text-gray-900': completed || isCurrent,
                    'text-gray-400': upcoming,
                  })}
                >
                  {step.href ? (
                    <Link href={step.href} className='underline'>
                      {step.title}
                    </Link>
                  ) : (
                    step.title
                  )}
                </h3>
                <p
                  className={cn('mt-1 text-sm', {
                    'text-gray-600': completed || isCurrent,
                    'text-gray-400': upcoming,
                  })}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
