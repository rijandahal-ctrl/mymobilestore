import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";

const sortOptions = [
  { value: "featured",   label: "Featured" },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating",     label: "Top Rated" },
  { value: "reviews",    label: "Most Reviewed" },
  { value: "name",       label: "A → Z" },
];

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery]               = useState(searchParams.get("search") || "");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const [sortBy, setSortBy]             = useState("featured");
  const [showSale, setShowSale]         = useState(false);
  const [showInStock, setShowInStock]   = useState(false);

  useEffect(() => {
    const s = searchParams.get("search");
    const c = searchParams.get("category");
    if (s) setQuery(s);
    if (c) setActiveCategory(c);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let r = [...products];
    if (activeCategory !== "all") r = r.filter(p => p.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      r = r.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (showSale)    r = r.filter(p => p.isSale || p.originalPrice);
    if (showInStock) r = r.filter(p => p.inStock);
    switch (sortBy) {
      case "price-asc":  r.sort((a, b) => a.price - b.price); break;
      case "price-desc": r.sort((a, b) => b.price - a.price); break;
      case "rating":     r.sort((a, b) => b.rating - a.rating); break;
      case "reviews":    r.sort((a, b) => b.reviews - a.reviews); break;
      case "name":       r.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return r;
  }, [activeCategory, query, sortBy, showSale, showInStock]);

  const clearFilters = () => {
    setQuery(""); setActiveCategory("all"); setSortBy("featured"); setShowSale(false); setShowInStock(false);
  };
  const hasFilters = query || activeCategory !== "all" || showSale || showInStock;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-1">Our Collection</p>
          <h1 className="text-5xl font-black text-gray-900">All Products</h1>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-xl">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products, categories…"
            className="w-full bg-gray-50 border border-gray-200 focus:border-orange-400 text-gray-900 pl-11 pr-10 py-3.5 rounded-2xl text-sm outline-none placeholder:text-gray-400 transition-colors"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer">
              <X size={15} />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex flex-wrap gap-2 flex-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md shadow-orange-200"
                    : "bg-gray-50 border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-500"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
                <span className={`text-[10px] ${activeCategory === cat.id ? "text-white/70" : "text-gray-400"}`}>({cat.count})</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowSale(!showSale)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all border cursor-pointer ${
                showSale ? "bg-red-50 border-red-200 text-red-500" : "bg-gray-50 border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-500"
              }`}
            >
              🏷️ Sale
            </button>
            <button
              onClick={() => setShowInStock(!showInStock)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all border cursor-pointer ${
                showInStock ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-gray-50 border-gray-200 text-gray-500 hover:border-emerald-200 hover:text-emerald-600"
              }`}
            >
              ✅ In Stock
            </button>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <SlidersHorizontal size={14} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-transparent text-gray-700 text-sm outline-none cursor-pointer"
              >
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Results bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400 text-sm">
            <span className="text-gray-900 font-semibold">{filtered.length}</span> products found
          </p>
          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1.5 text-orange-500 hover:text-orange-600 text-sm transition-colors cursor-pointer">
              <X size={13} /> Clear filters
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        ) : (
          <div className="text-center py-32">
            <span className="text-7xl">🔍</span>
            <h3 className="text-gray-900 text-2xl font-black mt-6 mb-3">Nothing found</h3>
            <p className="text-gray-400 mb-8">Try different keywords or clear your filters.</p>
            <button onClick={clearFilters} className="bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold px-8 py-3.5 rounded-2xl hover:opacity-90 transition-all cursor-pointer">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
