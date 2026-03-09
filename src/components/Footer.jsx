import { Link } from "react-router-dom";
import { Zap, Mail, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#060609] border-t border-white/5 mt-24">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            {/* store name */}
            <span className="text-white font-black text-lg">RIjan<span className="text-orange-400">Store</span></span>
          </Link>
          <p className="text-white/30 text-sm leading-relaxed max-w-xs">
            Premium mobile accessories for those who demand the best. Quality, speed, and style.
          </p>
          <div className="flex gap-2 mt-5">
            {[Twitter, Instagram, Youtube].map((Icon, i) => (
              <button key={i} className="w-9 h-9 rounded-xl bg-white/5 hover:bg-orange-500/20 hover:text-orange-400 text-white/40 flex items-center justify-center transition-all">
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">Shop</h4>
          <ul className="space-y-2.5">
            {[
              { label: "Chargers", cat: "chargers" },
              { label: "Cases", cat: "cases" },
              { label: "Cables", cat: "cables" },
              { label: "Screen Protectors", cat: "screen-protectors" },
              { label: "Accessories", cat: "accessories" },
              { label: "Audio", cat: "audio" },
            ].map(({ label, cat }) => (
              <li key={cat}>
                <Link
                  to={`/products?category=${cat}`}
                  className="text-white/30 hover:text-orange-400 text-sm transition-colors cursor-pointer"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>



        {/* Newsletter */}
        <div>
          <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">Newsletter</h4>
          <p className="text-white/30 text-sm mb-4">Get exclusive deals in your inbox.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 min-w-0 bg-white/5 border border-white/10 focus:border-orange-500/50 text-white text-sm rounded-xl px-3 py-2.5 outline-none placeholder:text-white/20 transition-colors"
            />
            <button type="button" className="bg-gradient-to-br from-orange-500 to-rose-500 text-white p-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-orange-500/20">
              <Mail size={15} />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/5 mx-6 mt-8 pt-6 pb-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-white/20 text-xs">© 2026 RijanStore. All rights reserved.</p>
        <div className="flex gap-4">
          {["Privacy", "Terms", "Cookies"].map(item => (
            <a key={item} href="#" className="text-white/20 hover:text-white/50 text-xs transition-colors">{item}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}