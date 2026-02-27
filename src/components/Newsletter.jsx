import React from 'react'
import { Link } from "react-router-dom";


const Newsletter = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault
    }
  return (
    <div className='text-center'>
         <p className='text-2xl font-medium text-gray-800'>Get special deal when you order 5 cases.</p>
         <p className="text-gray-400 mt-3">Stock up, save more, and keep your favorites flowing.</p>

              
              <Link 
  to="/collection" 
  className=" sm:w-1/3 flex items-center justify-center mx-auto my-6 bg-red-500 text-white text-xs px-10 py-4"
>
  SECURE YOUR DEAL NOW BEFORE IT’S GONE.

</Link>
                
        
    </div>
  )
}

export default Newsletter
