import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: maxRating }, (_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < Math.floor(rating)
              ? 'text-yellow-400 fill-current'
              : index < rating
              ? 'text-yellow-400 fill-current opacity-50'
              : 'text-slate-400'
          }`}
        />
      ))}
      <span className="text-sm text-slate-400 ml-1">
        {rating.toFixed(1)}/{maxRating}
      </span>
    </div>
  );
};

export default StarRating;