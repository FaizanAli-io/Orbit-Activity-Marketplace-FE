import z from 'zod';

const timeSchema = z.object({
  start: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'start time is required'),

  end: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'end time is required'),
});

export const datesSchema = z.array(
  z.object({
    date: z.date(),
    time: timeSchema.optional(),
  })
);

const dateRangeSchema = z.object({
  start: z.date(),
  end: z.date(),
});

const weeklySchema = z.object({
  days: z.array(z.number().min(0).max(6)).nonempty('Select days'), // 0 = Sunday, 6 = Saturday
  date: dateRangeSchema,
  time: timeSchema,
});

const monthlySchema = z.object({
  days: z.array(z.number().min(1).max(31)).nonempty('Select days'), // 1 to 31
  date: dateRangeSchema,
  time: timeSchema,
});

export const schema = z
  .object({
    // basic details
    title: z.string().min(4).max(255),
    description: z.string().min(50).max(500),
    categoryId: z.string().refine(val => +val > 0, 'Category is required.'),
    // pricing & capacity
    price: z
      .string()
      .min(1)
      .refine(val => !isNaN(+val) && +val > 0, {
        message: 'price must be a positive number',
      }),

    discount: z
      .string()
      .min(1)
      .refine(val => !isNaN(+val) && +val >= 0 && +val <= 100, {
        message: 'Discount must be between 0 and 100',
      }),

    quota: z
      .string()
      .min(1)
      .refine(val => !isNaN(+val) && +val > 0, {
        message: 'Quota must be a positive number',
      }),

    capacity: z
      .string()
      .min(1)
      .refine(val => !isNaN(+val) && +val > 0, {
        message: 'Capacity must be a positive number',
      }),

    // location & duration
    location: z.string().min(2).max(255),
    duration: z
      .string()
      .min(1)
      .refine(val => !isNaN(+val) && +val > 0, {
        message: 'Duration must be a positive number',
      }),

    // availability
    type: z.enum(['dates', 'range', 'weekly', 'monthly']),
    dates: datesSchema.optional(),
    range: z
      .object({
        date: dateRangeSchema,
        time: timeSchema,
      })
      .optional(),
    weekly: weeklySchema.optional(),
    monthly: monthlySchema.optional(),
    exclusions: z.array(z.date()).optional(),

    images: z.object({
      video: z.string().optional(),
      thumbnail: z.string().min(1, 'Thumbnail is required'),
      images: z.array(z.string()).nonempty('Images are required'),
    }),
  })
  .superRefine((data, ctx) => {
    const { type } = data;

    if (type === 'dates' && !data.dates) {
      ctx.addIssue({
        path: ['dates'],
        message: 'Dates are required',
      });
    }

    if (type === 'range' && !data.range) {
      ctx.addIssue({
        path: ['range'],
        message: 'Range is required',
      });
    }

    if (type === 'weekly' && !data.weekly) {
      ctx.addIssue({
        path: ['weekly'],
        message: 'Weekly schedule is required',
      });
    }

    if (type === 'monthly' && !data.monthly) {
      ctx.addIssue({
        path: ['monthly'],
        message: 'Monthly schedule is required',
      });
    }
  });

export type ActivityFormSchema = z.infer<typeof schema>;

export const BasicDetailsSchema = schema.pick({
  title: true,
  description: true,
  categoryId: true,
});

export const PricingNCapacitySchema = schema.pick({
  price: true,
  discount: true,
  capacity: true,
  quota: true,
});

export const LocationNDurationSchema = schema.pick({
  location: true,
  duration: true,
});

export const ScheduleSchema = schema.pick({
  type: true,
  dates: true,
  range: true,
  weekly: true,
  monthly: true,
  exclusions: true,
});

export const MediaSchema = schema.pick({
  images: true,
});
