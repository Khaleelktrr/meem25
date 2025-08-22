import React, { useState, useEffect } from 'react';
import { Search, Download, Printer, Filter, Trophy, Medal, Award, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Result } from '../types';

const Results: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2025');

  const categories = ['all', 'General', 'High Zone', 'Mid Zone', 'Low Zone'];
  const years = ['2025', '2024', '2023'];

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      
      let query = supabase.from('results').select('*').order('points', { ascending: false });

      if (selectedYear !== 'all') {
        query = query.eq('year', selectedYear);
      }
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) {
        setError(error.message);
        console.error("Error fetching results:", error);
      } else {
        setResults(data || []);
      }
      setLoading(false);
    };

    fetchResults();
  }, [selectedCategory, selectedYear]);

  const filteredResults = results.filter(result => 
    result.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">{position}</span>;
    }
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
        return 'bg-yellow-50 border-yellow-200';
      case 2:
        return 'bg-gray-50 border-gray-200';
      case 3:
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const csvContent = [
      ['Category', 'Event', 'Participant', 'School', 'Position'],
      ...filteredResults.map(result => [
        result.category,
        result.event,
        result.participant,
        result.school,
        result.position
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `muhimmath-results-${selectedYear}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Competition Results</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find results of all competitions held at Muhimmath. Search by participant name, school, or event.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search participants, schools, events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {filteredResults.length} results for {selectedYear}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
              <span className="ml-4 text-gray-600">Loading Results...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">
              <h3 className="text-xl font-semibold">Error loading results</h3>
              <p>{error}</p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Results Found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          ) : (
            filteredResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`bg-white rounded-lg border-2 ${getPositionColor(result.position)} p-6 hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getPositionIcon(result.position)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{result.participant}</h3>
                      <p className="text-gray-600">{result.school}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">{result.category}</div>
                    <div className="font-semibold text-gray-900">{result.event}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Position</div>
                    <div className="text-2xl font-bold text-gray-900">{result.position}</div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Results;
