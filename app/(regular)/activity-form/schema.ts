import z from 'zod';

export const schema = z.object({
  title: z
    .string()
    .min(4, 'must be atleast 4 characters long')
    .max(255, 'cannot exceed 255 characters'),

  description: z
    .string()
    .min(50, 'must be atleast 50 characters long')
    .max(500, 'cannot exceed 500 characters'),
  included: z.array(z.string()).min(1),

  location: z
    .string()
    .min(2, 'must be atleast 2 characters long')
    .max(255, 'cannot exceed 255 characters'),
  price: z.number().positive('cannot be negative'),

  date: z.string().min(1, 'Date is required'),

  time: z.string().min(1, 'Time is required'),

  duration: z
    .string()
    .min(1, 'Duration is required')
    .refine(val => !isNaN(+val) && +val > 0, {
      message: 'Duration must be a positive number',
    }),

  members: z
    .string()
    .min(1, 'Members is required')
    .refine(val => !isNaN(+val) && +val > 0, {
      message: 'Members must be a positive number',
    }),
});

export type ActivityFormSchema = z.infer<typeof schema>;

export const basicDetailsSchema = schema.pick({
  title: true,
  description: true,
});

export const whatsIncludedSchema = schema.pick({
  included: true,
});

export const locationSchema = schema.pick({
  location: true,
  date: true,
  time: true,
  duration: true,
  members: true,
});
