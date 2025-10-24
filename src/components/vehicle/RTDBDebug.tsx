'use client';

import { useState } from 'react';
import { BACKEND_URL } from '@/lib/apiConfig';

interface TeamData {
  teamId: string;
  teamName: string;
  hasCarVelocity: boolean;
  hasCarVoltage: boolean;
  hasCarCurrent: boolean;
  hasPower: boolean;
  carVelocityLength: number;
  carVoltageLength: number;
  carCurrentLength: number;
  powerLength: number;
  lastUpdated: string;
}

export default function RTDBDebug() {
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRTDBTeams = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Fetching RTDB teams from:', `${BACKEND_URL}/api/vehicle/debug/rtdb-teams`);
      
      const response = await fetch(`${BACKEND_URL}/api/vehicle/debug/rtdb-teams`);
      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ RTDB teams received:', data);
        setTeams(data.teams || []);
      } else {
        console.error('❌ Error fetching RTDB teams:', data);
        setError(data.message || 'Error fetching teams');
      }
    } catch (err) {
      console.error('❌ Network error:', err);
      setError('Network error: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const testTeamHistory = async (teamId: string, metric: string) => {
    try {
      console.log(`🔍 Testing history for team ${teamId}, metric ${metric}`);
      
      const response = await fetch(`${BACKEND_URL}/api/vehicle/history-rtdb/${teamId}/${metric}`);
      const data = await response.json();
      
      if (response.ok) {
        console.log(`✅ History data for ${teamId}/${metric}:`, data);
        alert(`✅ Success! Found ${data[metric]?.length || 0} data points for ${metric}`);
      } else {
        console.error(`❌ Error fetching history for ${teamId}/${metric}:`, data);
        alert(`❌ Error: ${data.message}`);
      }
    } catch (err) {
      console.error('❌ Network error:', err);
      alert('❌ Network error: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  return (
    <div className="dashboard-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 RTDB Debug Panel</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Backend URL: <code className="bg-gray-100 px-2 py-1 rounded">{BACKEND_URL}</code>
          </p>
          <button
            onClick={fetchRTDBTeams}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Fetch RTDB Teams'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            ❌ {error}
          </div>
        )}

        {teams.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Found {teams.length} teams in RTDB:
            </h4>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {teams.map((team) => (
                <div key={team.teamId} className="border border-gray-200 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-medium">{team.teamName}</span>
                      <span className="text-sm text-gray-500 ml-2">({team.teamId})</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Updated: {team.lastUpdated}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${team.hasCarVelocity ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span>Velocity: {team.carVelocityLength} points</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${team.hasCarVoltage ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span>Voltage: {team.carVoltageLength} points</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${team.hasCarCurrent ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span>Current: {team.carCurrentLength} points</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${team.hasPower ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span>Power: {team.powerLength} points</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => testTeamHistory(team.teamId, 'speed')}
                      className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded"
                    >
                      Test Speed
                    </button>
                    <button
                      onClick={() => testTeamHistory(team.teamId, 'voltage')}
                      className="text-xs bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded"
                    >
                      Test Voltage
                    </button>
                    <button
                      onClick={() => testTeamHistory(team.teamId, 'current')}
                      className="text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-2 py-1 rounded"
                    >
                      Test Current
                    </button>
                    <button
                      onClick={() => testTeamHistory(team.teamId, 'power')}
                      className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-800 px-2 py-1 rounded"
                    >
                      Test Power
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

