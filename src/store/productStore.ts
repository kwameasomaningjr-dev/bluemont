import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { products as initialProducts } from '../data/products'
import type { Product } from '../types'

interface ProductStore {
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (productId: string) => void
  setProducts: (products: Product[]) => void
  bulkUpsert: (newProducts: Product[]) => void
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: initialProducts,
      
      addProduct: (product) => {
        set((state) => ({
          products: [product, ...state.products]
        }))
      },

      updateProduct: (updatedProduct) => {
        set((state) => ({
          products: state.products.map((p) => 
            p.id === updatedProduct.id ? updatedProduct : p
          )
        }))
      },

      deleteProduct: (productId) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId)
        }))
      },

      bulkUpsert: (incoming) => {
        set((state) => {
          const current = [...state.products]
          
          incoming.forEach((newItem) => {
            const index = current.findIndex((p) => p.sku === newItem.sku)
            if (index !== -1) {
              // Update existing
              current[index] = { ...current[index], ...newItem, id: current[index].id }
            } else {
              // Add new
              current.unshift(newItem)
            }
          })
          
          return { products: current }
        })
      },

      setProducts: (products) => set({ products }),
    }),
    {
      name: 'bluemont-products',
    }
  )
)
