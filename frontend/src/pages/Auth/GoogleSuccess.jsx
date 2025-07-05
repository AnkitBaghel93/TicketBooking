import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const GoogleSuccess = () => {
  const [params] = useSearchParams();
  const token = params.get('token');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      login({}, token);
      navigate('/user/dashboard');
    }
  }, [token, login, navigate]);

  return <div>Signing in with Google...</div>;
};

export default GoogleSuccess;
