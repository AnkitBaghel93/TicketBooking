import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const GoogleSuccess = () => {
  const [params] = useSearchParams();
  const token = params.get('token');
  const username = params.get('username');
  const email = params.get('email');
  const role = params.get('role') || 'user'; 

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && email && role) {
      const user = { username, email, role };
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      login(user, token);

      // Redirect based on role
      switch (role) {
        case 'admin':
          navigate('/admin/dashboard', { replace: true });
          break;
        case 'operation':
          navigate('/operation/dashboard', { replace: true });
          break;
        case 'technical':
          navigate('/technical/dashboard', { replace: true });
          break;
        default:
          navigate('/user/dashboard', { replace: true });
      }
    }
  }, [token, username, email, role, login, navigate]);

  if (!token) {
    return <div className="text-center mt-20 text-red-600">Invalid or missing token.</div>;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-700">Signing in with Google...</p>
    </div>
  );
};

export default GoogleSuccess;
