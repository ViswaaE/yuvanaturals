"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { products } from "@/constants/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  rawSubtotal: number;
  discountAmount: number;
  shippingCost: number;
  finalTotal: number;
  couponCode: string;
  couponApplied: boolean;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY_CART = "yuva_naturals_cart_v1";
const STORAGE_KEY_COUPON = "yuva_naturals_coupon_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Default initial items if no local storage
  const defaultInitialCart: CartItem[] = [
    { product: products[0], quantity: 1 }, // Goat Milk & Lavender Bath Bar
    { product: products[5], quantity: 1 }, // Red Wine Bath Bar
  ];

  const [cart, setCart] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Initialize from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY_CART);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        } else {
          setCart(defaultInitialCart);
        }
      } else {
        setCart(defaultInitialCart);
      }

      const savedCoupon = localStorage.getItem(STORAGE_KEY_COUPON);
      if (savedCoupon) {
        const parsedCoupon = JSON.parse(savedCoupon);
        if (parsedCoupon && parsedCoupon.applied) {
          setCouponCode(parsedCoupon.code || "YUVA15");
          setCouponApplied(true);
        }
      }
    } catch {
      setCart(defaultInitialCart);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to localStorage on state changes after initial hydration
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY_COUPON,
        JSON.stringify({ code: couponCode, applied: couponApplied })
      );
    } catch (e) {
      console.error("Failed to save coupon to localStorage", e);
    }
  }, [couponCode, couponApplied, isHydrated]);

  // Actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "YUVA15" || cleanCode.length > 0) {
      setCouponCode(cleanCode || "YUVA15");
      setCouponApplied(true);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setCouponCode("");
    setCouponApplied(false);
  };

  // Calculations
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const rawSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discountAmount = couponApplied ? Math.round(rawSubtotal * 0.15) : 0;

  // Free shipping over ₹500
  const shippingCost = rawSubtotal === 0 ? 0 : rawSubtotal >= 500 ? 0 : 50;

  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingCost);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        rawSubtotal,
        discountAmount,
        shippingCost,
        finalTotal,
        couponCode,
        couponApplied,
        applyCoupon,
        removeCoupon,
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
