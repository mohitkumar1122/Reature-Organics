"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { getCurrentUserAction, logoutAction } from "@/app/actions/authActions";
import { Search, ShoppingBag, User, Heart, Menu, X, LogOut, ChevronDown, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "@/app/assests/logo.png";

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart } = useCart();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Initialize and check user session
  useEffect(() => {
    async function checkUser() {
      const user = await getCurrentUserAction();
      setCurrentUser(user);
    }
    checkUser();
  }, [searchParams]); // re-verify on navigation changes

  // Listen to scrolling to add rich header backgrounds
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-md py-3`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            {/* <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
              <span className="font-serif text-xl font-bold">🌿</span>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-darkText font-serif block">
                Reature <span className="text-primary font-sans">Organic</span>
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block -mt-1 font-semibold">
                Pure Ayurveda
              </span>
            </div> */}
            <Image src={logo} alt="Logo" className="w-auto h-10" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-darkText">
            <Link href="/shop" className="hover:text-primary transition-colors duration-200">
              Shop
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors duration-200">
              About Us
            </Link>
            <Link href="/resources" className="hover:text-primary transition-colors duration-200">
              Resources
            </Link>
            <Link href="/blog" className="hover:text-primary transition-colors duration-200">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors duration-200">
              Contact
            </Link>
          </nav>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-sm relative">
            <input
              type="text"
              placeholder="Search Ayurvedic medicines, wellness..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-primary bg-[#F8FAF7]/80 focus:bg-white transition-all duration-300"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-primary">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4">
            
            {/* Wishlist Link */}
            <Link href="/dashboard/wishlist" className="p-2 text-gray-600 hover:text-primary transition-colors relative hidden sm:block">
              <Heart className="w-5 h-5" />
            </Link>

            {/* Cart Icon */}
            <Link href="/cart" className="p-2 text-gray-600 hover:text-primary transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-secondary rounded-full">
                  {totalCartItems}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              {currentUser ? (
                <div>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-1.5 text-sm font-semibold text-darkText focus:outline-none p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline max-w-[80px] truncate">{currentUser.name}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 overflow-hidden"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-xs text-gray-400">Signed in as</p>
                          <p className="text-sm font-semibold truncate text-darkText">{currentUser.email}</p>
                        </div>

                        {currentUser.role === "admin" && (
                          <Link
                            href="/admin"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:bg-primary-light transition-colors font-medium"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            Admin Console
                          </Link>
                        )}

                        <Link
                          href="/dashboard"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          My Profile
                        </Link>
                        <Link
                          href="/dashboard/orders"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          My Orders
                        </Link>
                        <Link
                          href="/dashboard/wishlist"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          My Wishlist
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-bold bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Login / Signup
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-primary transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-100 shadow-inner overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              <form onSubmit={handleSearchSubmit} className="relative flex w-full my-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-primary"
                />
                <button type="submit" className="absolute right-3 top-2.5 text-gray-400">
                  <Search className="w-4 h-4" />
                </button>
              </form>
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-base font-medium text-darkText hover:text-primary"
              >
                Shop Catalog
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-base font-medium text-darkText hover:text-primary"
              >
                About Us
              </Link>
              <Link
                href="/resources"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-base font-medium text-darkText hover:text-primary"
              >
                Resources
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-base font-medium text-darkText hover:text-primary"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-base font-medium text-darkText hover:text-primary"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
