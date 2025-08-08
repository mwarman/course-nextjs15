'use server';

import { MealFormData } from '@/models/meals';
import { saveMeal } from './meals';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const shareMeal = async (formData: FormData) => {
  const meal: MealFormData = {
    creator: formData.get('name') as string,
    creator_email: formData.get('email') as string,
    title: formData.get('title') as string,
    summary: formData.get('summary') as string,
    instructions: formData.get('instructions') as string,
    image: formData.get('image') as File,
  };

  await saveMeal(meal);
  revalidatePath('/meals');
  redirect('/meals');
};
