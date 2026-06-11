
interface ProductImageGalleryProps {
  images: string[]
  alt: string
  sku: string
}

export function ProductImageGallery({ alt, sku }: ProductImageGalleryProps) {
  const customImage = localStorage.getItem(`bluemont_custom_image_${sku}`)

  return (
    <div className="flex flex-col gap-3">
      {customImage ? (
        <div className="aspect-square overflow-hidden rounded-2xl border border-neutral-border bg-white p-6">
          <img
            src={customImage}
            alt={alt}
            className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-square flex flex-col items-center justify-center rounded-2xl border border-neutral-border bg-neutral-bg p-10 text-center">
          <div className="rounded-full bg-brand-donaldson/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-donaldson mb-4">
            Genuine Part
          </div>
          <h2 className="font-display text-3xl font-bold text-neutral-text leading-tight">
            {alt}
          </h2>
          <div className="mt-4 flex flex-col items-center gap-1">
            <span className="text-sm font-medium text-neutral-muted uppercase tracking-widest">Part Number</span>
            <span className="font-mono text-xl font-bold text-brand-donaldson">
              {sku}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
