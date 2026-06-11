import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { ROUTES } from '../../constants/routes'

export default function AdminRoute() {
  const { isLoggedIn, user } = useAuthStore()

  if (!isLoggedIn || user?.accountType !== 'admin') {
    return <Navigate to={ROUTES.login} replace />
  }

  return <Outlet />
}
