import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { Meal } from '@/models/meals';

const ShareMealPage = () => {
  const handleFormSubmit = async (formData: FormData) => {
    'use server';
    // Handle form submission

    const title = formData.get('title') as string;
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove non-word characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single

    // You can now use `slug` below

    const meal: Meal = {
      id: crypto.randomUUID(),
      creator: formData.get('name') as string,
      creator_email: formData.get('email') as string,
      slug,
      title,
      summary: formData.get('summary') as string,
      instructions: formData.get('instructions') as string,
      image: formData.get('image') as string,
    };

    console.log(meal);
  };

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={handleFormSubmit}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea id="instructions" name="instructions" rows={10} required></textarea>
          </p>
          <ImagePicker label="Image" />
          <p className={classes.actions}>
            <button type="submit">Share Meal</button>
          </p>
        </form>
      </main>
    </>
  );
};

export default ShareMealPage;
