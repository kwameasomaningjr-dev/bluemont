import { useState, useMemo, useRef } from 'react'
import { useProductStore } from '../../store/productStore'
import { useUIStore } from '../../store/uiStore'
import { 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Plus,
  Package,
  Upload,
  X,
  Save
} from 'lucide-react'
import type { Product } from '../../types'
import { slugify } from '../../lib/utils'

export default function AdminInventory() {
  const addToast = useUIStore((state) => state.addToast)
  const products = useProductStore((state) => state.products)
  const addProduct = useProductStore((state) => state.addProduct)
  const updateProduct = useProductStore((state) => state.updateProduct)
  const deleteProduct = useProductStore((state) => state.deleteProduct)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('all')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeSku, setActiveSku] = useState<string | null>(null)
  
  // Modal States
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    brand: 'donaldson',
    category: 'air-filters',
    price: 0,
    stockStatus: 'in_stock',
    buyNowEnabled: true,
    quoteEnabled: true,
    images: ['placeholder'],
    specs: {},
    tags: []
  })

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.sku.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesBrand = selectedBrand === 'all' || p.brand === selectedBrand
      return matchesSearch && matchesBrand
    })
  }, [products, searchTerm, selectedBrand])

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProduct) {
      updateProduct(editingProduct)
      addToast({
        id: Date.now().toString(),
        type: 'success',
        message: `Changes saved successfully for ${editingProduct.sku}.`,
      })
      setEditingProduct(null)
    }
  }

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProduct.name || !newProduct.sku) {
      addToast({ id: 'err', type: 'error', message: 'Name and SKU are required' })
      return
    }

    const productToAdd: Product = {
      ...newProduct as Product,
      id: `prod-${Date.now()}`,
      slug: slugify(newProduct.name),
      isFeatured: false,
    }

    addProduct(productToAdd)
    addToast({
      id: Date.now().toString(),
      type: 'success',
      message: `Product ${productToAdd.sku} added successfully.`,
    })
    setIsAdding(false)
    setNewProduct({
      brand: 'donaldson',
      category: 'air-filters',
      price: 0,
      stockStatus: 'in_stock',
      buyNowEnabled: true,
      quoteEnabled: true,
      images: ['placeholder'],
      specs: {},
      tags: []
    })
  }

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteProduct(id)
      addToast({ id: 'del', type: 'info', message: 'Product removed.' })
    }
  }

  const triggerUpload = (sku: string) => {
    setActiveSku(sku)
    fileInputRef.current?.click()
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !activeSku) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      localStorage.setItem(`bluemont_custom_image_${activeSku}`, base64String)
      addToast({
        id: Date.now().toString(),
        type: 'success',
        message: `Image uploaded successfully for SKU ${activeSku}.`,
      })
      setActiveSku(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileUpload} 
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-text">Product Inventory</h1>
          <p className="mt-1 text-sm text-neutral-muted">Update pricing (EUR), stock levels, and product details.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-brand-donaldson px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-donaldson/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-2xl border border-neutral-border bg-neutral-surface p-4 shadow-sm lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-muted" size={18} />
          <input
            type="text"
            placeholder="Search by SKU or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-neutral-border bg-neutral-bg py-2 pl-10 pr-4 text-sm outline-none focus:border-brand-donaldson"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-neutral-muted" />
          <select 
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2 text-sm outline-none focus:border-brand-donaldson"
          >
            <option value="all">All Brands</option>
            <option value="donaldson">Donaldson</option>
            <option value="yuko">Yuko</option>
            <option value="eurocar">Eurocar</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-border bg-neutral-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-neutral-bg border-b border-neutral-border text-xs font-bold uppercase tracking-wider text-neutral-muted">
              <tr>
                <th className="px-6 py-4">Product / SKU</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Price (EUR)</th>
                <th className="px-6 py-4">Stock Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-border">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-bg/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-neutral-text">{product.name}</span>
                      <span className="font-mono text-[10px] text-neutral-muted">{product.sku}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      product.brand === 'donaldson' ? 'bg-brand-donaldson/10 text-brand-donaldson' :
                      product.brand === 'yuko' ? 'bg-brand-yuko/10 text-brand-yuko' :
                      'bg-brand-eurocar/10 text-brand-eurocar'
                    }`}>
                      {product.brand}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-neutral-text">
                      €{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      product.stockStatus === 'in_stock' ? 'bg-status-success/10 text-status-success' :
                      product.stockStatus === 'low_stock' ? 'bg-status-warning/10 text-status-warning' :
                      'bg-status-danger/10 text-status-danger'
                    }`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${
                        product.stockStatus === 'in_stock' ? 'bg-status-success' :
                        product.stockStatus === 'low_stock' ? 'bg-status-warning' :
                        'bg-status-danger'
                      }`} />
                      {product.stockStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => triggerUpload(product.sku)}
                        title="Upload Product Image"
                        className="rounded-lg p-2 text-neutral-muted hover:bg-neutral-bg hover:text-brand-donaldson transition-colors"
                      >
                        <Upload size={16} />
                      </button>
                      <button 
                        onClick={() => setEditingProduct(product)}
                        title="Edit Product"
                        className="rounded-lg p-2 text-neutral-muted hover:bg-neutral-bg hover:text-brand-donaldson transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id, product.name)}
                        title="Delete Product"
                        className="rounded-lg p-2 text-neutral-muted hover:bg-neutral-bg hover:text-status-danger transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Package size={48} className="text-neutral-border mb-4" />
            <p className="text-sm text-neutral-muted">No products found matching your search.</p>
          </div>
        )}

        <div className="border-t border-neutral-border bg-neutral-bg/50 px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-neutral-muted">
            Showing <span className="font-bold">{filteredProducts.length}</span> of <span className="font-bold">{products.length}</span> products
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setEditingProduct(null)} />
          <div className="relative w-full max-w-lg rounded-3xl bg-neutral-surface shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-neutral-border px-6 py-4">
              <h2 className="font-display text-xl font-bold text-neutral-text">Edit Product</h2>
              <button onClick={() => setEditingProduct(null)} className="rounded-lg p-2 text-neutral-muted hover:bg-neutral-bg transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-muted">SKU / Part Number</label>
                  <input 
                    type="text" 
                    value={editingProduct.sku}
                    onChange={(e) => setEditingProduct({...editingProduct, sku: e.target.value})}
                    className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-muted">Brand</label>
                  <select 
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({...editingProduct, brand: e.target.value as any})}
                    className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
                  >
                    <option value="donaldson">Donaldson</option>
                    <option value="yuko">Yuko</option>
                    <option value="eurocar">Eurocar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-muted">Product Name</label>
                <input 
                  type="text" 
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-muted">Price (EUR)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                    className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-muted">Stock Status</label>
                  <select 
                    value={editingProduct.stockStatus}
                    onChange={(e) => setEditingProduct({...editingProduct, stockStatus: e.target.value as any})}
                    className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="low_stock">Low Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-6 py-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={editingProduct.buyNowEnabled}
                    onChange={(e) => setEditingProduct({...editingProduct, buyNowEnabled: e.target.checked})}
                    className="rounded border-neutral-border text-brand-donaldson focus:ring-brand-donaldson"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-text">Enable Buy Now</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={editingProduct.quoteEnabled}
                    onChange={(e) => setEditingProduct({...editingProduct, quoteEnabled: e.target.checked})}
                    className="rounded border-neutral-border text-brand-donaldson focus:ring-brand-donaldson"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-text">Enable Quotes</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 rounded-full border border-neutral-border px-6 py-3 text-sm font-bold text-neutral-text transition hover:bg-neutral-bg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 rounded-full bg-brand-donaldson px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-donaldson/90 shadow-lg shadow-brand-donaldson/20"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsAdding(false)} />
          <div className="relative w-full max-w-lg rounded-3xl bg-neutral-surface shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-neutral-border px-6 py-4">
              <h2 className="font-display text-xl font-bold text-neutral-text">Add New Product</h2>
              <button onClick={() => setIsAdding(false)} className="rounded-lg p-2 text-neutral-muted hover:bg-neutral-bg transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddNew} className="p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-muted">SKU / Part Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g. P181057"
                    value={newProduct.sku || ''}
                    onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                    className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-muted">Brand</label>
                  <select 
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({...newProduct, brand: e.target.value as any})}
                    className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
                  >
                    <option value="donaldson">Donaldson</option>
                    <option value="yuko">Yuko</option>
                    <option value="eurocar">Eurocar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-muted">Product Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Donaldson Air Filter"
                  value={newProduct.name || ''}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-muted">Price (EUR)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    value={newProduct.price || ''}
                    onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                    className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-muted">Stock Status</label>
                  <select 
                    value={newProduct.stockStatus}
                    onChange={(e) => setNewProduct({...newProduct, stockStatus: e.target.value as any})}
                    className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="low_stock">Low Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 rounded-full border border-neutral-border px-6 py-3 text-sm font-bold text-neutral-text transition hover:bg-neutral-bg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 rounded-full bg-brand-donaldson px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-donaldson/90 shadow-lg shadow-brand-donaldson/20"
                >
                  <Plus size={18} />
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
