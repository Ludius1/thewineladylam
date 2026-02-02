import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {

  const { cartItems, products, getCartAmount } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handlePlaceOrder = async () => {
    const orderItems = []

    for (const itemId in cartItems) {
      const product = products.find(p => p._id === itemId)
      if (!product) continue

      for (const key in cartItems[itemId]) {
        if (cartItems[itemId][key] > 0) { // Only add if quantity > 0
          orderItems.push({
            name: product.name,
            size: key,
            quantity: cartItems[itemId][key],
            price: product.price
          })
        }
      }
    }

    // Keep total in payload for your backend records if needed
    const orderPayload = {
      customer: formData,
      items: orderItems,
      total: getCartAmount() 
    }

    try {
      await fetch('https://your-backend-url/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      })
    } catch (error) {
      console.error('Email sending failed', error)
    }

    // REMOVED TOTAL FROM THE MESSAGE BELOW
    const message = `
Hola Winelady, I want to place an order.

Customer:
${formData.firstName} ${formData.lastName}
Phone: ${formData.phone}

Order:
${orderItems.map(i => `${i.name} (${i.size}) x${i.quantity}`).join('\n')}
`

    const whatsappNumber = '17869757896' 
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.location.href = whatsappUrl
  }
  return (
    <div className='flex flex-col justify-between gap-4 pt-5 sm:pt-14 sm:flex-row min-h-[80h] border-t'>

      {/* Left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className="flex gap-3">
          <input name="firstName" onChange={handleChange} className='border rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input name="lastName" onChange={handleChange} className='border rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
        </div>

        <input name="email" onChange={handleChange} className='border rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
        <input name="street" onChange={handleChange} className='border rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />

        <div className="flex gap-3">
          <input name="city" onChange={handleChange} className='border rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input name="state" onChange={handleChange} className='border rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>

        <div className="flex gap-3">
          <input name="zipcode" onChange={handleChange} className='border rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
          <input name="country" onChange={handleChange} className='border rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>

        <input name="phone" onChange={handleChange} className='border rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
      </div>

      {/* Right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          {/* <CartTotal /> */}
        </div>

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          <p className='text-gray-500 text-sm font-medium mx-4'>
            Clicking Place Order will send your order to WhatsApp for confirmation. No payment is required yet.
          </p>

          <div className="w-full text-end mt-8">
            <button
              onClick={handlePlaceOrder}
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
