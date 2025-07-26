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

    // phone: z
    //   .string()
    //   .trim()
    //   .regex(/^\+?[0-9]{10,15}$/, 'invalid phone number format'),

    // category: z.enum(
    //   categories.map(c => c.value),
    //   'must select an option'
    // ),

    password: z
      .string()
      .min(5, 'must be atleast 5 character long')
      .max(50, 'cannot exceed 50 chars')
      .regex(/[A-Z]/, 'must contain atleast one uppercase character')
      .regex(/[a-z]/, 'must contain atleast one lowercase character'),

    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
