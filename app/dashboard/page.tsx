import { buttonVariants } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

const DashboardRoute = async () => {
  return (
    <div>
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium">Your Blog Articles</h2>

            <Link className={`fixed bottom-20  right-20 ${buttonVariants({ variant: "outline", size: "lg"})}`} href="/dashboard/create">
            <Plus/>
            Create Post
            </Link>
        </div>
    </div>
  )
}

export default DashboardRoute