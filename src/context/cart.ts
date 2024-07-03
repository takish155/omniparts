import { StaticImageData } from "next/image";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Cart {
  id: string;
  quantity: number;
  productName: string;
  productPrice: number;
  image: string | StaticImageData;
  slug: string;
}

interface CartStore {
  products: Cart[];
  addProduct: (product: Cart, stock: number) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, quantity: number) => void;
  addQuantity: (id: string, stock: number) => void;
  lowerQuantity: (id: string, stock: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product: Cart, stock: number) =>
        set((state) => {
          const index = state.products.findIndex((p) => p.id === product.id);
          if (index !== -1) {
            if (state.products[index].quantity < stock) {
              state.products[index].quantity += 1;
              return { products: [...state.products] };
            }
            state.products[index].quantity = stock;
            return { products: [...state.products] };
          }
          return { products: [...state.products, { ...product, quantity: 1 }] };
        }),
      removeProduct: (id: string) =>
        set((state) => {
          const index = state.products.findIndex((p) => p.id === id);
          if (index !== -1) {
            state.products.splice(index, 1);
            return { products: [...state.products] };
          }
          return { products: [...state.products] };
        }),
      updateProduct: (id: string, quantity: number) =>
        set((state) => {
          const index = state.products.findIndex((p) => p.id === id);
          if (index !== -1) {
            state.products[index].quantity = quantity;
            return { products: [...state.products] };
          }
          state.products[index].quantity = quantity;
          return { products: [...state.products] };
        }),
      clearCart: () => set({ products: [] }),
      addQuantity: (id: string, stock: number) =>
        set((state) => {
          const index = state.products.findIndex((p) => p.id === id);
          if (index !== -1) {
            if (state.products[index].quantity < stock) {
              state.products[index].quantity += 1;
              return { products: [...state.products] };
            }
            state.products[index].quantity = stock;
            return { products: [...state.products] };
          }
          return { products: [...state.products] };
        }),
      lowerQuantity: (id: string, stock: number) =>
        set((state) => {
          const index = state.products.findIndex((p) => p.id === id);
          if (index !== -1) {
            if (state.products[index].quantity > 1) {
              if (state.products[index].quantity - 1 > stock) {
                state.products[index].quantity = stock;
                return { products: [...state.products] };
              }
              state.products[index].quantity -= 1;
              return { products: [...state.products] };
            }
            state.products.splice(index, 1);
            return { products: [...state.products] };
          }
          return { products: [...state.products] };
        }),
    }),
    { name: "cart-store" }
  )
);
