import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Heart, Star, ArrowLeft, CheckCircle, Package, Shield, Zap, Truck } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addItem, cart, wishlist, toggleWishlist } = useCart();

  if (!product) return (
    <div className="text-center py-32 bg-white">
      <span className="text-7xl">😕</span>
      <h2 className="text-gray-900 text-2xl font-black mt-6 mb-4">Product not found</h2>
      <Link to="/products" className="text-orange-500 hover:underline cursor-pointer">← Back to shop</Link>
    </div>
  );

  const inCart = cart.some(i => i.id === product.id);
  const isWishlisted = wishlist.includes(product.id);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : null;
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Breadcrumb */}
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-500 text-sm mb-10 transition-colors group cursor-pointer">
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </Link>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">

          {/* Image Panel */}
          <div className="space-y-4">
            {/* Main image */}
            <div
              className="relative rounded-3xl h-[440px] overflow-hidden bg-gray-50"
              style={{ boxShadow: `0 20px 60px ${product.glowColor}` }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="bg-white text-xs font-black px-3 py-1 rounded-full shadow-md" style={{ color: product.accent }}>
                    {product.badge}
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-emerald-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">NEW</span>
                )}
                {discount && (
                  <span className="bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">-{discount}% OFF</span>
                )}
              </div>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-md ${
                  isWishlisted ? "bg-rose-500 text-white" : "bg-white text-gray-400 hover:bg-rose-50 hover:text-rose-500"
                }`}
              >
                <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
              </button>

              {!product.inStock && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-3xl">
                  <span className="text-gray-600 font-bold tracking-widest uppercase bg-white px-4 py-2 rounded-full border border-gray-200 shadow">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {[product.image, product.image, product.image, product.image].map((img, i) => (
                <div
                  key={i}
                  className={`h-20 rounded-2xl overflow-hidden cursor-pointer transition-all ${
                    i === 0 ? "ring-2 ring-orange-400 ring-offset-2" : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info Panel */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block capitalize">{product.category}</span>
            <h1 className="text-4xl font-black text-gray-900 leading-tight mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-200"} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-gray-500 text-sm">{product.rating} out of 5</span>
              <span className="text-gray-300">·</span>
              <span className="text-gray-400 text-sm">{product.reviews.toLocaleString()} reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-5xl font-black text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-gray-300 text-2xl line-through">${product.originalPrice}</span>
                  <span className="text-emerald-600 font-black text-sm bg-emerald-50 px-2 py-1 rounded-lg ml-auto">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-500 leading-relaxed mb-6">{product.description}</p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2.5 mb-8">
              {product.features.map(f => (
                <div key={f} className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5">
                  <CheckCircle size={14} className="text-orange-500 shrink-0" />
                  <span className="text-gray-700 text-xs font-medium">{f}</span>
                </div>
              ))}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" : "bg-gray-300"}`} />
              <span className={`text-sm font-semibold ${product.inStock ? "text-emerald-600" : "text-gray-400"}`}>
                {product.inStock ? "In Stock — Ships within 24hrs" : "Currently Out of Stock"}
              </span>
            </div>

            {/* CTA */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => product.inStock && addItem(product)}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl font-black text-base transition-all active:scale-95 cursor-pointer ${
                  !product.inStock
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : inCart
                    ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-xl shadow-emerald-200"
                    : "text-white hover:opacity-90 shadow-xl"
                }`}
                style={product.inStock && !inCart ? {
                  background: `linear-gradient(135deg, ${product.accent}, ${product.accent}cc)`,
                  boxShadow: `0 12px 32px ${product.glowColor}`
                } : {}}
              >
                <ShoppingCart size={20} />
                {inCart ? "Added to Cart ✓" : "Add to Cart"}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all cursor-pointer ${
                  isWishlisted ? "bg-rose-50 border-rose-200 text-rose-500" : "border-gray-200 text-gray-400 hover:border-rose-200 hover:text-rose-500 hover:bg-rose-50"
                }`}
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-gray-100">
              {[
                { icon: Package, label: "Free shipping $35+" },
                { icon: Shield,  label: "2-year warranty" },
                { icon: Truck,   label: "2-day delivery" },
                { icon: Zap,     label: "Fast dispatch" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-gray-400 text-xs">
                  <Icon size={13} className="text-orange-400" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-8 capitalize">More in {product.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
