'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import isEmpty from 'lodash/isEmpty';

import { MealFormData } from '@/models/meals';
import { saveMeal } from './meals';

export interface ShareMealActionState {
  message?: string;
}

export const shareMeal = async (prevState: ShareMealActionState, formData: FormData): Promise<ShareMealActionState> => {
  const meal: MealFormData = {
    creator: formData.get('name') as string,
    creator_email: formData.get('email') as string,
    title: formData.get('title') as string,
    summary: formData.get('summary') as string,
    instructions: formData.get('instructions') as string,
    image: formData.get('image') as File,
  };

  // Validate form data - Find a better approach :)
  if (
    isEmpty(meal.title) ||
    isEmpty(meal.summary) ||
    isEmpty(meal.instructions) ||
    isEmpty(meal.creator) ||
    isEmpty(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: 'Please fill out all fields correctly.',
    };
  }

  await saveMeal(meal);
  revalidatePath('/meals');
  redirect('/meals');
};
