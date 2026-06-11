import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          donaldson: '#1A3A6B',
          yuko: '#B8860B',
          eurocar: '#2D6A2D',
        },
        neutral: {
          bg: '#F7F8FA',
          surface: '#FFFFFF',
          border: '#E2E8F0',
          text: '#1A1A1A',
          muted: '#6B7280',
        },
        status: {
          success: '#16A34A',
          warning: '#D97706',
          danger: '#DC2626',
        },
      },
      fontFamily: {
        display: ['"DM Sans"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        content: '1280px',
      },
    },
  },
  plugins: [],
} satisfies Config
