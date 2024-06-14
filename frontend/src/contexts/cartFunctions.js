export const addToCart = (cartItems, setCartItems, product) => {
  const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

  if (existingItemIndex !== -1) {
    const updatedCartItems = [...cartItems];
    updatedCartItems[existingItemIndex].quantity += 1;
    setCartItems(updatedCartItems);
  } else {
    setCartItems(prevCartItems => [...prevCartItems, { ...product, quantity: 1 }]);
  }
};

export const removeFromCart = (cartItems, setCartItems, productId) => {
  const updatedCartItems = cartItems.map(item => {
    if (item.id === productId) {
      if (item.quantity === 1) {
        return null; // remove item if quantity is 1
      }
      return { ...item, quantity: item.quantity - 1 }; // decrease quantity
    }
    return item;
  }).filter(Boolean); // remove null values
  setCartItems(updatedCartItems);
};

export const addMoreToCart = (cartItems, setCartItems, productId) => {
  const existingItemIndex = cartItems.findIndex(item => item.id === productId);

  if (existingItemIndex !== -1) {
    const updatedCartItems = [...cartItems];
    updatedCartItems[existingItemIndex].quantity += 1;
    setCartItems(updatedCartItems);
  }
};

export const removeOneFromCart = (cartItems, setCartItems, productId) => {
  const updatedCartItems = cartItems.map(item => {
    if (item.id === productId) {
      return null; // remove item
    }
    return item;
  }).filter(Boolean); // remove null values
  setCartItems(updatedCartItems);
};

export const clearCart = (setCartItems) => {
  setCartItems([]);
};