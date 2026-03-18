import React, { useContext, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    const [showNav, setShowNav] = useState(false)
    const { search, setSearch, getCartCount } = useContext(ShopContext)
    const location = useLocation()
    const navigate = useNavigate()

    // Determine if we are currently on the collection page
    const isCollectionPage = location.pathname === '/collection'

    return (
        <div className='flex items-center justify-between py-5 font-medium relative'>
            
            {/* Logo */}
            <Link to='/'>
                <img src={assets.logo} alt="Logo" className='w-36' />
            </Link>

            {/* Desktop Navigation Links */}
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            {/* Right Side Icons & Search */}
            <div className="flex items-center gap-6">
                
                {isCollectionPage ? (
                    /* Option B: Inline Search Input on Collection Page */
                    <div className='relative flex items-center'>
                        <input
                            type="text"
                            placeholder="Search wines..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border border-gray-400 px-3 py-1.5 rounded-full text-sm outline-none w-36 sm:w-64 bg-gray-50 focus:border-black transition-all"
                        />
                        {search && (
                            <span 
                                onClick={() => setSearch('')} 
                                className="absolute right-3 cursor-pointer text-gray-400 hover:text-black text-xs font-bold"
                            >
                                ✕
                            </span>
                        )}
                    </div>
                ) : (
                    /* Search Icon on other pages: Clicking navigates to Collection */
                    <img
                        onClick={() => navigate('/collection')}
                        src={assets.search_icon}
                        className='w-5 cursor-pointer hover:opacity-70'
                        alt="search icon"
                    />
                )}

                {/* Cart Icon */}
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart icon" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-500 text-white aspect-square rounded-full text-[8px]'>
                        {getCartCount()}
                    </p>
                </Link>

                {/* Mobile Menu Icon */}
                <img 
                    onClick={() => setShowNav(true)} 
                    src={assets.menu_icon} 
                    className='w-5 cursor-pointer sm:hidden' 
                    alt="menu icon" 
                />
            </div>

            {/* Sidebar menu for smaller screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-50 ${showNav ? 'w-full' : 'w-0'}`}>
                <div className="flex flex-col text-gray-600 cursor-pointer">
                    <div onClick={() => setShowNav(false)} className="flex items-center gap-4 p-3 border-b">
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="back" />
                        <p>Back</p>
                    </div>

                    <NavLink onClick={() => setShowNav(false)} className='py-4 pl-6 border-b' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setShowNav(false)} className='py-4 pl-6 border-b' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setShowNav(false)} className='py-4 pl-6 border-b' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setShowNav(false)} className='py-4 pl-6 border-b' to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar
