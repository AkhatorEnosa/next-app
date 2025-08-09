import { buttonVariants } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { prisma } from "../utils/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { BlogPostCard } from "@/components/general/BlogPostCard"

async function getMyPosts(userId: string) {
  // This function fetches the user's posts from the database.
  
    const data = await prisma.blogPost.findMany({
        where: {
            authorId: userId // Replace with the actual user ID
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return data;
}

const DashboardRoute = async () => {
    // get user from session
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const data = await getMyPosts(user?.id || "");

  return (
    <div>
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium">Your Blog Articles</h2>

            <Link className={`fixed bottom-20  right-20 ${buttonVariants({ variant: "outline", size: "lg"})}`} href="/dashboard/create">
            <Plus/>
                Create Post
            </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((post) => (
                <BlogPostCard data={post} key={post.id}/>
            ))}

        </div>
    </div>
  )
}

export default DashboardRoute

// {post.content.slice(0, 100)}...