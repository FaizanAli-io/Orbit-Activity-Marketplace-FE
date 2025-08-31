import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  ActivityFormSchema,
  BasicDetailsSchema,
  PricingNCapacitySchema,
  LocationNDurationSchema,
  ScheduleSchema,
  MediaSchema,
} from './schema';
import z from 'zod';
import { Store } from 'lucide-react';

interface Store extends ActivityFormSchema {
  activityId?: number;
  setActivityId: (id?: number) => void;
  currentStep: number;
  setCurrentStep: (n: number) => void;
  setFormData: (data: Partial<ActivityFormSchema>) => void;

  supCategory: string;
  setSupCategory: (val: string) => void;
  isForm1Valid: () => boolean;
  isForm2Valid: () => boolean;
  isForm3Valid: () => boolean;
  isForm4Valid: () => boolean;
  isForm5Valid: () => boolean;

  setImages: (images: string[]) => void;
  addImage: (image: string) => void;
  removeImage: (image: string) => void;
  setVideo: (video: string) => void;
  setThumbnail: (thumbnail: string) => void;
  clear: () => void;
}

export const useActivityFormStore = create<Store>()(
  persist<Store>(
    (set, get) => ({
      setActivityId: (id?: number) =>
        set(store => ({ ...store, activityId: id })),
      supCategory: '',
      setSupCategory: (val: string) =>
        set(store => ({ ...store, supCategory: val })),

      categoryId: '',
      title: '',
      description: '',

      price: '',
      discount: '',
      quota: '',
      capacity: '',

      location: '',
      duration: '',

      type: 'dates',
      dates: undefined,
      range: undefined,
      weekly: undefined,
      monthly: undefined,
      exclusions: [],

      images: {
        video: '',
        thumbnail: '',
        images: [],
      },

      setImages: images =>
        set(store => ({
          ...store,
          images: {
            ...store.images,
            images: [...images],
          },
        })),

      addImage: image =>
        set(store => {
          const images = store.images.images;

          if (images.includes(image)) return { ...store };

          return {
            ...store,
            images: {
              ...store.images,
              images: [...images, image],
            },
          };
        }),

      removeImage: image =>
        set(store => ({
          ...store,
          images: {
            ...store.images,
            images: store.images.images.filter(img => img !== image),
          },
        })),

      setThumbnail: thumbnail =>
        set(store => ({
          ...store,
          images: {
            ...store.images,
            thumbnail,
          },
        })),

      setVideo: video =>
        set(store => ({
          ...store,
          images: {
            ...store.images,
            video,
          },
        })),

      setFormData: data => set(store => ({ ...store, ...data })),

      currentStep: 1,
      setCurrentStep: n => set({ currentStep: n }),
      isForm1Valid: () => isForm1Valid(get),
      isForm2Valid: () => isForm2Valid(get),
      isForm3Valid: () => isForm3Valid(get),
      isForm4Valid: () => isForm4Valid(get),
      isForm5Valid: () => isForm5Valid(get),
      clear: () => {
        set({
          categoryId: '',
          title: '',
          description: '',

          price: '',
          discount: '',
          quota: '',
          capacity: '',

          location: '',
          duration: '',

          type: 'dates',
          dates: undefined,
          range: undefined,
          weekly: undefined,
          monthly: undefined,
          exclusions: [],

          images: {
            video: '',
            thumbnail: '',
            images: [],
          },
        });
      },
    }),
    {
      name: 'activity-form-storage',
    }
  )
);

function isForm1Valid(get: () => Store) {
  const { title, description, categoryId } = get();

  const { success } = BasicDetailsSchema.safeParse({
    title,
    description,
    categoryId,
  });

  return success;
}

function isForm2Valid(get: () => Store) {
  const { price, discount, capacity, quota } = get();

  const { success } = PricingNCapacitySchema.safeParse({
    price,
    discount,
    capacity,
    quota,
  });

  return success;
}

function isForm3Valid(get: () => Store) {
  const { location, duration } = get();

  const { success } = LocationNDurationSchema.safeParse({
    location,
    duration,
  });

  return success;
}

function isForm4Valid(get: () => Store) {
  const { type, dates, range, weekly, monthly, exclusions } = get();

  const values: z.infer<typeof ScheduleSchema> = {
    type,
    dates: dates
      ? [
          ...dates.map(v => ({
            ...v,
            date: new Date(v.date),
          })),
        ]
      : [],
    monthly: monthly
      ? {
          ...monthly,
          date: {
            start: new Date(monthly.date.start),
            end: new Date(monthly.date.end),
          },
        }
      : undefined,
    weekly: weekly
      ? {
          ...weekly,
          date: {
            start: new Date(weekly.date.start),
            end: new Date(weekly.date.end),
          },
        }
      : undefined,
    range: range
      ? {
          ...range,
          date: {
            start: new Date(range.date.start),
            end: new Date(range.date.end),
          },
        }
      : undefined,

    exclusions: exclusions ? exclusions.map(e => new Date(e)) : [],
  };

  const { success } = ScheduleSchema.safeParse(values);

  return success;
}

function isForm5Valid(get: () => Store) {
  const { images } = get();

  const { success } = MediaSchema.safeParse({
    images,
  });

  return success;
}
