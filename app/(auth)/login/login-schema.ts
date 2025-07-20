import z from 'zod';

export const LoginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(5, 'must be atleast 5 character long')
    .max(50, 'cannot exceed 50 chars')
    .regex(/[A-Z]/, 'must contain atleast one uppercase character')
    .regex(/[a-z]/, 'must contain atleast one lowercase character'),
});
