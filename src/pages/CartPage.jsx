import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeItem, updateQty, cartTotal, clearCart } = useCart();

  const shipping = cartTotal >= 35 ? 0 : 5.99;
  const tax      = cartTotal * 0.08;
  const total    = cartTotal + shipping + tax;

  if (cart.length === 0) return (
    <div className="bg-white min-h-screen max-w-7xl mx-auto px-6 py-32 text-center">
      <div className="text-8xl mb-6">🛒</div>
      <h2 className="text-gray-900 text-4xl font-black mb-4">Your cart is empty</h2>
      <p className="text-gray-400 mb-10">Browse our accessories and find something you love.</p>
      <Link to="/products" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-black px-10 py-4 rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-orange-200 cursor-pointer">
        <ShoppingBag size={20} /> Start Shopping
      </Link>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-1">Review</p>
            <h1 className="text-5xl font-black text-gray-900">Your Cart</h1>
          </div>
          <button onClick={clearCart} className="flex items-center gap-2 text-gray-300 hover:text-rose-500 text-sm transition-colors cursor-pointer">
            <Trash2 size={14} /> Clear all
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="group bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-5 flex gap-4 items-center transition-all hover:shadow-md">
                {/* Image */}
                <div
                  className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm"
                  style={{ boxShadow: `0 4px 14px ${item.glowColor}` }}
                >
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="text-gray-900 font-bold text-sm hover:text-orange-500 transition-colors line-clamp-1 cursor-pointer">
                    {item.name}
                  </Link>
                  <p className="text-gray-400 text-xs capitalize mt-0.5">{item.category}</p>
                  <p className="font-black mt-1 text-sm" style={{ color: item.accent }}>${item.price}</p>
                </div>

                {/* Qty */}
                <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 border border-gray-100">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg transition-all cursor-pointer">
                    <Minus size={13} />
                  </button>
                  <span className="text-gray-900 font-bold text-sm w-7 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg transition-all cursor-pointer">
                    <Plus size={13} />
                  </button>
                </div>

                {/* Line total */}
                <div className="text-right shrink-0 w-20">
                  <p className="text-gray-900 font-black">${(item.price * item.qty).toFixed(2)}</p>
                  <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-rose-500 transition-colors mt-1 cursor-pointer">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}

            <Link to="/products" className="flex items-center gap-2 text-gray-400 hover:text-orange-500 text-sm transition-colors pt-2 cursor-pointer">
              + Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 sticky top-24">
              <h2 className="text-gray-900 font-black text-xl mb-6">Order Summary</h2>

              {/* Promo */}
              <div className="flex gap-2 mb-5">
                <div className="flex items-center gap-2 flex-1 bg-white border border-gray-200 rounded-xl px-3">
                  <Tag size={14} className="text-gray-300" />
                  <input placeholder="Promo code" className="bg-transparent text-gray-900 text-sm py-2.5 outline-none flex-1 placeholder:text-gray-400" />
                </div>
                <button className="bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-4 rounded-xl transition-all cursor-pointer">Apply</button>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span className="text-gray-900 font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-emerald-600 font-semibold" : "text-gray-900 font-semibold"}>
                    {shipping === 0 ? "FREE ✓" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Tax (8%)</span>
                  <span className="text-gray-900 font-semibold">${tax.toFixed(2)}</span>
                </div>

                {cartTotal < 35 && (
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-center">
                    <p className="text-orange-600 text-xs">
                      Add <span className="font-bold">${(35 - cartTotal).toFixed(2)}</span> more for free shipping!
                    </p>
                    <div className="mt-2 bg-orange-100 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-rose-500 h-full rounded-full transition-all"
                        style={{ width: `${Math.min((cartTotal / 35) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4 flex justify-between text-gray-900 font-black text-xl">
                  <span>Total</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link to="/checkout" className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-black py-4 rounded-2xl hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-orange-200 cursor-pointer">
                Checkout <ArrowRight size={18} />
              </Link>

              <div className="mt-4 flex items-center justify-center gap-4 text-gray-300 text-xs">
                {["🔒 Secure", "💳 All Cards", "📦 Free Returns"].map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
