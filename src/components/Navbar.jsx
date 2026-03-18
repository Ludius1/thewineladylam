import React, { useContext, useState } from 'react' 
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    const [showNav, setShowNav] = useState(false)
    const { search, setSearch, setShowSearch, getCartCount } = useContext(ShopContext)
    const location = useLocation()
    const navigate = useNavigate()

    const isCollectionPage = location.pathname === '/collection'

    const handleSearchClick = () => {
        if (isCollectionPage) {
            setShowSearch(true)
        } else {
            navigate('/collection')
        }
    }

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to='/'>
                <img src={assets.logo} alt="" className='w-36' />
            </Link>

            <ul className='hidden sm:flex gap-5 text-sm text-grey-700'>
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

            <div className="flex items-center gap-6">
                {isCollectionPage ? (
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border px-2 py-1 rounded text-sm outline-none w-36 sm:w-48"
                    />
                ) : (
                    <img
                        onClick={handleSearchClick}
                        src={assets.search_icon}
                        className='w-5 cursor-pointer'
                        alt="search"
                    />
                )}

                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-500 text-white aspect-square rounded-full text-[8px]'>
                        {getCartCount()}
                    </p>
                </Link>

                <img onClick={() => setShowNav(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>

            {/* Side bar menu for smaller screen */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${showNav ? 'w-full' : 'w-0'}`}>
                <div className="flex flex-col text-gray-600 cursor-pointer">
                    <div onClick={() => setShowNav(false)} className="flex items-center gap-4 p-3">
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                        <p>Back</p>
                    </div>

                    <NavLink onClick={() => setShowNav(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setShowNav(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setShowNav(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setShowNav(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar
