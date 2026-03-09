import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Search, Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cartCount, wishlist } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Shop" },
    { to: "/cart", label: "Cart" },
    { to: "/wishlist", label: "Wishlist" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#080810]/90 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Zap size={16} className="text-white" fill="white" />
          </div>
          <span className="text-white font-black text-lg tracking-tight">
            Rijan<span className="text-orange-400">Store</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                location.pathname === link.to
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1">
          {/* Search */}
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-1.5 border border-white/10">
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products…"
                className="bg-transparent text-white text-sm outline-none w-44 placeholder:text-white/30"
              />
              <button type="submit"><Search size={15} className="text-orange-400" /></button>
              <button type="button" onClick={() => setSearchOpen(false)}><X size={15} className="text-white/40" /></button>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="w-9 h-9 flex items-center justify-center rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all">
              <Search size={18} />
            </button>
          )}

          {/* Wishlist */}
          <Link to="/wishlist" className="relative w-9 h-9 flex items-center justify-center rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all">
            <Heart size={18} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative flex items-center gap-2 bg-gradient-to-br from-orange-500 to-rose-500 text-white text-sm font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-orange-500/20">
            <ShoppingCart size={15} />
            <span className="hidden sm:inline">Cart item</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 bg-white text-orange-600 text-[10px] font-black rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-white/50 hover:text-white hover:bg-white/5"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a12] border-t border-white/5 px-4 py-3 flex flex-col gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === link.to ? "bg-white/10 text-white" : "text-white/50 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
