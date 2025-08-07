async function getPosts() {
  const items = [
    {
      title: "Understanding React Hooks",
      content: "A deep dive into React Hooks and how they can simplify your component logic.",
    }
  ]

  return items;
}

export default async function Home() {
  const data = await getPosts();

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Latest Posts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((post, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
