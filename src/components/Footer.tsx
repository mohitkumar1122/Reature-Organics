"use client";

import React, { useState } from "react";
import Link from "next/link";
import { submitNewsletterAction } from "@/app/actions/productActions";
import { Mail, Phone, MapPin, CheckCircle, ShieldCheck, Heart } from "lucide-react";
import logo from "@/app/assests/logo.png";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const res = await submitNewsletterAction(email);
    if (res.success) {
      setSubscribed(true);
      setEmail("");
    }
    setLoading(false);
  };

  return (
    <footer className="bg-darkText text-gray-300 pt-16 pb-8 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top: Newsletter and Certification badges */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12 border-b border-gray-800">
          
          {/* Logo & Intro */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              {/* <span className="font-serif text-2xl font-bold text-white">
                Reature <span className="text-primary font-sans">Organic</span>
              </span> */}
              <Image src={logo} alt="Logo" className="w-auto h-10" />
              
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Connecting ancient Ayurvedic wisdom with modern life to provide premium, clinically validated, 100% natural healthcare products.
            </p>
            
            {/* Certifications badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-900 border border-gray-800 text-secondary">
                <ShieldCheck className="w-3.5 h-3.5" /> GMP Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-900 border border-gray-800 text-secondary">
                <CheckCircle className="w-3.5 h-3.5" /> USDA Organic
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-900 border border-gray-800 text-secondary">
                <Heart className="w-3.5 h-3.5" /> 100% Vegan
              </span>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-2 bg-gray-900 p-6 rounded-2xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white font-serif">Subscribe to Wellness</h3>
              <p className="text-sm text-gray-400">Receive expert tips, health remedies, and 15% off your first order.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-1 max-w-md w-full gap-2">
              {subscribed ? (
                <div className="bg-primary/20 text-primary border border-primary/30 px-4 py-2 rounded-full text-sm font-medium w-full text-center">
                  🌱 Welcome! You are now subscribed.
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-2.5 rounded-full text-sm bg-darkText text-white border border-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-full text-sm font-bold bg-primary text-white hover:bg-primary-dark transition-all duration-300 disabled:opacity-55"
                  >
                    {loading ? "Subscribing..." : "Join Us"}
                  </button>
                </>
              )}
            </form>
          </div>

        </div>

        {/* Middle: Footers grids */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-sm">
          
          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-serif">Quick Navigation</h4>
            <ul className="space-y-2.5">
              <li><Link href="/shop" className="hover:text-primary transition-colors">Shop All Products</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Story & Heritage</Link></li>
              <li><Link href="/resources" className="hover:text-primary transition-colors">Health Guides & Manuals</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Health & Wellness Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-serif">Popular Collections</h4>
            <ul className="space-y-2.5">
              <li><Link href="/shop?category=immunity-boosters" className="hover:text-primary transition-colors">Immunity Boosters</Link></li>
              <li><Link href="/shop?category=ayurvedic-medicines" className="hover:text-primary transition-colors">Ayurvedic Medicines</Link></li>
              <li><Link href="/shop?category=skin-care" className="hover:text-primary transition-colors">Natural Skin Care</Link></li>
              <li><Link href="/shop?category=digestive-care" className="hover:text-primary transition-colors">Digestive Wellness</Link></li>
              <li><Link href="/shop?category=herbal-supplements" className="hover:text-primary transition-colors">Herbal Supplements</Link></li>
            </ul>
          </div>

          {/* Customer Support policies */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-serif">Store Information</h4>
            <ul className="space-y-2.5 text-gray-400">
              <li>COD Support Available</li>
              <li>Free Shipping above Rs 500</li>
              <li>Secure SSL Checkout</li>
              <li>Easy 7-Days Returns</li>
              <li>GMP & FSSAI Standards</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-serif">Reach Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-400">108, Sacred Herbs Marg, DLF Phase 3, Gurugram, Haryana - 122002</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:support@reatureorganic.com" className="hover:text-primary transition-colors">support@reatureorganic.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            <p>© {new Date().getFullYear()} Reature Organic. All rights reserved.</p>
            <p className="mt-1 text-gray-600">Disclaimer: Ayurvedic products are formulated for natural wellness, and statements have not been evaluated by the FDA. Consult doctors for major clinical ailments.</p>
          </div>
          
          {/* Payment Badges Mocked */}
          <div className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-lg border border-gray-800">
            <span className="font-semibold tracking-wider text-[10px] text-gray-400 uppercase mr-2">Secure Payments:</span>
            <span className="text-white font-bold tracking-tight text-xs bg-gray-800 px-1.5 py-0.5 rounded">UPI</span>
            <span className="text-blue-400 font-bold italic text-xs bg-gray-800 px-1.5 py-0.5 rounded">VISA</span>
            <span className="text-yellow-500 font-semibold text-xs bg-gray-800 px-1.5 py-0.5 rounded">Rpay</span>
            <span className="text-green-500 font-bold text-xs bg-gray-800 px-1.5 py-0.5 rounded">COD</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
