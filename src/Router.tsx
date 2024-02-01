import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { History } from './pages/History.tsx'
import { DefaultLayout } from './layouts/DefaultLayout'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
