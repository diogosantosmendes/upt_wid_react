import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { SessionProvider } from './contexts/SessionContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SessionProvider>
      <BrowserRouter basename="/upt_wid_react/">
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </SessionProvider>
  </StrictMode>,
)
