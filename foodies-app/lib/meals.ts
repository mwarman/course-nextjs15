import sql from 'better-sqlite3';
import { unstable_cache } from 'next/cache';

import { Meal } from '@/models/meals';

const db = sql('meals.db');

export const getMeals = async (): Promise<Meal[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay for demonstration purposes
  return db.prepare('SELECT * FROM meals').all() as Meal[];
};

export const getCachedMeals = unstable_cache(getMeals, [], {
  revalidate: 60,
});
