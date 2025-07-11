import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import Card from '../components/Cards';
import FormInput from '../components/Forms';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="h-200 bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center px-4 py-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
            Create Account
          </h1>
          <p className="text-gray-600 text-sm">Join us and start your journey</p>
        </div>
        
        <Card className="backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
          <h2 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">
            Register
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />
            <FormInput
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <FormInput
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />
            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 active:scale-95">
              Create Account
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-purple-600 hover:text-purple-800 font-medium hover:underline transition-colors duration-200"
              >
                Sign in
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}