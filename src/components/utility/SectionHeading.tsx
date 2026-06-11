interface SectionHeadingProps {
  label?: string
  heading: string
  subtext?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ label, heading, subtext, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      {label && (
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-donaldson">{label}</p>
      )}
      <h2 className="mt-1 font-display text-2xl font-bold text-neutral-text sm:text-3xl">{heading}</h2>
      {subtext && (
        <p
          className={`mt-2 max-w-2xl text-sm text-neutral-muted sm:text-base ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtext}
        </p>
      )}
    </div>
  )
}
