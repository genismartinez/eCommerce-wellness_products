import React, { createContext, useContext, useState } from 'react';
import {
    addToCart as addToCartFn,
    removeFromCart as removeFromCartFn,
    addMoreToCart as addMoreToCartFn,
    removeOneFromCart as removeOneFromCartFn,
    clearCart as clearCartFn
} from './cartFunctions';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => addToCartFn(cartItems, setCartItems, product);
    const removeFromCart = (productId) => removeFromCartFn(cartItems, setCartItems, productId);
    const addMoreToCart = (productId) => addMoreToCartFn(cartItems, setCartItems, productId);
    const removeOneFromCart = (productId) => removeOneFromCartFn(cartItems, setCartItems, productId);
    const clearCart = () => clearCartFn(setCartItems);

    const createCheckoutSession = async () => {
        const response = await fetch('/api/checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cartItems })
        });
        const data = await response.json();
        return data;
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, addMoreToCart, removeOneFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
