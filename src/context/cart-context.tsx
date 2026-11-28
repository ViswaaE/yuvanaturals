"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { products } from "@/constants/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoredCartItem {
  productId: string;
  slug?: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
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
  isHydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Storage keys - isolated per browser/device guest session
const STORAGE_KEY_CART = "yuva_naturals_cart_v2";
const STORAGE_KEY_COUPON = "yuva_naturals_coupon_v2";
const LEGACY_STORAGE_KEY_CART = "yuva_naturals_cart_v1";
const LEGACY_STORAGE_KEY_COUPON = "yuva_naturals_coupon_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Strictly empty cart by default for all new visitors
  const [cart, setCart] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Initialize from localStorage on client mount (safe client-side hydration)
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // Safely remove legacy test cart data from previous versions
        try {
          if (localStorage.getItem(LEGACY_STORAGE_KEY_CART)) {
            localStorage.removeItem(LEGACY_STORAGE_KEY_CART);
          }
          if (localStorage.getItem(LEGACY_STORAGE_KEY_COUPON)) {
            localStorage.removeItem(LEGACY_STORAGE_KEY_COUPON);
          }
        } catch {
          // Ignore storage access restrictions (e.g. private browsing mode)
        }

        const savedCart = localStorage.getItem(STORAGE_KEY_CART);
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const validatedCart: CartItem[] = [];

            for (const rawItem of parsed) {
              if (!rawItem || !rawItem.productId) continue;

              const storedProductId = String(rawItem.productId);
              const storedSize = rawItem.size ? String(rawItem.size) : undefined;
              const storedQty = Math.max(1, parseInt(rawItem.quantity, 10) || 1);

              // Look up base product from central product catalog
              const matchedProduct = products.find((p) => {
                if (p.id === storedProductId) return true;
                if (storedProductId.startsWith(`${p.id}-`)) return true;
                if (rawItem.slug && p.slug === rawItem.slug) return true;
                return false;
              });

              // Skip if product no longer exists in catalog
              if (!matchedProduct) continue;

              // Always retrieve latest product price and variant details from catalog
              let resolvedPrice = matchedProduct.price;
              let resolvedOriginalPrice = matchedProduct.originalPrice;
              let resolvedSize = storedSize || matchedProduct.size;

              if (matchedProduct.sizeOptions && matchedProduct.sizeOptions.length > 0) {
                const matchedOption = matchedProduct.sizeOptions.find(
                  (opt) =>
                    opt.size === storedSize ||
                    storedProductId.endsWith(`-${opt.size}`)
                );
                if (matchedOption) {
                  resolvedPrice = matchedOption.price;
                  resolvedOriginalPrice = matchedOption.originalPrice;
                  resolvedSize = matchedOption.size;
                } else {
                  resolvedPrice = matchedProduct.sizeOptions[0].price;
                  resolvedOriginalPrice = matchedProduct.sizeOptions[0].originalPrice;
                  resolvedSize = matchedProduct.sizeOptions[0].size;
                }
              }

              const liveProduct: Product = {
                ...matchedProduct,
                id: storedProductId,
                name: matchedProduct.name,
                image: matchedProduct.image,
                price: resolvedPrice, // Catalog price takes priority over stale cached price
                originalPrice: resolvedOriginalPrice,
                size: resolvedSize,
              };

              validatedCart.push({
                product: liveProduct,
                quantity: storedQty,
              });
            }

            setCart(validatedCart);
          } else {
            setCart([]);
          }
        } else {
          // New visitor on this device/browser starts with an empty cart
          setCart([]);
        }

        const savedCoupon = localStorage.getItem(STORAGE_KEY_COUPON);
        if (savedCoupon) {
          const parsedCoupon = JSON.parse(savedCoupon);
          if (parsedCoupon && parsedCoupon.applied) {
            setCouponCode(parsedCoupon.code || "YUVA15");
            setCouponApplied(true);
          }
        }
      }
    } catch {
      // In case of parsing error, safely reset to empty cart
      setCart([]);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync visitor's cart to their browser localStorage on state changes after initial hydration
  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (cart.length === 0) {
        localStorage.removeItem(STORAGE_KEY_CART);
      } else {
        const itemsToStore: StoredCartItem[] = cart.map((item) => ({
          productId: item.product.id,
          slug: item.product.slug,
          name: item.product.name,
          image: item.product.image,
          price: item.product.price,
          quantity: item.quantity,
          size: item.product.size,
        }));
        localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(itemsToStore));
      }
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart, isHydrated]);

  // Sync coupon to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (!couponApplied) {
        localStorage.removeItem(STORAGE_KEY_COUPON);
      } else {
        localStorage.setItem(
          STORAGE_KEY_COUPON,
          JSON.stringify({ code: couponCode, applied: couponApplied })
        );
      }
    } catch (e) {
      console.error("Failed to save coupon to localStorage", e);
    }
  }, [couponCode, couponApplied, isHydrated]);

  // Actions
  const addToCart = (product: Product, quantity = 1) => {
    const safeQty = Math.max(1, Math.floor(quantity));
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + safeQty,
        };
        return updated;
      }
      return [...prevCart, { product, quantity: safeQty }];
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
    const safeQty = Math.floor(newQuantity);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: safeQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem(STORAGE_KEY_CART);
    } catch (e) {
      console.error("Failed to clear cart in localStorage", e);
    }
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
    try {
      localStorage.removeItem(STORAGE_KEY_COUPON);
    } catch (e) {
      console.error("Failed to remove coupon in localStorage", e);
    }
  };

  // Calculations
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const rawSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discountAmount = couponApplied ? Math.round(rawSubtotal * 0.15) : 0;

  // No delivery charges calculated or added anywhere
  const shippingCost = 0;

  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

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
        isHydrated,
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
