import { prisma } from "@/app/utils/db"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getPost(id: string) {
  // This function fetches a single blog post by its ID from the database.
  const data = await prisma.blogPost.findUnique({
    where: {
      id: id
    },
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
    }
  })

  if(!data) {
    return notFound()
  }

  return data
}

//params type declaration
type Params = Promise<{ id: string }>

const CurrentPage = async ({params} : {params: Params}) => {
  const { id } = await params
  const post = await getPost(id)
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link className={`w-fit ${buttonVariants({ variant: "secondary" })}`} href="/">
        <ChevronLeft />
        Back
      </Link>

      <div className="mb-8 mt-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">{post.title}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative size-10 border-2 overflow-hidden rounded-full">
              <Image
                src={post.authorImage}
                alt={post.authorName}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-medium">{post.authorName}</p>
          </div>
          <p className="text-sm text-gray-500">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(post.createdAt)}
          </p>
        </div>
      </div>

      <div className="relative h-[400px] w-full mb-8 overflow-hidden rounded-lg">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <Card>
        <CardContent>
          <p className="text-gray-700">{post.content}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default CurrentPage