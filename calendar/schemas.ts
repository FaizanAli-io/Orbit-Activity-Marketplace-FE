import { z } from 'zod';

export const eventSchema = z.object({
  activityId: z.number('Activity is required'),
  startDate: z.date('Start Date s required'),
  endDate: z.date('End Date is required'),
  startTime: z.date('Start Time is required'),
  endTime: z.date('End Time is required'),
});

export type TEventFormData = z.infer<typeof eventSchema>;
