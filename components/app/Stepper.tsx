import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Step {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface StepperProps {
  steps: Step[];
  className?: string;
}

export default function Stepper({ steps, className }: StepperProps) {
  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      <div className='space-y-0'>
        {steps.map((step, index) => (
          <div key={step.id} className='flex items-start gap-4'>
            {/* Step Indicator */}
            <div className='flex flex-col items-center relative'>
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium relative z-10 bg-white',
                  {
                    ' bg-primary text-white': step.status === 'completed',
                    ' border-primary': step.status === 'current',
                    'border-gray-300 bg-white text-gray-400':
                      step.status === 'upcoming',
                  }
                )}
              >
                {step.status === 'completed' ? (
                  <Check className='h-4 w-4' />
                ) : (
                  <span>{step.id}</span>
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
                  'text-gray-900':
                    step.status === 'completed' || step.status === 'current',
                  'text-gray-400': step.status === 'upcoming',
                })}
              >
                {step.title}
              </h3>
              <p
                className={cn('mt-1 text-sm', {
                  'text-gray-600':
                    step.status === 'completed' || step.status === 'current',
                  'text-gray-400': step.status === 'upcoming',
                })}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
