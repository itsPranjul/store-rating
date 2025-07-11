import { useState, useEffect } from 'react';
import api from '../api/api';
import { StarIcon } from '@heroicons/react/solid';

export default function OwnerDashboard() {
  const [ratings, setRatings] = useState([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/owner/dashboard');
      setRatings(res.data.ratings);
      setAvg(res.data.averageRating);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-8">
      <h2 className="text-3xl font-bold text-center text-purple-700">Store Owner Dashboard</h2>

      <div className="p-6 rounded-xl bg-gradient-to-r from-yellow-300 to-orange-400 text-center shadow-lg">
        <h3 className="text-lg font-semibold mb-2 text-white">Average Store Rating</h3>
        <div className="flex justify-center mb-2">
          {[1,2,3,4,5].map(star => (
            <StarIcon key={star} className={`h-8 w-8 ${star <= Math.round(avg) ? 'text-yellow-600' : 'text-gray-300'}`} />
          ))}
        </div>
        <p className="text-3xl font-bold text-white">{avg.toFixed(1)}</p>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white/80 backdrop-blur rounded">
          <thead className="bg-yellow-200">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Rating</th>
              <th className="py-2 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((r, idx) => (
              <tr key={idx} className="hover:bg-yellow-50">
                <td className="py-2 px-4">{r.name}</td>
                <td className="py-2 px-4">{r.email}</td>
                <td className="py-2 px-4">{r.rating}</td>
                <td className="py-2 px-4">{new Date(r.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
