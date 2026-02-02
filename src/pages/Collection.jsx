import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import ProductsItem from '../components/ProductsItem'

const Collection = () => {

    const {products, search, showSearch} = useContext(ShopContext)
    const [showFilter, setShowFilter] = useState(false)
    const [filterProducts, setFilterProducts] = useState([])
    const [category, setcategory] = useState([])
    const [subCategory, setSebCategory] = useState([])
    const [sortType, setSortType] = useState([])

    const toggleCategory = (e) => { 
      if(category.includes(e.target.value)) {
            setcategory(prev=> prev.filter(item => item !== e.target.value))
      }
      else {
        setcategory(prev => [...prev, e.target.value])
      }
    }

    const toggleSubCategory = (e) => {
      if(subCategory.includes(e.target.value)) {
          setSebCategory(prev => prev.filter(item => item !== e.target.value))
      }
      else {
        setSebCategory(prev => [...prev, e.target.value])
      }
    }

    const applyFilter = () => {
      let productsCopy = products.slice()

      if (showSearch && search) {
        productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
      }
      if (category.length > 0) {
        productsCopy = productsCopy.filter(item => category.includes(item.category))
      }
      if (subCategory.length > 0) {
        productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
      }

      setFilterProducts(productsCopy)
    }

    const sortProducts = () => {
      let filterProductCopyy = filterProducts.slice()
      
      switch (sortType) {
        case 'low-high': 
          setFilterProducts(filterProductCopyy.sort((a,b) => (a.price - b.price)))
          break;
          
        case 'high-low': 
          setFilterProducts(filterProductCopyy.sort((a,b) => (b.price - a.price)))
          break;
        
        default: 
          applyFilter()
          break;
      }
    }

    // useEffect(() =>{
    //   setFilterProducts(products)
    // }, [])

    useEffect(() =>{
      sortProducts()
    }, [sortType])

    useEffect(() => {
      console.log(category)
      console.log(subCategory)
      applyFilter()
    }, [category, subCategory, search, showSearch])


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'> 

        {/* filter Options */}
        <div className="min-w-60">
            <p onClick={() =>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 '>FILTERS
            <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''  }`} src={assets.dropdown_icon} alt="" />
            </p>
           
            {/* Category Filter  */}
            <div className={` border border-gray-300 pl-5 py-3 mt- 6 ${showFilter ? '' : 'hidden' } sm:block`}>
              <p className="mb-3 text-sm font-medium">CATEGORIES</p>

              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <p className="flex gap-2">
                  <input type="checkbox" className='w-3' value={'France'} onChange={toggleCategory} /> France
                </p>
                <p className="flex gap-2">
                  <input type="checkbox" className='w-3' value={'USA'} onChange={toggleCategory} /> USA
                </p>
                <p className="flex gap-2">
                  <input type="checkbox" className='w-3' value={'Argentina'} onChange={toggleCategory}  /> Argentina
                </p>
                <p className="flex gap-2">
                  <input type="checkbox" className='w-3' value={'Chile'} onChange={toggleCategory} /> Chile
                </p>
                <p className="flex gap-2">
                  <input type="checkbox" className='w-3' value={'Germany'} onChange={toggleCategory} /> Germany
                </p>
                <p className="flex gap-2">
                  <input type="checkbox" className='w-3' value={'Italy'} onChange={toggleCategory}  /> Italy
                </p>
                <p className="flex gap-2">
                  <input type="checkbox" className='w-3' value={'New Zealand'} onChange={toggleCategory} /> New Zealand
                </p>
                <p className="flex gap-2">
                  <input type="checkbox" className='w-3' value={'Morocco'} onChange={toggleCategory} /> Morocco
                </p>
                <p className="flex gap-2">
                  <input type="checkbox" className='w-3' value={'Portugal'} onChange={toggleCategory}  /> Portugal
                </p>
                <p className="flex gap-2">
                  <input type="checkbox" className='w-3' value={'South Africa'} onChange={toggleCategory} /> South Africa
                </p>
                <p className="flex gap-2">
                  <input type="checkbox" className='w-3' value={'Spain'} onChange={toggleCategory} /> Spain
                </p>
              </div>

            </div>

            {/* SubCategory Filter  */}
            <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden' } sm:block`}>
              <p className="mb-3 text-sm font-medium">Type</p>

              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <p className="flex gap-2">
                  <input type="checkbox" className='w-3' value={'White Wine'} onChange={toggleSubCategory} /> White Wine
                </p>
                <p className="flex gap-2">
                  <input type="checkbox" className='w-3' value={'Red Wine'} onChange={toggleSubCategory} /> Red Wine
                </p>
                <p className="flex gap-2">
                  <input type="checkbox" className='w-3' value={'Sparkling Wine'} onChange={toggleSubCategory} /> Sparkling Wine
                </p>
                <p className="flex gap-2">
                  <input type="checkbox" className='w-3' value={'Champagne'} onChange={toggleSubCategory} /> Champagne
                </p>
                <p className="flex gap-2">
                  <input type="checkbox" className='w-3' value={'Rose Wine'} onChange={toggleSubCategory} /> Rose Wine
                </p>
              </div>

            </div>
        </div>

        {/* right side */}
        <div className="flex-1">
            <div className="flex justify-between text-base sm:text-2xl mb-4">
                  <Title text1={'ALL'} text2={'COLLECTIONS'}/> 

                  {/* Product Sorting */}

                  <select onChange={(e) => setSortType (e.target.value)} className="border-2 cursor-pointer outline-none border-gray-400 text-sm px-2">
                      <option value="relatant">Sort by: Relevant</option>
                      <option value="low-high">Sort by: Low-High</option>
                      <option value="high-low">Sort by: High-Low</option>
                  </select>
            </div>
                
                  {/* Map Products */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                          {
                            filterProducts.map((item, index)=> (
                              <ProductsItem key={index}
                              name={item.name}
                              id={item._id}
                              price={item.price}
                              image={item.image}/>
                            ))
                          }
                  </div>
        </div>
        
    </div>
  )
}

export default Collection