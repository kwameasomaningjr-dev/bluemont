import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, XCircle } from 'lucide-react'
import { useUIStore } from '../../store/uiStore'
import type { Toast } from '../../types'

const toastStyles: Record<Toast['type'], { icon: typeof CheckCircle2; className: string }> = {
  success: { icon: CheckCircle2, className: 'border-status-success/30 text-status-success' },
  error: { icon: XCircle, className: 'border-status-danger/30 text-status-danger' },
  info: { icon: Info, className: 'border-brand-donaldson/30 text-brand-donaldson' },
}

function ToastItem({ toast }: { toast: Toast }) {
  const removeToast = useUIStore((s) => s.removeToast)
  const { icon: Icon, className } = toastStyles[toast.type]

  useEffect(() => {
    const timer = setTimeout(() => removeToast(toast.id), 3000)
    return () => clearTimeout(timer)
  }, [toast.id, removeToast])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      className={`flex items-center gap-3 rounded-xl border bg-neutral-surface px-4 py-3 shadow-lg ${className}`}
    >
      <Icon size={20} />
      <p className="text-sm font-medium text-neutral-text">{toast.message}</p>
    </motion.div>
  )
}

export default function ToastStack() {
  const toasts = useUIStore((s) => s.toasts)

  return (
    <div className="pointer-events-none fixed left-4 right-4 top-20 z-[60] flex w-auto max-w-none flex-col gap-2 sm:left-auto sm:w-full sm:max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
