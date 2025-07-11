import { useState, useEffect } from 'react';
import api from '../api/api';
import Card from '../components/Cards';
import RatingStars from '../components/RatingsStar';
import FormInput from '../components/Forms';
import toast from 'react-hot-toast';

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchStores();
  }, [search]);

  const fetchStores = async () => {
    const res = await api.get('/stores', { params: { search } });
    setStores(res.data);
  };

  const handleRating = async (storeId, rating) => {
    try {
      await api.post('/ratings', { storeId, rating });
      toast.success('Rating updated!');
      fetchStores();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to rate');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Discover Stores
          </h1>
          <p className="text-gray-600">Find and rate your favorite stores</p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <FormInput
            type="text"
            placeholder="Search stores..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {stores.map(store => (
            <Card key={store.id} className="group hover:shadow-2xl transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
                    {store.name}
                  </h3>
                  <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                    <span className="text-yellow-500 text-lg">⭐</span>
                    <span className="text-sm font-bold text-yellow-700">
                      {(parseFloat(store.overall_rating) || 0).toFixed(1)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 text-sm">📍</span>
                    <p className="text-gray-600 text-sm">{store.address}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Rate this store:</span>
                  </div>
                  <RatingStars 
                    value={store.user_rating} 
                    onRate={(star) => handleRating(store.id, star)} 
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {stores.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏪</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No stores found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}