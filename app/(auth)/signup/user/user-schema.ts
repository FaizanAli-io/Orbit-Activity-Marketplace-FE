import z from 'zod';

export const UserSchema = z
  .object({
    name: z
      .string()
      .min(3, 'must be atleast 3 characters long')
      .max(50, 'cannot exceed 50 characters'),
    email: z.email(),
    // phone: z
    //   .string()
    //   .trim()
    //   .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),

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
