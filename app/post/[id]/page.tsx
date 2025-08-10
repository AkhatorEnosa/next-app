import { prisma } from "@/app/utils/db"
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
    <div> 
      {post.content}
    </div>
  )
}

export default CurrentPage