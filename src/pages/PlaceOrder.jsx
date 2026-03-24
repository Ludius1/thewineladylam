import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

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

    const isFormValid = Object.values(formData).every(value => value.trim() !== '')

    // ✅ TOAST VALIDATION (same concept as product page)
    if (!isFormValid) {
      toast.error('Fill all fields to place your order.')
      return
    }

    const orderItems = []

    for (const itemId in cartItems) {
      const product = products.find(p => p._id === itemId)
      if (!product) continue

      for (const key in cartItems[itemId]) {
        if (cartItems[itemId][key] > 0) {
          orderItems.push({
            name: product.name,
            size: key,
            quantity: cartItems[itemId][key],
            price: product.price
          })
        }
      }
    }

    // ✅ OPTIONAL: empty cart check (same UX logic style)
    if (orderItems.length === 0) {
      toast.error('Your cart is empty.')
      return
    }

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
      console.error('Order sending failed', error)
      toast.error('Something went wrong, try again.')
      return
    }

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

    // ✅ Nice feedback before redirect
    toast.success('Redirecting to WhatsApp...')

    setTimeout(() => {
      window.location.href = whatsappUrl
    }, 1000)
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
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          <p className='text-gray-500 text-sm font-medium mx-4'>
            Clicking Place Order will send your order to WhatsApp for confirmation. No payment is required yet.
          </p>

          <div className="w-full text-end mt-8">
            <button
              onClick={handlePlaceOrder}
              className="bg-red-500 text-white px-16 py-3 text-sm"
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
