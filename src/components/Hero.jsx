import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import { Link } from "react-router-dom";

const Hero = () => {
  return (

    <div className="div">
                     <div className=' flex flex-col sm:flex-row border border-grey-400'>
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
            <div className="text-[#414141]">
                <div className="flex items-center gap-2">
                    <p className='w-8 md:w-11 h-[2px] bg-red-500'></p>
                    <p className='font-medium text-sm md:text-base '>EXPLORE COUNTRY</p>
                </div>
                <h1 className='prata-regular text-3xl  sm:py-3  lg:text-5xl leading-relaxed'>Wines Collection</h1>
                <div className="flex items-center gap-2 ">
                        <p className='font-semibold text-sm md:text-base'> SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[2px] bg-red-500'></p>
                </div>
            </div>


        </div>

        {/* HERO RIGHT SIDE */}
        <img src={assets.hero_img} className='w-full sm:w-1/2' alt="" />

    </div>

             <div className="text-center py-8 text-3xl ">
            <Title text1={'ABOUT'} text2={'US'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 '>Welcome to Winelady, where passion for exceptional wines meets the joy of discovery. We curate a diverse collection of wines from around the world, bringing you unique flavors, exquisite aromas, and unforgettable experiences</p>
             <p className='py-5'>
                         <Link 
  to="/collection" 
  className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 inline-block"
>
  <p>EXPLORE OUR COLLECTION</p>
  <hr className="w-2/4 border-none h-[1.5px] text-red-500 hidden" />
</Link>
                    </p>

        </div>



    </div>
   


    
    
  )
}

export default Hero
