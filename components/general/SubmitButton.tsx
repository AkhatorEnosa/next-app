"use client"
import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import { Loader } from "lucide-react"

const SubmitButton = () => {
    const { pending } = useFormStatus()

  return (
    <Button className="w-full" type="submit" disabled={pending}>{pending ? <><Loader className="animate-spin"/>Submitting..</> : "Submit"}</Button>
  )
}

export default SubmitButton