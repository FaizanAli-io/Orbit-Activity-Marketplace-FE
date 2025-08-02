import z from 'zod';

export const categories = [
  {
    value: 'cooking',
    label: 'Cooking & Culinery',
  },
  {
    value: 'fitness',
    label: 'Fitness & Wellness',
  },
  {
    value: 'art',
    label: 'Art & Crafts',
  },
  {
    value: 'outdoor',
    label: 'Outdoor Activities',
  },
  {
    value: 'workshops',
    label: 'Workshops & Classes',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

export const VendorSchema = z
  .object({
    name: z
      .string()
      .min(3, 'must be atleast 3 characters long')
      .max(50, 'cannot exceed 50 characters'),

    email: z.email(),

    password: z
      .string()
      .min(8, 'must be atleast 5 character long')
      .max(50, 'cannot exceed 50 chars')
      .regex(/[A-Z]/, 'must contain atleast one uppercase character')
      .regex(/[a-z]/, 'must contain atleast one lowercase character'),

    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
