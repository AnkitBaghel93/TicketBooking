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
      login({}, token); // Replace {} with real user info if needed
      navigate('/user/dashboard', { replace: true }); 
    }
  }, [token, login, navigate]);

 if (!token) {
  return <div className="text-center mt-20">Invalid or missing token.</div>;
}

};

export default GoogleSuccess;
