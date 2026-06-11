import type { Order } from '../types'

export const mockOrders: Order[] = [
  {
    id: 'BLU-2024-0042',
    date: '2026-05-18',
    items: [
      { productId: 'don-002', name: 'Donaldson Oil Filter P553191', brand: 'donaldson', qty: 2, price: 165.5 },
      { productId: 'yuk-002', name: 'YUKO Synthetic 5W-30 (4L)', brand: 'yuko', qty: 1, price: 365.0 },
    ],
    status: 'delivered',
    total: 696.0,
  },
  {
    id: 'BLU-2024-0037',
    date: '2026-04-29',
    items: [
      { productId: 'eur-001', name: 'EuroCAR 60Ah 12V (Sedan)', brand: 'eurocar', qty: 1, price: 890.0 },
    ],
    status: 'delivered',
    total: 890.0,
  },
  {
    id: 'BLU-2024-0031',
    date: '2026-05-30',
    items: [
      { productId: 'don-001', name: 'Donaldson Air Filter P181057', brand: 'donaldson', qty: 1, price: 385.0 },
      { productId: 'don-003', name: 'Donaldson Fuel Filter P550248', brand: 'donaldson', qty: 1, price: 142.0 },
      { productId: 'yuk-005', name: 'YUKO Multi-Purpose Grease EP2 (400g)', brand: 'yuko', qty: 3, price: 64.0 },
    ],
    status: 'processing',
    total: 719.0,
  },
  {
    id: 'BLU-2024-0026',
    date: '2026-06-04',
    items: [
      { productId: 'yuk-001', name: 'YUKO Turbo Diesel 15W-40 (20L Drum)', brand: 'yuko', qty: 1, price: 1240.0 },
    ],
    status: 'pending',
    total: 1240.0,
  },
]
