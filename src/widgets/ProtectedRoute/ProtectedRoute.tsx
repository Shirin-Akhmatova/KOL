import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../../app/services/redux/store';

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => 
    state.auth.isAuthenticated || !!localStorage.getItem('access_token')
  );
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;