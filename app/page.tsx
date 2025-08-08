import { prisma } from "./utils/db";

async function getPosts() {
  const data = await prisma.BlogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      id: true,
      createdAt: true,
    }
  })

  return data;
}

export default async function Home() {
  const data = await getPosts();

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Latest Posts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((post) => (
          <h1 key={post.id}>{post.title}</h1>
        ))}
      </div>
    </div>
  );
}
