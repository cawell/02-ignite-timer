import { Outlet } from 'react-router-dom'
import { LayoutContainer } from './styles.ts'
import { Header } from '../../components/Header'

export const DefaultLayout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  )
}
