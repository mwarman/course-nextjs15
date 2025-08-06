const MealDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <main>
      <h1>Meal Details</h1>
      <p>This is the meal page content for meal: {slug}</p>
    </main>
  );
};

export default MealDetailPage;
