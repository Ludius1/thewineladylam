import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    
    // Search states for Navbar Option B
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();

    // UPDATED: Proceeds regardless of whether a size is selected
    const addToCart = (itemId, size) => {
        
        setCartItems(prev => {
            const cartData = structuredClone(prev);

            if (!cartData[itemId]) {
                cartData[itemId] = {};
            }

            // Logic: Use the selected size, or default to 'Standard' if empty
            const key = size && size !== '' ? size : 'Standard';

            cartData[itemId][key] = (cartData[itemId][key] || 0) + 1;
            
            // Provide feedback that the inquiry was registered
            toast.success("Added to availability inquiry");

            return cartData;
        });
    }

    const getCartCount = () => {
        let total = 0;
        for (const itemId in cartItems) {
            for (const key in cartItems[itemId]) {
                total += cartItems[itemId][key];
            }
        }
        return total;
    }

    const updateQuantity = (itemId, key, quantity) => {
        setCartItems(prev => {
            const cartData = structuredClone(prev);
            cartData[itemId][key] = quantity;
            return cartData;
        });
    }

    const getCartAmount = () => {
        let total = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find(p => p._id === itemId);
            if (!itemInfo) continue;

            for (const key in cartItems[itemId]) {
                total += itemInfo.price * cartItems[itemId][key];
            }
        }
        return total;
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
        navigate,
        search,
        setSearch,
        showSearch,
        setShowSearch
    }

    useEffect(() => {
        // Debugging: View your current inquiries in the console
        console.log("Current Cart/Inquiry State:", cartItems);
    }, [cartItems]);

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
