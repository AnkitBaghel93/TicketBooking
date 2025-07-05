import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const FacebookSuccess = () => {
  const [params] = useSearchParams();
  const token = params.get('token');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Decode or fetch user data using token
      localStorage.setItem('token', token);
      // For simplicity, simulate role-based redirection
      login({}, token); // You can replace {} with user fetched via token
      navigate('/user/dashboard');
    }
  }, [token, login, navigate]);

  return <div>Signing in with Facebook...</div>;
};

export default FacebookSuccess;
