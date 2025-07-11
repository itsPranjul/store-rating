import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import Card from '../components/Cards';
import FormInput from '../components/Forms';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Welcome back!');
      if (res.data.user.role === 'admin') navigate('/admin');
      else if (res.data.user.role === 'store_owner') navigate('/owner');
      else navigate('/stores');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className=" bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>
        
        <Card className="backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
          <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
            <FormInput 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 active:scale-95 text-lg">
              Sign In
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button 
                onClick={() => navigate('/register')}
                className="text-purple-600 hover:text-purple-800 font-medium hover:underline transition-colors duration-200"
              >
                Sign up
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}