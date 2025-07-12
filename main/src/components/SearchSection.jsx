import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const SearchSection = () => {
  const [availability, setAvailability] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-slate-800 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="prs_pbll flex flex-col md:flex-row gap-4">
          <div className="relative">
            <select 
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="option_list appearance-none bg-slate-700 text-white px-4 py-3 pr-10 rounded-lg border border-slate-600 focus:border-teal-400 focus:outline-none min-w-[150px]"
            >
              <option>All</option>
              <option>Available Now</option>
              <option>Available This Week</option>
              <option>Available This Month</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
          
          <div className="flex-1 relative max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search skills, expertise, or people..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700 text-white pl-10 pr-4 py-3 rounded-lg border border-slate-600 focus:border-teal-400 focus:outline-none"
            />
          </div>
          
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg transition-colors font-medium">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;