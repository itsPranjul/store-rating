import { Link, useNavigate } from 'react-router-dom';
import { UserCircleIcon, LogoutIcon, LoginIcon } from '@heroicons/react/outline';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center px-6 py-5 bg-white/90 backdrop-blur-xl border-b border-white/20 text-gray-800 shadow-[0_8px_40px_rgba(0,0,0,0.08)] sticky top-0 z-50">
      <Link to="/" className="font-bold text-3xl tracking-wider hover:scale-105 transition-transform duration-300">
        Store <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Rating</span>
      </Link>
      <div className="flex space-x-8 items-center">
        <Link to="/stores" className="font-medium hover:text-purple-600 transition-colors duration-300 relative group">
          Stores
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        {token ? (
          <>
            <Link to="/profile" className="hover:scale-110 transition-transform duration-300">
              <UserCircleIcon className="h-7 w-7 inline-block text-gray-600 hover:text-purple-600 transition-colors duration-300" />
            </Link>
            <button onClick={logout} className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium">
              <LogoutIcon className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="flex items-center space-x-2 border-2 px-4 py-2 border-purple-600 text-purple-600 rounded-full hover:bg-gradient-to-r from-purple-600 to-pink-600 hover:text-white transition-all duration-300 font-medium">
              <LoginIcon className="h-5 w-5" />
              <span>Login</span>
            </Link>
            <Link to="/register" className="px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-full hover:bg-gradient-to-r from-purple-600 to-pink-600 hover:text-white transition-all duration-300 font-medium">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}