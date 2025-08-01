import z from 'zod';

export const profileSchema = z.object({
  name: z
    .string()
    .min(3, 'must be atleast 3 characters long')
    .max(50, 'cannot exceed 50 characters'),

  email: z.email(),

  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),

  preferences: z
    .array(z.number())
    .min(3, 'select 3 preferences')
    .max(3, 'cannot select more than 3 preferences'),
});
