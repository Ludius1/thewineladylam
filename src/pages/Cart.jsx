import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {

  const {products, currency, cartItems, updateQuantity, navigate} = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(()=> {
      const tempData = []
        // Look at each toy in the toy box (cartItems)
      for (const items in cartItems) {
            // Look at each size of that toy
        for( const item in cartItems[items]) {
             // If you have more than 0 of a certain size of toy
            if(cartItems[items][item] > 0) {
                      // Add the toy type, size, and quantity to the tempData list
              tempData.push({
                _id:items,
                size:item,
                quantity:cartItems[items][item]
              })
            }
        }
      }

      setCartData(tempData)
      //  cartItems here is a dependancy array telling useEffect where to run
  }, [cartItems])
  return (
    <div className='border-t pt-14'>
      <div className="text-2xl">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
  
      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
  
            return (
              <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                <div className="flex items-start gap-6">
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                      <div className="flex gap-5 mt-2 items-center">
                        <p>{currency}{productData.price}</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size }</p>
                      </div>
                  </div>
                </div>
                  <input onClick={(e)=> e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} type="number" className="border max-w-20 px-1 sm:px-2 py-1" min={1} defaultValue={item.quantity} />
                  <img onClick={()=>updateQuantity(item._id, item.size, 0)} src={assets.bin_icon} alt="" className="w-4 mr-4 sm:w-5 cursor-pointer" />
              </div>

            );
          })
        }

         <div className="flex justify-end my-20 "> 
                <div className="w-full sm:w-[450px]">
                      <CartTotal/>

                      <div className="w-full text-end">
                          <button onClick={()=> navigate('/place-order')} className="bg-black text-white text-sm my-8 py-3 px-8">PROCEED TO CHECKOUT</button>
                      </div>
                </div>
         </div>
      </div>
    </div>
  );
}  

export default Cart