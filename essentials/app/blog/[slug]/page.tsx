const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <main>
      <h1>Blog Post: {slug}</h1>
    </main>
  );
};

export default BlogPostPage;
