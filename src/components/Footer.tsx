"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { submitNewsletterAction } from "@/app/actions/productActions";
import {
  Mail, Phone, MapPin, CheckCircle, ShieldCheck, Heart,
  Leaf, Send, ArrowRight, Award, Truck, RefreshCw, Lock
} from "lucide-react";
// Social icons from react-icons
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import logo from "@/app/assests/logo.png";

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
      setTimeout(() => setSubscribed(false), 5000);
    }
    setLoading(false);
  };

  const trustFeatures = [
    { icon: Truck, title: "Free Shipping", desc: "On orders above ₹500" },
    { icon: RefreshCw, title: "Easy Returns", desc: "7-day return policy" },
    { icon: Lock, title: "Secure Payment", desc: "100% protected" },
    { icon: Award, title: "Premium Quality", desc: "GMP certified" },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaXTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-darkText via-[#0a1a0c] to-[#050d06] text-gray-300 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-secondary blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary blur-3xl" />
      </div>

      {/* Trust Features Strip */}
      <div className="relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300 border border-secondary/20">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{feature.title}</h4>
                  <p className="text-xs text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* Newsletter Hero */}
        <div className="relative mb-16 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/10 border border-white/10 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
          </div>
          <div className="relative px-6 md:px-12 py-10 md:py-12 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-xs font-semibold mb-4">
                <Leaf className="w-3.5 h-3.5" />
                Join Our Wellness Community
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-serif leading-tight mb-2">
                Get 15% Off Your First Order
              </h3>
              <p className="text-sm text-gray-300">
                Subscribe for expert Ayurvedic tips, exclusive offers, and seasonal wellness guides.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full">
              {subscribed ? (
                <div className="flex items-center justify-center gap-2 bg-secondary/20 text-secondary border border-secondary/40 px-6 py-4 rounded-2xl text-sm font-semibold backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5" />
                  Welcome aboard! Check your inbox 🌱
                </div>
              ) : (
                <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-full p-1.5 border border-white/20 focus-within:border-secondary/50 transition-all">
                  <Mail className="absolute left-5 w-4 h-4 text-secondary" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 pl-12 pr-2 py-3 bg-transparent text-sm text-white placeholder:text-gray-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-5 md:px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-secondary to-secondary-dark text-white hover:shadow-glow transition-all duration-300 disabled:opacity-60"
                  >
                    {loading ? "Joining..." : (
                      <>
                        Subscribe
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              )}
              <p className="text-[11px] text-gray-400 mt-3 text-center">
                🔒 We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">

          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 space-y-5">
            <Link href="/" className="inline-block bg-white/95 px-4 py-2 rounded-xl">
              <Image src={logo} alt="ReaTure" className="w-auto h-9" />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Bridging ancient Ayurvedic wisdom with modern wellness. Premium, clinically validated, 100% natural healthcare for the modern soul.
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { icon: ShieldCheck, label: "GMP Certified" },
                { icon: CheckCircle, label: "USDA Organic" },
                { icon: Heart, label: "100% Vegan" },
              ].map((cert, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white/5 border border-white/10 text-secondary hover:bg-secondary/10 hover:border-secondary/30 transition-all"
                >
                  <cert.icon className="w-3.5 h-3.5" />
                  {cert.label}
                </span>
              ))}
            </div>

            {/* Social Icons - Using react-icons */}
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-secondary hover:text-white hover:border-secondary hover:scale-110 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h4 className="font-bold text-white text-sm font-serif relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-secondary">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/shop", label: "Shop All" },
                { href: "/about", label: "Our Story" },
                { href: "/resources", label: "Resources" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-secondary transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-secondary" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div className="col-span-1 md:col-span-3 space-y-4">
            <h4 className="font-bold text-white text-sm font-serif relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-secondary">
              Collections
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/shop?category=immunity-boosters", label: "Immunity Boosters" },
                { href: "/shop?category=ayurvedic-medicines", label: "Ayurvedic Medicines" },
                { href: "/shop?category=skin-care", label: "Natural Skin Care" },
                { href: "/shop?category=digestive-care", label: "Digestive Wellness" },
                { href: "/shop?category=herbal-supplements", label: "Herbal Supplements" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-secondary transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-secondary" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-3 space-y-4">
            <h4 className="font-bold text-white text-sm font-serif relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-secondary">
              Get In Touch
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-secondary group-hover:bg-secondary/10 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-gray-400 leading-relaxed pt-1">
                  Agra- Mathura Bypass Road, in front of Rehmatpur Garmai, near Kamalpur, Chauraha, Aligarh, Kamalpur, Uttar Pradesh 202001
                </span>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 group hover:text-secondary transition-colors"
                >
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-secondary group-hover:bg-secondary/10 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 uppercase tracking-wider">Call Us</p>
                    <p className="text-gray-300 group-hover:text-secondary font-semibold">+91 080067 62121</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@reatureorganic.com"
                  className="flex items-center gap-3 group hover:text-secondary transition-colors"
                >
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-secondary group-hover:bg-secondary/10 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 uppercase tracking-wider">Email</p>
                    <p className="text-gray-300 group-hover:text-secondary font-semibold text-xs">
                      Care@Reature.In
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-gray-500 text-center md:text-left">
            <p className="font-medium">
              © {new Date().getFullYear()} <span className="text-secondary font-bold">ReaTure Organic</span>. All rights reserved.
            </p>
            <p className="mt-1 text-gray-600 max-w-2xl">
              *Statements have not been evaluated by the FDA. Consult a physician for clinical conditions.
            </p>
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mr-1">
              Secure Pay:
            </span>
            {[
              { label: "UPI", color: "text-white bg-white/10" },
              { label: "VISA", color: "text-blue-300 bg-blue-500/10" },
              { label: "RPay", color: "text-yellow-400 bg-yellow-500/10" },
              { label: "COD", color: "text-secondary bg-secondary/10" },
            ].map((pay) => (
              <span
                key={pay.label}
                className={`text-[10px] font-bold px-2 py-1 rounded ${pay.color} border border-white/5`}
              >
                {pay.label}
              </span>
            ))}
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-gray-500">
          {["Privacy Policy", "Terms of Service", "Refund Policy", "Shipping Info", "FAQ"].map((link) => (
            <Link key={link} href="#" className="hover:text-secondary transition-colors">
              {link}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
