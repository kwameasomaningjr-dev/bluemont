import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { products } from '../data/products'
import { categories } from '../data/categories'
import { ROUTES } from '../constants/routes'
import { BrandBadge } from '../components/product/BrandBadge'
import { StockChip } from '../components/product/StockChip'
import { PriceDisplay } from '../components/product/PriceDisplay'
import { ProductImageGallery } from '../components/product/ProductImageGallery'
import { BuyOrQuoteCTA } from '../components/product/BuyOrQuoteCTA'
import { SpecsTable } from '../components/product/SpecsTable'
import { RelatedProducts } from '../components/product/RelatedProducts'
import { Breadcrumb } from '../components/utility/Breadcrumb'
import { BRAND_LABELS } from '../constants/brands'

const tabs = ['Description', 'Specifications', 'Compatibility', 'Warranty'] as const
type Tab = (typeof tabs)[number]

export default function ProductDetailPage() {
  const { slug } = useParams()
  const [activeTab, setActiveTab] = useState<Tab>('Description')

  const product = products.find((p) => p.slug === slug)
  if (!product) return <Navigate to={ROUTES.products} replace />

  const category = categories.find((c) => c.slug === product.category)

  return (
    <div className="mx-auto max-w-content px-4 py-8 lg:px-6">
      <Breadcrumb
        items={[
          { label: BRAND_LABELS[product.brand], to: ROUTES.brand(product.brand) },
          ...(category ? [{ label: category.label }] : []),
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductImageGallery images={product.images} alt={product.name} sku={product.sku} />

        <div className="flex flex-col gap-4">
          <BrandBadge brand={product.brand} />
          <h1 className="font-display text-2xl font-bold text-neutral-text sm:text-3xl">{product.name}</h1>
          <p className="font-mono text-sm text-neutral-muted">SKU / Part Number: {product.sku}</p>

          <div className="flex items-center gap-3">
            <PriceDisplay product={product} size="hero" />
            <StockChip status={product.stockStatus} />
          </div>

          <p className="text-sm leading-relaxed text-neutral-muted">{product.shortDescription}</p>

          <BuyOrQuoteCTA product={product} />
        </div>
      </div>

      <div className="mt-14">
        <div className="flex flex-wrap gap-2 border-b border-neutral-border">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`-mb-px border-b-2 px-4 py-3 text-sm font-medium transition ${
                activeTab === tab
                  ? 'border-brand-donaldson text-brand-donaldson'
                  : 'border-transparent text-neutral-muted hover:text-neutral-text'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="py-6">
          {activeTab === 'Description' && (
            <p className="max-w-3xl text-sm leading-relaxed text-neutral-text">{product.description}</p>
          )}
          {activeTab === 'Specifications' && <SpecsTable specs={product.specs} />}
          {activeTab === 'Compatibility' && (
            <p className="max-w-3xl text-sm leading-relaxed text-neutral-text">
              This {product.name} is compatible with the makes and models listed in the {BRAND_LABELS[product.brand]}{' '}
              fitment guide. Contact our team via WhatsApp with your vehicle or equipment details and we will confirm
              fitment before you order.
            </p>
          )}
          {activeTab === 'Warranty' && (
            <p className="max-w-3xl text-sm leading-relaxed text-neutral-text">
              All genuine {BRAND_LABELS[product.brand]} products sold by Bluemont Engineering Services are covered by
              the manufacturer&rsquo;s standard warranty against manufacturing defects. Keep your receipt as proof of
              purchase — our team can assist with any warranty claims at our Tema service centre.
            </p>
          )}
        </div>
      </div>

      <div className="mt-10">
        <RelatedProducts product={product} />
      </div>
    </div>
  )
}
