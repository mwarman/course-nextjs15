export interface Meal {
  id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

export interface MealFormData extends Omit<Meal, 'id' | 'slug' | 'image'> {
  image: File;
}
