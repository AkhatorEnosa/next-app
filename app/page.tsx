import { BlogPostCard } from "@/components/general/BlogPostCard";
import { prisma } from "./utils/db";
import { Suspense } from "react";

async function getPosts() {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay for suspense
  
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      authorId: true,
      id: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return data;
}

export default function Home() {
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Latest Posts</h1>

      <Suspense fallback={<div className="text-center text-gray-500">Loading posts...</div>}>
        {/* Suspense is used to handle the async nature of getPosts */}
        <BlogPosts />
      </Suspense>
    </div>
  );
}

const BlogPosts = async () => {
  const data = await getPosts()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {data.map((post) => (
       <BlogPostCard data={post} key={post.id}/>
    ))}
  </div>
  )
}
