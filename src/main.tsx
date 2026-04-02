import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { applySpaRedirectIfNeeded } from './lib/sitePath'

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

applySpaRedirectIfNeeded()

createRoot(document.getElementById('root')!).render(
  <App />,
)
