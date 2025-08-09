import { Metadata } from 'next';
import Image from 'next/image';

import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

/**
 * Generate dynamic metadata for the meal detail page.
 * @param props - The props containing the parameters for the page.
 * @param props.params - A promise that resolves to an object containing the meal slug.
 * @returns The metadata for the meal detail page.
 */
export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;
  const meal = getMeal(slug);
  if (!meal) {
    notFound();
  }
  return {
    title: meal.title,
    description: meal.summary,
  };
};

const MealDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const meal = getMeal(slug);

  if (!meal) {
    notFound(); // Redirect to 404 page if meal not found
  }

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions.replace(/\n/g, '<br />'),
          }}
        ></p>
      </main>
    </>
  );
};

export default MealDetailPage;
