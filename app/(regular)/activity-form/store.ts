import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  ActivityFormSchema,
  basicDetailsSchema,
  whatsIncludedSchema,
} from './schema';

interface Store extends ActivityFormSchema {
  currentStep: number;
  setCurrentStep: (n: number) => void;
  setFormData: (data: Partial<ActivityFormSchema>) => void;

  isForm1Valid: () => boolean;
  isForm2Valid: () => boolean;
  isForm3Valid: () => boolean;
}

export const useActivityFormStore = create<Store>()(
  persist(
    (set, get) => ({
      title: '',
      description: '',
      included: [],
      location: '',
      price: 0,
      date: new Date().toString(),
      time: '',
      duration: '',
      members: '',

      setFormData: data => set(store => ({ ...store, ...data })),

      currentStep: 1,
      setCurrentStep: n => set({ currentStep: n }),
      isForm1Valid: () => isForm1Valid(get),
      isForm2Valid: () => isForm2Valid(get),
      isForm3Valid: () => isForm3Valid(get),
    }),
    {
      name: 'activity-form-storage',
    }
  )
);

function isForm1Valid(get: () => Store) {
  const { title, description } = get();

  const { success } = basicDetailsSchema.safeParse({ title, description });

  return success;
}

function isForm2Valid(get: () => Store) {
  const { included } = get();

  const { success } = whatsIncludedSchema.safeParse({ included });

  return success;
  // return included && !!included.length;
}

function isForm3Valid(get: () => Store) {
  const { date, time, duration, members } = get();

  const { success } = whatsIncludedSchema.safeParse({
    date,
    time,
    duration,
    members,
  });

  return success;
}
