import { z } from 'zod';

// Base payment form schema (for UI validation)
export const PaymentFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  cardholderName: z.string().min(1, 'Cardholder name is required'),
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

// Extended schema for server-side processing
export const ProcessPaymentSchema = PaymentFormSchema.extend({
  activityId: z.number().positive('Activity ID is required'),
  vendorId: z.number().positive('Vendor ID is required'),
  amount: z.number().positive('Amount must be greater than 0'),
  method: z
    .enum(['CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL'])
    .default('CREDIT_CARD'),
});

// Type exports
export type PaymentFormData = z.infer<typeof PaymentFormSchema>;
export type ProcessPaymentData = z.infer<typeof ProcessPaymentSchema>;
