import { BadgeCheck, MapPinned, ShieldCheck, Truck, Award } from 'lucide-react'

const badges = [
  { icon: BadgeCheck, label: 'Genuine Products' },
  { icon: Award, label: 'Made in Ghana (Eurocar)' },
  { icon: ShieldCheck, label: '1 Year Warranty' },
  { icon: Truck, label: 'Nationwide Delivery' },
  { icon: MapPinned, label: 'Authorised Distributor' },
]

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {badges.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-border bg-neutral-surface px-4 py-6 text-center"
        >
          <Icon size={28} className="text-brand-donaldson" />
          <span className="text-sm font-medium text-neutral-text">{label}</span>
        </div>
      ))}
    </div>
  )
}
