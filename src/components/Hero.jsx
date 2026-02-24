import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'

const Hero = () => {
  return (

    <div className="div">
                     <div className=' flex flex-col sm:flex-row border border-grey-400'>
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
            <div className="text-[#414141]">
                <div className="flex items-center gap-2">
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className='font-medium text-sm md:text-base'>EXPLORE COUNTRY</p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Wines Collection</h1>
                <div className="flex items-center gap-2 ">
                        <p className='font-semibold text-sm md:text-base'> SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                </div>
            </div>


        </div>

        {/* HERO RIGHT SIDE */}
        <img src={assets.hero_img} className='w-full sm:w-1/2' alt="" />

    </div>

    

    <div className="my-10 flex flex-col md:flex-row gap-16">
              <img className='w-full md:max-w-[450px] h-[300px] object-cover aspect-video' src={assets.about_img} alt="" />

        
                        
                              <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                    <p><div className="text-2xl text-center pt-8 border-t">
                         <Title text1={'ABOUT'} text2={'US'}/>
                           </div></p>
                    <p>Welcome to Winelady, where passion for exceptional wines meets the joy of discovery. We curate a diverse collection of wines from around the world, bringing you unique flavors, exquisite aromas, and unforgettable experiences.</p>
                    <p>
                         <button to='/collection' className=' bg-black text-white px-8 py-3 text-sm active:bg-gray-700 '>
                                       <p>EXPLORE OUR COLLECTION</p>
                                       <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                                   </button>
                    </p>


              </div>
          
        
          </div>


    </div>
   


    
    
  )
}

export default Hero
