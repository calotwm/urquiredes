import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './Layout.tsx'
import DashboardPage from './pages/DashboardPage.tsx'
import CalendarPage from './pages/CalendarPage.tsx'
import IdeasPage from './pages/IdeasPage.tsx'
import MetricsPage from './pages/MetricsPage.tsx'
import ScriptsPage from './pages/ScriptsPage.tsx'
import CarouselsPage from './pages/CarouselsPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="calendario" element={<CalendarPage />} />
          <Route path="ideas" element={<IdeasPage />} />
          <Route path="metricas" element={<MetricsPage />} />
          <Route path="guiones" element={<ScriptsPage />} />
          <Route path="carruseles" element={<CarouselsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
