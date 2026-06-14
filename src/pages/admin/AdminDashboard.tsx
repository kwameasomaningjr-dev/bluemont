import { useMemo } from 'react'
import { useProductStore } from '../../store/productStore'
import { useUIStore } from '../../store/uiStore'
import { 
  Package, 
  AlertCircle, 
  XCircle, 
  ClipboardList,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react'

export default function AdminDashboard() {
  const products = useProductStore((state) => state.products)
  const addToast = useUIStore((state) => state.addToast)

  const handleReviewReport = () => {
    addToast({
      id: Date.now().toString(),
      type: 'success',
      message: 'Generating Sales Report... Sent to admin@bluemontgh.com',
    })
  }

  const handleViewAllQuotes = () => {
    addToast({
      id: Date.now().toString(),
      type: 'info',
      message: 'Loading full Quote Pipeline...',
    })
  }

  const stats = useMemo(() => {
    const total = products.length
    const lowStock = products.filter(p => p.stockStatus === 'low_stock').length
    const outOfStock = products.filter(p => p.stockStatus === 'out_of_stock').length
    const totalCategories = new Set(products.map(p => p.category)).size
    
    return [
      { 
        label: 'Total Products', 
        value: total, 
        icon: Package, 
        color: 'text-brand-donaldson',
        bg: 'bg-brand-donaldson/10',
        trend: '+4 this month'
      },
      { 
        label: 'Low Stock', 
        value: lowStock, 
        icon: AlertCircle, 
        color: 'text-status-warning',
        bg: 'bg-status-warning/10',
        trend: 'Check inventory'
      },
      { 
        label: 'Out of Stock', 
        value: outOfStock, 
        icon: XCircle, 
        color: 'text-status-danger',
        bg: 'bg-status-danger/10',
        trend: 'Urgent restock'
      },
      { 
        label: 'Total Categories', 
        value: totalCategories, 
        icon: ClipboardList, 
        color: 'text-brand-eurocar',
        bg: 'bg-brand-eurocar/10',
        trend: 'Across 3 brands'
      },
    ]
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-neutral-text">Business Overview</h1>
        <p className="mt-1 text-sm text-neutral-muted">Real-time performance metrics for Bluemont.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="rounded-2xl border border-neutral-border bg-neutral-surface p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className={`rounded-xl ${stat.bg} p-3 ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-status-success">
                  <TrendingUp size={14} />
                  {stat.trend}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-neutral-muted">{stat.label}</p>
                <h3 className="mt-1 text-3xl font-bold text-neutral-text">{stat.value}</h3>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity Mock */}
        <div className="lg:col-span-2 rounded-2xl border border-neutral-border bg-neutral-surface shadow-sm overflow-hidden">
          <div className="border-b border-neutral-border px-6 py-4 flex items-center justify-between">
            <h2 className="font-display font-bold text-neutral-text">Recent Quote Requests</h2>
            <button 
              onClick={handleViewAllQuotes}
              className="text-xs font-bold text-brand-donaldson uppercase tracking-wider hover:underline"
            >
              View All
            </button>
          </div>
          <div className="divide-y divide-neutral-border">
            {[
              { id: 'Q-4921', customer: 'Kwame Mensah', item: 'Donaldson P181057', date: '2 mins ago', status: 'Pending' },
              { id: 'Q-4920', customer: 'Araba Appiah', item: 'YUKO 15W-40 20L', date: '45 mins ago', status: 'In Review' },
              { id: 'Q-4919', customer: 'John Doe', item: 'EuroCAR 74Ah Battery', date: '2 hours ago', status: 'Completed' },
            ].map((quote) => (
              <div 
                key={quote.id} 
                className="px-6 py-4 flex items-center justify-between hover:bg-neutral-bg transition-colors cursor-pointer"
                onClick={() => {
                  addToast({
                    id: Date.now().toString(),
                    type: 'info',
                    message: `Opening Quote ${quote.id} for ${quote.customer}...`,
                  })
                }}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-neutral-text">{quote.customer}</span>
                  <span className="text-xs text-neutral-muted">{quote.item}</span>
                </div>
                <div className="text-right">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                    quote.status === 'Pending' ? 'bg-status-warning/10 text-status-warning' :
                    quote.status === 'In Review' ? 'bg-brand-donaldson/10 text-brand-donaldson' :
                    'bg-status-success/10 text-status-success'
                  }`}>
                    {quote.status}
                  </span>
                  <p className="mt-1 text-[10px] text-neutral-muted">{quote.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Health Card */}
        <div className="rounded-2xl bg-brand-donaldson p-6 text-white shadow-xl shadow-brand-donaldson/20 flex flex-col justify-between">
          <div>
            <TrendingUp size={32} className="text-white/30" />
            <h2 className="mt-6 font-display text-xl font-bold">Business Health</h2>
            <p className="mt-2 text-sm text-white/70">
              Bluemont is performing 12% better this week compared to last month. Top brand: **Donaldson**.
            </p>
          </div>
          <button 
            onClick={handleReviewReport}
            className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-brand-donaldson transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Review Sales Report
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
