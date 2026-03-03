import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Star, Eye } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, index = 0 }) {
  const { addItem, cart, wishlist, toggleWishlist } = useCart();
  const inCart = cart.some(i => i.id === product.id);
  const isWishlisted = wishlist.includes(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 cursor-pointer transition-all duration-400 hover:-translate-y-2"
      style={{
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 24px 60px ${product.glowColor}, 0 8px 24px rgba(0,0,0,0.10)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
      }}
    >
      {/* Image zone */}
      <div className="relative h-52 bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
        />
        {/* Fallback */}
        <div className="hidden w-full h-full items-center justify-center bg-gray-100 text-gray-300 text-sm absolute inset-0">
          No image
        </div>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <span className="text-gray-500 text-xs font-bold tracking-widest uppercase bg-white px-3 py-1.5 rounded-full border border-gray-200">
              Out of Stock
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span
              className="text-[10px] font-black px-2.5 py-1 rounded-full text-white uppercase tracking-wide shadow-md"
              style={{ background: product.accent }}
            >
              {product.badge}
            </span>
          )}
          {product.isNew && !product.badge && (
            <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-500 text-white uppercase tracking-wide">
              New
            </span>
          )}
          {discount && (
            <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-red-500 text-white uppercase tracking-wide">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={e => { e.preventDefault(); toggleWishlist(product.id); }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md ${
            isWishlisted
              ? "bg-rose-500 text-white"
              : "bg-white text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-rose-50 hover:text-rose-500"
          }`}
        >
          <Heart size={15} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Quick view */}
        <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Link
            to={`/product/${product.id}`}
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-gray-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg translate-y-3 group-hover:translate-y-0 transition-transform duration-300 hover:bg-white cursor-pointer"
          >
            <Eye size={13} /> Quick View
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {product.category}
        </span>

        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-gray-900 font-bold text-sm mt-1 mb-2 leading-snug hover:text-orange-500 transition-colors cursor-pointer line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-200"}
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="text-gray-400 text-[10px]">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-gray-900 font-black text-xl">${product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-300 text-xs line-through">${product.originalPrice}</span>
            )}
          </div>

          <button
            onClick={() => product.inStock && addItem(product)}
            disabled={!product.inStock}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer shadow-sm ${
              !product.inStock
                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                : inCart
                ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 hover:bg-emerald-500 hover:text-white"
                : "text-white hover:scale-110 hover:shadow-lg"
            }`}
            style={
              product.inStock && !inCart
                ? { background: product.accent, boxShadow: `0 4px 14px ${product.glowColor}` }
                : {}
            }
          >
            {inCart ? "✓" : <ShoppingCart size={15} />}
          </button>
        </div>
      </div>

      {/* Coloured bottom border on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: product.accent }}
      />
    </div>
  );
}
