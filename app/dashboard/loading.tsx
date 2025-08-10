import { Loader } from 'lucide-react'
import React from 'react'

const LoadingDashboard = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <Loader className='text-lg animate-spin'/>
    </div>
  )
}

export default LoadingDashboard