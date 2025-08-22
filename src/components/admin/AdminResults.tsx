import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Search, Download, Loader2, Trophy, Medal, Award } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Result } from '../../types';

const AdminResults: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialWinnersData = {
    program: '',
    category: '',
    year: '2025',
    winners: [
      { participant: '', school: '', position: 1, points: 10 },
      { participant: '', school: '', position: 2, points: 7 },
      { participant: '', school: '', position: 3, points: 5 },
    ]
  };

  const [winnersData, setWinnersData] = useState(initialWinnersData);

  const fetchResults = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('results')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
      console.error('Error fetching results:', error);
    } else {
      setResults(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleWinnerChange = (index: number, field: 'participant' | 'school', value: string) => {
    const updatedWinners = [...winnersData.winners];
    updatedWinners[index] = { ...updatedWinners[index], [field]: value };
    setWinnersData({ ...winnersData, winners: updatedWinners });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const resultsToInsert = winnersData.winners
      .filter(winner => winner.participant.trim() !== '')
      .map(winner => ({
        event: winnersData.program,
        category: winnersData.category,
        year: winnersData.year,
        participant: winner.participant,
        school: winner.school,
        position: winner.position,
        points: winner.points,
      }));

    if (resultsToInsert.length === 0) {
      alert('Please enter at least the 1st place winner.');
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.from('results').insert(resultsToInsert);

    if (error) {
      alert(`Error adding winners: ${error.message}`);
    } else {
      await fetchResults();
      resetForm();
    }
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setWinnersData(initialWinnersData);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this result?')) {
      const { error } = await supabase.from('results').delete().eq('id', id);
      if (error) {
        alert(`Error deleting result: ${error.message}`);
      } else {
        await fetchResults();
      }
    }
  };

  const filteredResults = results.filter(result =>
    result.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const winnerCards = [
    {
      place: '1st Place',
      icon: Trophy,
      color: 'yellow',
      required: true,
    },
    {
      place: '2nd Place',
      icon: Medal,
      color: 'gray',
      required: false,
    },
    {
      place: '3rd Place',
      icon: Award,
      color: 'amber',
      required: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Results</h2>
          <p className="text-gray-600">Add, edit, and manage competition results</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Winners
        </button>
      </div>

      {/* Search and Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search results..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team/School
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">
                    <Loader2 className="w-6 h-6 text-red-600 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : error ? (
                 <tr>
                  <td colSpan={5} className="text-center py-8 text-red-600">
                    Error: {error}
                  </td>
                </tr>
              ) : (
                filteredResults.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{result.participant}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {result.school}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {result.event}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        result.position === 1 ? 'bg-yellow-100 text-yellow-800' :
                        result.position === 2 ? 'bg-gray-100 text-gray-800' :
                        result.position === 3 ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {result.position}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDelete(result.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Winners Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 w-full max-w-4xl max-h-[95vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Add Winners
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Program and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Program <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={winnersData.program}
                    onChange={(e) => setWinnersData({...winnersData, program: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter program name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={winnersData.category}
                    onChange={(e) => setWinnersData({...winnersData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="General">General</option>
                    <option value="High Zone">High Zone</option>
                    <option value="Mid Zone">Mid Zone</option>
                    <option value="Low Zone">Low Zone</option>
                  </select>
                </div>
              </div>

              {/* Winner Details */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Winner Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {winnerCards.map((card, index) => (
                    <div key={card.place} className={`rounded-lg border-2 p-6
                      ${card.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' : ''}
                      ${card.color === 'gray' ? 'bg-gray-100 border-gray-200' : ''}
                      ${card.color === 'amber' ? 'bg-amber-50 border-amber-200' : ''}
                    `}>
                      <div className="flex items-center gap-3 mb-4">
                        <card.icon className={`w-6 h-6 
                          ${card.color === 'yellow' ? 'text-yellow-500' : ''}
                          ${card.color === 'gray' ? 'text-gray-500' : ''}
                          ${card.color === 'amber' ? 'text-amber-600' : ''}
                        `} />
                        <h5 className="font-bold text-lg text-gray-800">{card.place}</h5>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Participant Name {card.required && <span className="text-red-500">*</span>}
                          </label>
                          <input
                            type="text"
                            value={winnersData.winners[index].participant}
                            onChange={(e) => handleWinnerChange(index, 'participant', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                            placeholder="Enter participant name"
                            required={card.required}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Team Name
                          </label>
                          <input
                            type="text"
                            value={winnersData.winners[index].school}
                            onChange={(e) => handleWinnerChange(index, 'school', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                            placeholder="Enter team name"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setWinnersData(initialWinnersData)}
                  className="bg-white text-gray-700 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  Clear Form
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-white text-gray-700 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-red-800 text-white py-2 px-6 rounded-lg hover:bg-red-900 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Add Winners'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminResults;
