import { createContext, useEffect, useState } from "react"
import { products } from "../assets/frontend_assets/assets"
import { useNavigate } from "react-router-dom"

export const ShopContext = createContext()

const ShopContextProvider = (props) => {

  const currency = '$'
  const delivery_fee = 10
  const [cartItems, setCartItems] = useState({})
  const navigate = useNavigate()

  const addToCart = (itemId, size = null) => {
    setCartItems(prev => {
      const cartData = structuredClone(prev)

      if (!cartData[itemId]) {
        cartData[itemId] = {}
      }

      const key = size || 'default'
      cartData[itemId][key] = (cartData[itemId][key] || 0) + 1

      return cartData
    })
  }

  const getCartCount = () => {
    let total = 0
    for (const itemId in cartItems) {
      for (const key in cartItems[itemId]) {
        total += cartItems[itemId][key]
      }
    }
    return total
  }

  const updateQuantity = (itemId, key, quantity) => {
    setCartItems(prev => {
      const cartData = structuredClone(prev)
      cartData[itemId][key] = quantity
      return cartData
    })
  }

  const getCartAmount = () => {
    let total = 0
    for (const itemId in cartItems) {
      const itemInfo = products.find(p => p._id === itemId)
      if (!itemInfo) continue

      for (const key in cartItems[itemId]) {
        total += itemInfo.price * cartItems[itemId][key]
      }
    }
    return total
  }

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate
  }

  useEffect(() => {
    console.log(cartItems)
  }, [cartItems])

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
