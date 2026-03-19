import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import ProductsItem from '../components/ProductsItem'

const Collection = () => {
  const { products, search } = useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (e) => {
    const value = e.target.value
    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  const toggleSubCategory = (e) => {
    const value = e.target.value
    setSubCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  const applyFilter = () => {
    if (!products || products.length === 0) {
      setFilterProducts([])
      return
    }

    let updated = [...products]

    // Filter by search text
    if (search) {
      const searchText = search.toLowerCase()
      updated = updated.filter(item =>
        (item.name && item.name.toLowerCase().includes(searchText)) ||
        (item.category && item.category.toLowerCase().includes(searchText)) ||
        (item.subCategory && item.subCategory.toLowerCase().includes(searchText))
      )
    }

    if (category.length > 0) {
      updated = updated.filter(item => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      updated = updated.filter(item => subCategory.includes(item.subCategory))
    }

    if (sortType === 'low-high') {
      updated.sort((a, b) => a.price - b.price)
    } else if (sortType === 'high-low') {
      updated.sort((a, b) => b.price - a.price)
    }

    setFilterProducts(updated)
  }

 useEffect(() => {
  if (!products || products.length === 0) {
    setFilterProducts([])
    return
  }

  let updated = [...products]

  // Filter by search text
  if (search && search.trim() !== '') {
    const searchText = search.toLowerCase()
    updated = updated.filter(item =>
      (item.name && item.name.toLowerCase().includes(searchText)) ||
      (item.category && item.category.toLowerCase().includes(searchText)) ||
      (item.subCategory && item.subCategory.toLowerCase().includes(searchText))
    )
  }

  // Apply category filter
  if (category.length > 0) {
    updated = updated.filter(item => category.includes(item.category))
  }

  // Apply subCategory filter
  if (subCategory.length > 0) {
    updated = updated.filter(item => subCategory.includes(item.subCategory))
  }

  // Sorting
  if (sortType === 'low-high') updated.sort((a, b) => a.price - b.price)
  else if (sortType === 'high-low') updated.sort((a, b) => b.price - a.price)

  setFilterProducts(updated)
}, [products, search, category, subCategory, sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* FILTERS */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* CATEGORY */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {[
              'France','USA','Argentina','Caribbean','Mexico','United Kingdom',
              'Canada','Ireland','Chile','Germany','Italy','New Zealand',
              'Morocco','Portugal','South Africa','Spain'
            ].map((item, index) => (
              <label key={index} className="flex gap-2">
                <input type="checkbox" value={item} onChange={toggleCategory} className='w-3' />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* SUBCATEGORY */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {[
              'White Wine','Red Wine','Sparkling Wine','Champagne','Rose Wine', 'Beer', 'Beverages',
              'Gin','Sweet Wine','Whiskey','Tequila','Bourbon','Vodka'
            ].map((item, index) => (
              <label key={index} className="flex gap-2">
                <input type="checkbox" value={item} onChange={toggleSubCategory} className='w-3' />
                {item}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 cursor-pointer outline-none border-gray-400 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low-High</option>
            <option value="high-low">Sort by: High-Low</option>
          </select>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500">Loading wines...</p>
        ) : filterProducts.length === 0 ? (
          <p className="text-gray-500">No wines found matching your search.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((item, index) => (
              <ProductsItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Collection
