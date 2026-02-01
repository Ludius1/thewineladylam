import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import Newsletter from '../components/Newsletter'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
            <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
          <img className='w-full md:max-w-[450px] ' src={assets.about_img} alt="" />
          <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                <p>Welcome to Winelady, where passion for exceptional wines meets the joy of discovery. We curate a diverse collection of wines from around the world, bringing you unique flavors, exquisite aromas, and unforgettable experiences.</p>
                <p>Every bottle in our collection is carefully selected to celebrate quality, tradition, and craftsmanship. Whether you’re a seasoned connoisseur or exploring wine for the first time, Winelady offers wines that inspire moments worth savoring, from intimate gatherings to celebratory occasions.</p>
                <b className='text-gray-800 '>Our Mission</b>
                <p>Our mission is simple: to make great wine accessible, enjoyable, and memorable. We believe wine is more than a drink—it’s a journey of taste, culture, and connection. Explore our collection, discover your favorites, and let Winelady be your guide to the world of exceptional wines.</p>
          </div>
      </div>

      
      <div className="text-xl py-4 ">
                <Title text1={'WHY'} text2={'CHOOSE US'}/>
          </div>

          <div className="flex flex-col md:flex-row text-sm mb-20 ">
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                      <b>Curated Excellence: </b>
                      <p className=' text-gray-600'>Every wine is handpicked for its quality, flavor, and authenticity, ensuring you enjoy only the best.</p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                      <b>Global Selection: </b>
                      <p className=' text-gray-600'>Our collection spans the finest vineyards worldwide, giving you access to unique and rare wines you won’t find everywhere.</p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                      <b>Memorable Experiences: </b>
                      <p className=' text-gray-600'>We don’t just sell wine—we help you create moments worth sharing, from cozy nights in to special celebrations.</p>
                </div>
          </div>

          <Newsletter/>
    </div>
  )
}

export default About