import { createRoot } from 'react-dom/client'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/700.css'
import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/600.css'
import './index.css'
import App from './App'

console.log('Mounting Bluemont App...')

const container = document.getElementById('root')
if (container) {
  createRoot(container).render(<App />)
}
