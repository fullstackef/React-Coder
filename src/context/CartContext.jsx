import { createContext, useState } from "react";

export const CartContext = createContext({ cart: [] });

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const total = cart.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  const totalQuantity = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const addItem = (item, quantity) => {
    if (!isInCart(item.id)) {
      setCart((prev) => [...prev, { ...item, quantity }]);
    } else {
      const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
      const newCart = [...cart];
      newCart[itemIndex].quantity += quantity;
      setCart(newCart);
    }
  };
  const removeItem = (itemId) => {
    const cartUpdated = cart.filter((prod) => prod.id !== itemId);
    setCart(cartUpdated);
  };
  const clearCart = () => {
    setCart([]);
  };
  const isInCart = (itemId) => {
    return cart.some((prod) => prod.id === itemId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        totalQuantity,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
