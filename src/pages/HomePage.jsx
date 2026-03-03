import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Truck, RotateCcw, Star, ChevronRight } from "lucide-react";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";

const marqueeItems = ["⚡ MagSafe Charging", "🛡️ Drop Protection", "🔌 GaN Technology", "📱 Premium Cases", "🎵 Pro Audio", "📸 Camera Lenses", "💳 MagSafe Wallets", "🚗 Car Mounts"];

const perks = [
  { icon: Zap,       title: "Free 2-Day Shipping", sub: "On orders over $35",    color: "bg-amber-50",   iconColor: "text-amber-500" },
  { icon: Shield,    title: "2-Year Warranty",      sub: "Every product covered", color: "bg-blue-50",    iconColor: "text-blue-500" },
  { icon: Truck,     title: "Free Returns",         sub: "30-day no-hassle",      color: "bg-emerald-50", iconColor: "text-emerald-500" },
  { icon: RotateCcw, title: "24/7 Support",         sub: "Real humans, fast help",color: "bg-rose-50",    iconColor: "text-rose-500" },
];

const testimonials = [
  { name: "Sarah M.", handle: "@sarahdesigns", avatar: "👩‍💻", text: "The MagSafe 3-in-1 stand is a total game changer. My nightstand looks like a tech showroom now!", rating: 5, product: "MagSafe 3-in-1 Stand" },
  { name: "James K.", handle: "@jamesk_tech",  avatar: "👨‍🔧", text: "GaN charger replaced literally 4 separate chargers. The 65W fits in my pocket. Incredible engineering.", rating: 5, product: "65W GaN Nano Charger" },
  { name: "Priya S.", handle: "@priya_out",    avatar: "👩‍🎤", text: "Case survived a 2-metre drop onto concrete. Barely a scratch. Exactly what I needed.", rating: 5, product: "iPhone 16 ArmorShield" },
  { name: "Marcus T.", handle: "@marcusphoto", avatar: "📸", text: "The clip-on lens kit is insane value. The telephoto is so sharp people think I have a real camera.", rating: 5, product: "Clip-On Phone Lens Kit" },
];

export default function HomePage() {
  const featuredProducts = products.filter(p => p.badge).slice(0, 8);
  const newArrivals = products.filter(p => p.isNew);

  return (
    <div className="overflow-x-hidden bg-white">

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-rose-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-100/60 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-xs font-bold px-4 py-2 rounded-full mb-8 tracking-wide">
              <Zap size={12} fill="currentColor" />
              Free shipping on orders over $35
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 leading-[0.95] mb-6 tracking-tight">
              Power Up<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
                Your World.
              </span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-md mb-10">
              26 premium mobile accessories crafted for the modern world. Every charger, case, and cable engineered to last.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products" className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold px-8 py-4 rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-orange-200 active:scale-95 group cursor-pointer">
                Shop All Products
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/products?category=chargers" className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-2xl hover:border-orange-300 hover:text-orange-500 transition-all cursor-pointer shadow-sm">
                View Chargers ⚡
              </Link>
            </div>
            {/* Stats */}
            <div className="flex gap-10 mt-12">
              {[["26+", "Products"], ["50K+", "Customers"], ["4.8★", "Rating"]].map(([val, lab]) => (
                <div key={lab}>
                  <div className="text-2xl font-black text-gray-900">{val}</div>
                  <div className="text-gray-400 text-xs">{lab}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image mosaic grid */}
          <div className="hidden lg:grid grid-cols-3 gap-3">
            {products.slice(0, 9).map((p, i) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${i === 4 ? "h-28" : "h-20"}`}
                style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-gradient-to-r from-orange-500 to-rose-500 py-3 overflow-hidden">
        <div className="flex animate-[marquee_20s_linear_infinite] gap-8 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-white/90 font-semibold text-sm shrink-0 flex items-center gap-3">
              {item} <span className="text-white/40">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── PERKS ── */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {perks.map(({ icon: Icon, title, sub, color, iconColor }) => (
          <div key={title} className={`${color} rounded-2xl p-5 flex gap-4 items-center hover:shadow-md transition-all group`}>
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
              <Icon size={18} className={iconColor} />
            </div>
            <div>
              <p className="text-gray-900 text-sm font-semibold">{title}</p>
              <p className="text-gray-500 text-xs">{sub}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── CATEGORIES ── */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-black text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.filter(c => c.id !== "all").map(cat => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="group bg-white border border-gray-100 hover:border-orange-200 hover:shadow-md rounded-2xl p-4 text-center flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
              <span className="text-gray-700 text-xs font-semibold">{cat.label}</span>
              <span className="text-gray-300 text-[10px]">{cat.count} items</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-1">Handpicked</p>
            <h2 className="text-3xl font-black text-gray-900">Featured Products</h2>
          </div>
          <Link to="/products" className="flex items-center gap-1 text-gray-400 hover:text-orange-500 text-sm font-medium transition-colors group cursor-pointer">
            View all <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {featuredProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }} />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-1">Limited Time</p>
              <h3 className="text-4xl font-black text-white mb-2">Up to 40% Off 🔥</h3>
              <p className="text-white/70">Sale ends this weekend. Don't sleep on these deals.</p>
            </div>
            <Link to="/products" className="shrink-0 bg-white text-violet-700 font-black px-10 py-4 rounded-2xl hover:bg-violet-50 transition-all active:scale-95 shadow-2xl cursor-pointer">
              Shop the Sale →
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-emerald-500 text-xs font-bold uppercase tracking-widest mb-1">Just Dropped</p>
            <h2 className="text-3xl font-black text-gray-900">New Arrivals</h2>
          </div>
          <Link to="/products?filter=new" className="flex items-center gap-1 text-gray-400 hover:text-orange-500 text-sm font-medium transition-colors group cursor-pointer">
            See all <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-gray-50 py-16 mt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">50,000+ Happy Customers</p>
            <h2 className="text-3xl font-black text-gray-900">What People Are Saying</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={12} className="text-amber-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{t.avatar}</span>
                  <div>
                    <p className="text-gray-900 text-sm font-semibold">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.handle}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-50">
                  <p className="text-gray-300 text-[10px]">Bought: {t.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}