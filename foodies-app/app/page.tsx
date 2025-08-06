import Link from 'next/link';

const Home = () => {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>Time to get started!</h1>
      <p>
        <Link href="/meals">Go to Meals</Link>
      </p>
      <p>
        <Link href="/meals/share">Share Your Meals</Link>
      </p>
      <p>
        <Link href="/meals/some-meal">Go to a specific Meal</Link>
      </p>
      <p>
        <Link href="/community">Go to Community</Link>
      </p>
    </main>
  );
};

export default Home;
