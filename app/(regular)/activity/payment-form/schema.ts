import { z } from 'zod';

export const PaymentFormSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),

  cardholderName: z.string().min(1, { message: 'Cardholder name is required' }),

  cardNumber: z
    .string()
    .regex(
      /^(\d{4} ?){4}$/,
      'Card number must be 16 digits in groups of 4 (e.g. 1234 5678 9012 3456)'
    )
    .refine(val => val.replace(/\s/g, '').length === 16, {
      message: 'Card number must be 16 digits',
    }),

  expiryDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      'Expiry date must be in MM/YY format'
    ),

  cvv: z.string().regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),

  streetAddress: z.string().min(1, 'Street address is required'),

  city: z.string().min(1, 'City is required'),

  state: z.string().min(1, 'State is required'),

  zipCode: z.string().regex(/^\d{4,10}$/, 'Invalid zip code'),

  country: z.string().min(1, 'Country is required'),
});
