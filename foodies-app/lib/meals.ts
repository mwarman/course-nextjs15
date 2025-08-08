import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { unstable_cache } from 'next/cache';

import { Meal, MealFormData } from '@/models/meals';

const db = sql('meals.db');

export const getMeals = async (): Promise<Meal[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay for demonstration purposes
  // throw new Error('Simulated error'); // Simulate an error for demonstration purposes
  return db.prepare('SELECT * FROM meals').all() as Meal[];
};

export const getCachedMeals = unstable_cache(getMeals, [], {
  revalidate: 60,
});

export const getMeal = (slug: string): Meal | undefined => {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as Meal | undefined;
};

export const saveMeal = async (meal: MealFormData): Promise<void> => {
  const slug = slugify(meal.title, { lower: true });
  const instructions = xss(meal.instructions);

  // save image
  const extension = meal.image.name.split('.').pop();
  const fileName = `${slug}.${extension}`;
  const imagePath = `/images/${fileName}`;

  const stream = fs.createWriteStream(`./public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (err) => {
    if (err) {
      console.error('Error writing image file:', err);
      throw new Error('Failed to save image');
    }
  });

  // insert meal into database
  db.prepare(
    'INSERT INTO meals (creator, creator_email, slug, title, summary, instructions, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
  ).run(meal.creator, meal.creator_email, slug, meal.title, meal.summary, instructions, imagePath);
};
