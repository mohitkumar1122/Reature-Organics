"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { getCurrentUserAction, logoutAction } from "@/app/actions/authActions";
import {
  Search, ShoppingBag, User, Heart, Menu, X, LogOut,
  ChevronDown, ShieldCheck, Phone, Truck, Leaf, Package
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "@/app/assests/logo.png";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { cart } = useCart();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const user = await getCurrentUserAction();
      setCurrentUser(user);
    }
    checkUser();
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setProfileDropdownOpen(false);
    if (profileDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [profileDropdownOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await logoutAction();
    setCurrentUser(null);
    setProfileDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/resources", label: "Resources" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-primary via-primary-dark to-primary text-white text-xs py-2 px-4 hidden md:block relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-secondary" />
              Free Shipping on Orders Above ₹5000
            </span>
            <span className="flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-secondary" />
              100% Authentic Ayurveda
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-secondary transition-colors">
              <Phone className="w-3.5 h-3.5" />
             1800 8908 121
            </a>
            <Link href="/track-order" className="flex items-center gap-1.5 hover:text-secondary transition-colors">
              <Package className="w-3.5 h-3.5" />
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-soft py-2"
            : "bg-white py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="relative">
                <Image
                  src={logo}
                  alt="ReaTure Organic"
                  className="w-auto h-10 lg:h-11 transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg group ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-darkText hover:text-primary"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-secondary to-primary transition-all duration-300 ${
                      isActive(link.href) ? "w-6" : "w-0 group-hover:w-6"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className={`hidden md:flex flex-1 max-w-md relative transition-all duration-300 ${
                searchFocused ? "scale-[1.02]" : ""
              }`}
            >
              <div className={`relative w-full flex items-center bg-secondary-light/50 rounded-full transition-all duration-300 ${
                searchFocused ? "ring-2 ring-primary/30 bg-white shadow-soft" : "hover:bg-secondary-light"
              }`}>
                <Search className="absolute left-4 w-4 h-4 text-primary/60" />
                <input
                  type="text"
                  placeholder="Search herbs, oils, supplements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full pl-11 pr-24 py-2.5 bg-transparent text-sm text-darkText placeholder:text-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary-dark transition-all duration-300"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-2">

              {/* Wishlist */}
              <Link
                href="/dashboard/wishlist"
                className="p-2.5 text-darkText hover:text-primary hover:bg-secondary-light rounded-full transition-all duration-300 hidden sm:block group"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2.5 text-darkText hover:text-primary hover:bg-secondary-light rounded-full transition-all duration-300 group"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {totalCartItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 flex items-center justify-center px-1.5 text-[10px] font-bold text-white bg-gradient-to-br from-secondary to-secondary-dark rounded-full shadow-md ring-2 ring-white"
                  >
                    {totalCartItems}
                  </motion.span>
                )}
              </Link>

              {/* Profile / Auth */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                {currentUser ? (
                  <>
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="flex items-center gap-2 p-1 pr-2 sm:pr-3 rounded-full hover:bg-secondary-light transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="hidden md:inline text-sm font-semibold text-darkText max-w-[90px] truncate">
                        {currentUser.name.split(" ")[0]}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-gray-500 hidden md:block transition-transform duration-300 ${profileDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {profileDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden"
                        >
                          {/* Profile Header */}
                          <div className="px-4 py-3 bg-gradient-to-br from-primary-light to-secondary-light border-b border-gray-100">
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-bold shadow-md">
                                {currentUser.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-bold text-darkText truncate">{currentUser.name}</p>
                                <p className="text-xs text-gray-600 truncate">{currentUser.email}</p>
                              </div>
                            </div>
                          </div>

                          <div className="py-2">
                            {currentUser.role === "admin" && (
                              <Link
                                href="/admin"
                                onClick={() => setProfileDropdownOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-primary hover:bg-primary-light transition-colors font-semibold"
                              >
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                  <ShieldCheck className="w-4 h-4" />
                                </div>
                                Admin Console
                              </Link>
                            )}

                            {[
                              { href: "/dashboard", icon: User, label: "My Profile" },
                              { href: "/dashboard/orders", icon: ShoppingBag, label: "My Orders" },
                              { href: "/dashboard/wishlist", icon: Heart, label: "My Wishlist" },
                            ].map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setProfileDropdownOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-darkText hover:bg-secondary-light/60 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-secondary-light flex items-center justify-center text-primary">
                                  <item.icon className="w-4 h-4" />
                                </div>
                                {item.label}
                              </Link>
                            ))}
                          </div>

                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 font-medium"
                          >
                            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                              <LogOut className="w-4 h-4" />
                            </div>
                            Sign Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-glow hover:scale-105 transition-all duration-300"
                  >
                    <User className="w-4 h-4" />
                    Login
                  </Link>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 text-darkText hover:bg-secondary-light rounded-full transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 pt-4 pb-6 space-y-1">
                {/* Mobile Search */}
                <form onSubmit={handleSearchSubmit} className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-full bg-secondary-light/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </form>

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      isActive(link.href)
                        ? "bg-primary-light text-primary"
                        : "text-darkText hover:bg-secondary-light"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                  </Link>
                ))}

                {!currentUser && (
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 mt-4 px-4 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-primary to-primary-dark text-white shadow-md"
                  >
                    <User className="w-4 h-4" />
                    Login / Signup
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
