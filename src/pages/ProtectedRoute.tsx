import { Navigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAdmin();

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
