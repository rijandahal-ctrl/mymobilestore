import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useCart();
  const wishlisted = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-end gap-4 mb-10">
          <div>
            <p className="text-rose-500 text-xs font-bold uppercase tracking-widest mb-1">Saved Items</p>
            <h1 className="text-5xl font-black text-gray-900 flex items-center gap-3">
              Wishlist
              <span className="text-3xl text-gray-300">({wishlisted.length})</span>
            </h1>
          </div>
          <Heart size={28} className="text-rose-500 mb-2" fill="currentColor" />
        </div>

        {wishlisted.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-8xl mb-6">💝</div>
            <h2 className="text-gray-900 text-3xl font-black mb-4">Nothing saved yet</h2>
            <p className="text-gray-400 mb-10">Browse products and tap the ♥ to save items here for later.</p>
            <Link to="/products" className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black px-10 py-4 rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-rose-200 cursor-pointer">
              <ShoppingBag size={20} /> Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {wishlisted.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
            <div className="text-center mt-10">
              <Link to="/products" className="text-gray-400 hover:text-orange-500 text-sm transition-colors cursor-pointer">
                + Continue browsing
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
