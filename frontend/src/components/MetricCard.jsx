import {TrendingUp} from 'lucide-react'

export default function MetricCard ({ title, value, gradient, delay }) {
    return (
        <div 
      className={`bg-gradient-to-br ${gradient} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 text-white relative overflow-hidden group`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-500"></div>
      
      <div className="relative z-10">
        <h3 className="text-sm font-medium opacity-90 mb-2">{title}</h3>
        <p className="text-4xl font-bold mb-1">{value?.toLocaleString() || 0}</p>
        <div className="flex items-center gap-1 text-sm opacity-75">
          <TrendingUp size={16} />
          <span>+12% from last month</span>
        </div>
      </div>
    </div>
    )
};

  