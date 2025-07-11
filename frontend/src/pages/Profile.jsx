import { useState, useEffect } from 'react';
import api from '../api/api';
import toast from 'react-hot-toast';
import Card from '../components/Cards';
import FormInput from '../components/Forms';

export default function Profile() {
  const [user, setUser] = useState({});
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get('/users/profile');
      setUser(res.data);
    };
    fetchProfile();
  }, []);

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      await api.put('/users/password', { currentPassword, newPassword });
      toast.success('Password updated!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        <div className="grid gap-6">
          {/* Profile Information Card */}
          <Card className="backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">
              Profile Information
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50/70 rounded-xl border border-gray-200/50">
                <label className="text-sm font-medium text-gray-600 mb-1 block">Full Name</label>
                <p className="text-lg font-semibold text-gray-800">{user.name}</p>
              </div>
              <div className="p-4 bg-gray-50/70 rounded-xl border border-gray-200/50">
                <label className="text-sm font-medium text-gray-600 mb-1 block">Email Address</label>
                <p className="text-lg font-semibold text-gray-800">{user.email}</p>
              </div>
              <div className="p-4 bg-gray-50/70 rounded-xl border border-gray-200/50">
                <label className="text-sm font-medium text-gray-600 mb-1 block">Address</label>
                <p className="text-lg font-semibold text-gray-800">{user.address}</p>
              </div>
            </div>
          </Card>

          {/* Change Password Card */}
          <Card className="backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">
              Change Password
            </h3>
            <form onSubmit={handleUpdate} className="space-y-6">
              <FormInput
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
              />
              <FormInput
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 active:scale-95 text-lg">
                Update Password
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}