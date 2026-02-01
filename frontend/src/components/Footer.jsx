import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
         <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">

            <div className="">
                <img src={assets.logo} className='mb-5 w-32' alt="" />
                <p className="w-full md:w-2/3 text-gray-600">
                At Winelady, we bring the world of wine to your glass. Our curated collection features exceptional wines from every corner of the globe, each chosen for its unique flavor, rich aroma, and unforgettable character. 
                </p>
            </div>

            <div className="">
                <p className="text-xl font-medium mb-5">COMPANY</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div className="">
                <p className="text-xl fot-medium mb-5 ">GET IN TOUCH</p>
                <ul className="flexx">
                    <li>(+1) 786 975 7896</li>
                    <li>thewinelady@gmail.com</li>
                </ul>
            </div>
         </div> 

         <div className=" text-center py-5 text-sm">
                <hr />
                <p className="py-5">Copyright 2026@ thewinelady.com - All Right Reserved</p>
            </div>
    </div>
  )
}

export default Footer