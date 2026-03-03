import { createContext, useContext, useReducer, useState } from "react";

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find(i => i.id === action.payload.id);
      if (existing) return state.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i);
      return [...state, { ...action.payload, qty: 1 }];
    }
    case "REMOVE_ITEM": return state.filter(i => i.id !== action.payload);
    case "UPDATE_QTY": return state.map(i => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i);
    case "CLEAR": return [];
    default: return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [wishlist, setWishlist] = useState([]);

  const addItem    = (p) => dispatch({ type: "ADD_ITEM", payload: p });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const updateQty  = (id, qty) => qty < 1 ? removeItem(id) : dispatch({ type: "UPDATE_QTY", payload: { id, qty } });
  const clearCart  = () => dispatch({ type: "CLEAR" });
  const toggleWishlist = (id) => setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]);

  const cartCount  = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, wishlist, cartCount, cartTotal, addItem, removeItem, updateQty, clearCart, toggleWishlist }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
