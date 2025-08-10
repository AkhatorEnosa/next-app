import { BlogPostCard } from "@/components/general/BlogPostCard";
import { prisma } from "./utils/db";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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

      <Suspense fallback={<BlogPostsGrid />}>
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

function BlogPostsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm h-[400px] flex flex-col overflow-hidden"
          key={index}
        >
          {/* Image skeleton */}
          <Skeleton className="h-48 w-full rounded-none" />

          <div className="p-4 flex-1 flex flex-col gap-3">
            {/* Title skeleton */}
            <Skeleton className="h-6 w-3/4" />

            {/* Content skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>

            {/* Footer skeleton */}
            <div className="mt-auto flex items-center justify-between pt-4">
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-full mr-2" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}