"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUserAction } from "@/app/actions/authActions";
import { getCartAction, addToCartAction, updateCartItemAction, syncCartAction, clearCartAction } from "@/app/actions/cartActions";
import { validateCouponAction } from "@/app/actions/orderActions";

interface CartItem {
  product: {
    _id: string;
    title: string;
    slug: string;
    price: number;
    discountPercentage: number;
    images: string[];
    stock: number;
    brand: string;
  };
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  subtotal: number;
  discount: number;
  couponCode: string;
  tax: number;
  shipping: number;
  total: number;
  loading: boolean;
  addToCart: (product: any, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  syncCartWithDb: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  // Check auth and load cart
  useEffect(() => {
    const initCart = async () => {
      try {
        const user = await getCurrentUserAction();
        if (user) {
          setIsUserLoggedIn(true);
          const dbCart = await getCartAction();
          setCart(dbCart);
        } else {
          setIsUserLoggedIn(false);
          const localCart = localStorage.getItem("reature_organic_cart");
          if (localCart) {
            setCart(JSON.parse(localCart));
          }
        }
      } catch (e) {
        console.error("Failed to initialize cart:", e);
      } finally {
        setLoading(false);
      }
    };
    initCart();
  }, []);

  // Sync guest cart to local storage
  const saveGuestCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("reature_organic_cart", JSON.stringify(newCart));
  };

  const syncCartWithDb = async () => {
    try {
      const user = await getCurrentUserAction();
      if (user) {
        setIsUserLoggedIn(true);
        // Sync local storage cart to database
        const localCart = localStorage.getItem("reature_organic_cart");
        if (localCart) {
          const items = JSON.parse(localCart).map((item: any) => ({
            product: item.product._id,
            quantity: item.quantity,
          }));
          if (items.length > 0) {
            await syncCartAction(items);
            localStorage.removeItem("reature_organic_cart");
          }
        }
        const dbCart = await getCartAction();
        setCart(dbCart);
      }
    } catch (e) {
      console.error("Failed to sync cart:", e);
    }
  };

  const addToCart = async (product: any, quantity: number = 1) => {
    const discountedPrice = product.price * (1 - product.discountPercentage / 100);
    const simplifiedProduct = {
      _id: product._id,
      title: product.title,
      slug: product.slug,
      price: product.price,
      discountPercentage: product.discountPercentage,
      images: product.images,
      stock: product.stock,
      brand: product.brand,
    };

    if (isUserLoggedIn) {
      setLoading(true);
      await addToCartAction(product._id, quantity);
      const dbCart = await getCartAction();
      setCart(dbCart);
      setLoading(false);
    } else {
      const newCart = [...cart];
      const existingIdx = newCart.findIndex((item) => item.product._id === product._id);
      if (existingIdx > -1) {
        newCart[existingIdx].quantity += quantity;
      } else {
        newCart.push({ product: simplifiedProduct, quantity });
      }
      saveGuestCart(newCart);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (isUserLoggedIn) {
      setLoading(true);
      await updateCartItemAction(productId, quantity);
      const dbCart = await getCartAction();
      setCart(dbCart);
      setLoading(false);
    } else {
      let newCart = [...cart];
      const idx = newCart.findIndex((item) => item.product._id === productId);
      if (idx > -1) {
        if (quantity <= 0) {
          newCart.splice(idx, 1);
        } else {
          newCart[idx].quantity = quantity;
        }
        saveGuestCart(newCart);
      }
    }
  };

  const removeItem = async (productId: string) => {
    await updateQuantity(productId, 0);
  };

  const clearCart = async () => {
    if (isUserLoggedIn) {
      setLoading(true);
      await clearCartAction();
      setCart([]);
      setLoading(false);
    } else {
      saveGuestCart([]);
    }
    setCouponCode("");
    setDiscount(0);
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => {
    const price = item.product.price * (1 - item.product.discountPercentage / 100);
    return acc + price * item.quantity;
  }, 0);

  // Recalculate coupon discount whenever subtotal changes
  useEffect(() => {
    if (couponCode && subtotal > 0) {
      const refreshCoupon = async () => {
        const res = await validateCouponAction(couponCode, subtotal);
        if (res.success && res.discount) {
          setDiscount(res.discount);
        } else {
          setCouponCode("");
          setDiscount(0);
        }
      };
      refreshCoupon();
    } else {
      setDiscount(0);
    }
  }, [subtotal, couponCode]);

  const applyCoupon = async (code: string) => {
    if (subtotal <= 0) {
      return { success: false, message: "Cart is empty" };
    }
    const res = await validateCouponAction(code, subtotal);
    if (res.success && res.discount) {
      setCouponCode(res.couponCode!);
      setDiscount(res.discount);
      return { success: true, message: "Coupon applied successfully!" };
    } else {
      return { success: false, message: res.message || "Failed to apply coupon." };
    }
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscount(0);
  };

  const taxableAmount = subtotal - discount;
  const tax = parseFloat((taxableAmount * 0.05).toFixed(2)); // 5% GST
  const shipping = taxableAmount > 500 || subtotal === 0 ? 0 : 50; // free above 500
  const total = parseFloat((taxableAmount + tax + shipping).toFixed(2));

  return (
    <CartContext.Provider
      value={{
        cart,
        subtotal,
        discount,
        couponCode,
        tax,
        shipping,
        total,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        applyCoupon,
        removeCoupon,
        syncCartWithDb,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
