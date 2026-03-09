import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Lock, CheckCircle, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";

const steps = ["Shipping", "Payment", "Confirm"];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "NEPAL",
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });

  const shipping = cartTotal >= 35 ? 0 : 5.99;
  const tax      = cartTotal * 0.08;
  const total    = cartTotal + shipping + tax;
  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const placeOrder = () => { clearCart(); setStep(3); };

  const inputCls = "w-full bg-gray-50 border border-gray-200 focus:border-orange-400 text-gray-900 text-sm rounded-xl px-4 py-3 outline-none placeholder:text-gray-400 transition-colors";

  if (!cart.length && step !== 3) return (
    <div className="bg-white text-center py-32">
      <p className="text-gray-400">No items to checkout.</p>
      <Link to="/products" className="text-orange-500 hover:underline mt-4 block cursor-pointer">Shop Now</Link>
    </div>
  );

  /* SUCCESS */
  if (step === 3) return (
    <div className="bg-white min-h-screen max-w-lg mx-auto px-6 py-24 text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-200">
        <CheckCircle size={48} className="text-white" />
      </div>
      <h1 className="text-5xl font-black text-gray-900 mb-4">Order Placed! 🎉</h1>
      <p className="text-gray-500 mb-2">Thanks, <span className="text-gray-900 font-bold">{form.firstName || "friend"}</span>!</p>
      <p className="text-gray-400 text-sm mb-10">
        Your order will be dispatched within 24 hours to {form.city || "your address"}.
      </p>
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-left mb-10">
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">Order Confirmation</p>
        <p className="text-gray-900 font-black text-xl">Order #MOB-{Math.floor(Math.random() * 90000 + 10000)}</p>
        <p className="text-gray-500 text-sm mt-2">Total paid: <span className="text-orange-500 font-black">${total.toFixed(2)}</span></p>
        <p className="text-gray-300 text-xs mt-2">Confirmation email sent to {form.email || "your email"}</p>
      </div>
      <Link to="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-black px-10 py-4 rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-orange-200 cursor-pointer">
        Back to Home
      </Link>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/cart" className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-500 text-sm mb-10 transition-colors group cursor-pointer">
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          Back to Cart
        </Link>

        <h1 className="text-5xl font-black text-gray-900 mb-10">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-3 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black transition-all ${
                step > i ? "bg-emerald-500 text-white" : step === i ? "bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-200" : "bg-gray-100 text-gray-400"
              }`}>
                {step > i ? "✓" : i + 1}
              </div>
              <span className={`text-sm font-semibold transition-colors ${step === i ? "text-gray-900" : "text-gray-400"}`}>{s}</span>
              {i < steps.length - 1 && <ChevronRight size={14} className="text-gray-300 ml-1" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">

            {/* STEP 0 — Shipping */}
            {step === 0 && (
              <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                <h2 className="text-gray-900 font-black text-xl mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 text-sm">📦</span>
                  Shipping Info
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[["First Name","firstName","John"],["Last Name","lastName","Doe"]].map(([label,key,ph]) => (
                    <div key={key}>
                      <label className="text-gray-500 text-xs mb-1.5 block">{label}</label>
                      <input className={inputCls} placeholder={ph} value={form[key]} onChange={e => upd(key, e.target.value)} />
                    </div>
                  ))}
                  {[["Email","email","email","nepal@gmail.com"],["Phone","phone","tel","+9779840000001"]].map(([label,key,type,ph]) => (
                    <div key={key}>
                      <label className="text-gray-500 text-xs mb-1.5 block">{label}</label>
                      <input className={inputCls} type={type} placeholder={ph} value={form[key]} onChange={e => upd(key, e.target.value)} />
                    </div>
                  ))}
                  <div className="col-span-2">
                    <label className="text-gray-500 text-xs mb-1.5 block">Street Address</label>
                    <input className={inputCls} placeholder="123 Main Street" value={form.address} onChange={e => upd("address", e.target.value)} />
                  </div>
                  {[["City","city","Itahari"],["State","state","KOSHI"],["Postcode","zip","56705"]].map(([label,key,ph]) => (
                    <div key={key}>
                      <label className="text-gray-500 text-xs mb-1.5 block">{label}</label>
                      <input className={inputCls} placeholder={ph} value={form[key]} onChange={e => upd(key, e.target.value)} />
                    </div>
                  ))}
                  <div>
                    <label className="text-gray-500 text-xs mb-1.5 block">Country</label>
                    <select className={inputCls + " cursor-pointer"} value={form.country} onChange={e => upd("country", e.target.value)}>
                      {[" NEPAL","iNDIA","CHINA","United Kingdom","Canada","Singapore"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <button onClick={() => setStep(1)} className="mt-8 w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-black py-4 rounded-2xl hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-orange-200 cursor-pointer">
                  Continue to Payment →
                </button>
              </div>
            )}

            {/* STEP 1 — Payment */}
           {step === 1 && (
  <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
    <h2 className="text-gray-900 font-black text-xl mb-6 flex items-center gap-2">
      <span className="w-8 h-8 bg-violet-50 rounded-xl flex items-center justify-center text-violet-500 text-sm">🌍</span>
      Payment Method
    </h2>

    {/* Payment Method Selector */}
    <div className="flex gap-2 mb-8 p-1 bg-gray-50 rounded-2xl">
      <button 
        onClick={() => upd("method", "card")}
        className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${form.method === 'card' ? 'bg-white shadow-sm text-violet-600' : 'text-gray-400'}`}
      >
        Card
      </button>
      <button 
        onClick={() => upd("method", "international")}
        className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${form.method === 'international' ? 'bg-white shadow-sm text-violet-600' : 'text-gray-400'}`}
      >
        International / Nepal
      </button>
    </div>

    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 mb-6">
      <Lock size={14} className="text-emerald-500" />
      <span className="text-emerald-700 text-xs">Secure encrypted transaction via Stripe & Himalayan Bank.</span>
    </div>

    <div className="space-y-4">
      {form.method === 'card' ? (
        /* Standard Card UI */
        <>
          <div>
            <label className="text-gray-500 text-xs mb-1.5 block">Name on Card</label>
            <input className={inputCls} placeholder="John Doe" value={form.cardName} onChange={e => upd("cardName", e.target.value)} />
          </div>
          <div>
            <label className="text-gray-500 text-xs mb-1.5 block">Card Number</label>
            <input className={inputCls} placeholder="1234 5678 9012 3456" maxLength={19} value={form.cardNumber} onChange={e => upd("cardNumber", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-500 text-xs mb-1.5 block">Expiry</label>
              <input className={inputCls} placeholder="MM/YY" maxLength={5} value={form.expiry} onChange={e => upd("expiry", e.target.value)} />
            </div>
            <div>
              <label className="text-gray-500 text-xs mb-1.5 block">CVV</label>
              <input className={inputCls} placeholder="•••" maxLength={4} value={form.cvv} onChange={e => upd("cvv", e.target.value)} />
            </div>
          </div>
        </>
      ) : (
        /* International & Nepal Specific Wallets */
        <div className="space-y-3">
          <label className="text-gray-500 text-xs mb-1.5 block">Select Provider</label>
          <div className="grid grid-cols-2 gap-3">
            {['PayPal', 'eSewa', 'Khalti', 'Payoneer'].map((wallet) => (
              <button
                key={wallet}
                onClick={() => upd("walletType", wallet)}
                className={`p-4 border-2 rounded-2xl flex flex-col items-center gap-2 transition-all ${form.walletType === wallet ? 'border-violet-500 bg-violet-50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <span className="text-lg">{wallet === 'eSewa' ? '🟢' : wallet === 'Khalti' ? '🟣' : '🌐'}</span>
                <span className="text-xs font-bold text-gray-700">{wallet}</span>
              </button>
            ))}
          </div>
          <div className="mt-4">
            <label className="text-gray-500 text-xs mb-1.5 block">{form.walletType || 'Wallet'} ID / Email</label>
            <input className={inputCls} placeholder="user@email.com or 98XXXXXXXX" value={form.walletId} onChange={e => upd("walletId", e.target.value)} />
          </div>
        </div>
      )}
    </div>

    <div className="flex gap-3 mt-8">
      <button onClick={() => setStep(0)} className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 font-semibold py-3.5 rounded-2xl transition-all cursor-pointer">← Back</button>
      <button onClick={() => setStep(2)} className="flex-[2] bg-gradient-to-r from-orange-500 to-rose-500 text-white font-black py-4 rounded-2xl hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-orange-200 cursor-pointer">
        Review Order →
      </button>
    </div>
  </div>
)}

            {/* STEP 2 — Confirm */}
            {step === 2 && (
              <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                <h2 className="text-gray-900 font-black text-xl mb-6">Confirm Your Order</h2>
                <div className="space-y-3 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 text-sm font-semibold line-clamp-1">{item.name}</p>
                        <p className="text-gray-400 text-xs">×{item.qty}</p>
                      </div>
                      <span className="text-gray-900 font-bold text-sm">Rs{(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 space-y-2 text-sm mb-6">
                  <div className="flex justify-between text-gray-500"><span>Subtotal</span><span className="text-gray-900 font-semibold">${cartTotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-gray-500"><span>Shipping</span><span className={shipping === 0 ? "text-emerald-600 font-semibold" : "text-gray-900 font-semibold"}>{shipping === 0 ? "FREE" : `RS${shipping.toFixed(2)}`}</span></div>
                  <div className="flex justify-between text-gray-500"><span>Tax</span><span className="text-gray-900 font-semibold">${tax.toFixed(2)}</span></div>
                  <div className="flex justify-between text-gray-900 font-black text-lg pt-2 border-t border-gray-200">
                    <span>Total</span><span className="text-orange-500">Rs{total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 font-semibold py-3.5 rounded-2xl transition-all cursor-pointer">← Back</button>
                  <button onClick={placeOrder} className="flex-[2] bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black py-4 rounded-2xl hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-emerald-200 cursor-pointer">
                    Place Order 🚀
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary sidebar */}
          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 h-fit sticky top-24">
            <h3 className="text-gray-900 font-black mb-4">Your Items</h3>
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 shadow-sm">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 text-xs font-semibold line-clamp-1">{item.name}</p>
                    <p className="text-gray-400 text-[10px]">×{item.qty}</p>
                  </div>
                  <span className="text-gray-600 text-xs font-semibold">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between text-gray-900 font-black">
              <span>Total</span>
              <span className="text-orange-500">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
