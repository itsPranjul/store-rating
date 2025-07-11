import { useState, useEffect } from 'react';
import api from '../api/api';
import { Search, Users, Store, Star, Filter, Download, RefreshCw } from 'lucide-react';
import MetricCard from '../components/MetricCard';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchDashboard();
    fetchUsers();
    fetchStores();
  }, [search]);

  const fetchDashboard = async () => {
    const res = await api.get('/admin/dashboard');
    setStats(res.data);
  };

  const fetchUsers = async () => {
    const res = await api.get('/admin/users', { params: { search } });
    setUsers(res.data);
  };

  const fetchStores = async () => {
    const res = await api.get('/admin/stores', { params: { search } });
    setStores(res.data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Modern Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-purple-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h2>
              <p className="text-slate-600 mt-1">Manage your platform with ease</p>
            </div>
            <div className="flex items-center gap-3">
              {/* <button className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur border border-purple-200 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-sm hover:shadow-md">
                <RefreshCw size={16} className="text-purple-600" />
                <span className="text-slate-700 font-medium">Refresh</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg">
                <Download size={16} />
                <span className="font-medium">Export</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <MetricCard title="Total Users" value={stats.totalUsers} gradient="from-purple-500 via-purple-600 to-pink-500" delay={0.1} />
          <MetricCard title="Total Stores" value={stats.totalStores} gradient="from-green-500 via-emerald-500 to-teal-500" delay={0.2} />
          <MetricCard title="Total Ratings" value={stats.totalRatings} gradient="from-yellow-400 via-orange-500 to-red-500" delay={0.3} />
        </div>

        {/* Modern Search Bar */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search users & stores..."
              className="w-full pl-12 pr-6 py-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-slate-700 placeholder-slate-400"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <button className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md">
                <Filter size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Tables Container */}
        <div className="space-y-8">
          {/* Users Table */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-pink-500/10 border-b border-purple-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users size={20} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Users</h3>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {users.length} total
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <tr>
                    <th className="py-4 px-6 text-left font-semibold text-slate-700">Name</th>
                    <th className="py-4 px-6 text-left font-semibold text-slate-700">Email</th>
                    <th className="py-4 px-6 text-left font-semibold text-slate-700">Address</th>
                    <th className="py-4 px-6 text-left font-semibold text-slate-700">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id} className="hover:bg-purple-50/50 transition-all duration-300 border-b border-slate-100">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-800">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-600">{user.email}</td>
                      <td className="py-4 px-6 text-slate-600">{user.address}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' ? 'bg-red-100 text-red-700' :
                          user.role === 'store' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stores Table */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-teal-500/10 border-b border-green-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Store size={20} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Stores</h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {stores.length} total
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-50 to-teal-50">
                  <tr>
                    <th className="py-4 px-6 text-left font-semibold text-slate-700">Name</th>
                    <th className="py-4 px-6 text-left font-semibold text-slate-700">Email</th>
                    <th className="py-4 px-6 text-left font-semibold text-slate-700">Address</th>
                    <th className="py-4 px-6 text-left font-semibold text-slate-700">Avg Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {stores.map((store, index) => (
                    <tr key={store.id} className="hover:bg-green-50/50 transition-all duration-300 border-b border-slate-100">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {store.name.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-800">{store.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-600">{store.email}</td>
                      <td className="py-4 px-6 text-slate-600">{store.address}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Star size={16} className="text-yellow-500 fill-current" />
                          <span className="font-semibold text-slate-800">{parseFloat(store.rating).toFixed(1)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
