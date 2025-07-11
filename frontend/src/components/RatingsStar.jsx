import { StarIcon } from '@heroicons/react/solid';

export default function RatingStars({ value, onRate }) {
  return (
    <div className="flex space-x-2 mt-3">
      {[1,2,3,4,5].map(star => (
        <StarIcon
          key={star}
          onClick={() => onRate(star)}
          className={`h-8 w-8 cursor-pointer transition-all duration-300 ease-out transform hover:scale-125 active:scale-110 ${
            star <= value 
              ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] hover:drop-shadow-[0_0_12px_rgba(251,191,36,0.7)]' 
              : 'text-gray-300 hover:text-yellow-200 hover:drop-shadow-[0_0_6px_rgba(251,191,36,0.3)]'
          }`}
        />
      ))}
    </div>
  );
}