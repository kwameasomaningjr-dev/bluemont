export type BrandSlug = 'donaldson' | 'yuko' | 'eurocar'

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock'

export interface Product {
  id: string
  brand: BrandSlug
  category: string
  name: string
  slug: string
  sku: string
  shortDescription: string
  description: string
  price: number
  compareAtPrice?: number
  stockStatus: StockStatus
  buyNowEnabled: boolean
  quoteEnabled: boolean
  isFeatured: boolean
  images: string[]
  specs: Record<string, string>
  tags: string[]
}

export interface Brand {
  name: string
  slug: BrandSlug
  tagline: string
  description: string
  colorPrimary: string
  categories: string[]
  heroImage: string
}

export interface Category {
  slug: string
  label: string
  description: string
  brand: BrandSlug
  icon: string
}

export type OrderStatus = 'delivered' | 'processing' | 'pending'

export interface OrderItem {
  productId: string
  name: string
  brand: BrandSlug
  qty: number
  price: number
}

export interface Order {
  id: string
  date: string
  items: OrderItem[]
  status: OrderStatus
  total: number
}

export interface CartItem {
  product: Product
  qty: number
}

export interface Toast {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
}

export interface FilterState {
  brands: BrandSlug[]
  categories: string[]
  priceMin: number
  priceMax: number
  inStockOnly: boolean
  sort: 'newest' | 'price_asc' | 'price_desc' | 'popularity'
}

export interface MockUser {
  name: string
  email: string
  accountType: string
}
