import z from 'zod';

export const schema = z.object({
  name: z
    .string()
    .min(3, 'must be atleast 3 characters long')
    .max(50, 'cannot exceed 50 characters'),

  email: z.email(),

  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),

  avatar: z.url('Avatar is required'),

  preferences: z
    .array(z.string())
    .min(3, 'select 3 preferences')
    .max(3, 'cannot select more than 3 preferences'),
});
