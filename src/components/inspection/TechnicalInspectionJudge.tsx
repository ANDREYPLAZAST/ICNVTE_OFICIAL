'use client';

import { ClipboardCheck } from 'lucide-react';
import InspectionTable from './InspectionTable';
import { useEffect, useState } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export default function TechnicalInspectionJudge() {
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
  const [inspectionData, setInspectionData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar todos los equipos al montar el componente
  useEffect(() => {
    loadAllTeams();
  }, []);

  // Cargar inspección cuando se selecciona un equipo
  useEffect(() => {
    if (selectedTeamId) {
      loadInspectionData(selectedTeamId);
    } else {
      setInspectionData(null);
    }
  }, [selectedTeamId]);

  const loadAllTeams = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/teams`);
      if (res.ok) {
        const data = await res.json();
        setTeams(data.teams || []);
      }
    } catch (error) {
      console.error('Error loading teams:', error);
    }
  };

  const loadInspectionData = async (teamId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/inspection/${teamId}`);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('No inspection data found for this team');
        }
        throw new Error('Failed to fetch inspection data');
      }
      
      const data = await res.json();
      setInspectionData(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error loading inspection data');
      setInspectionData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDataUpdate = (updatedData: any) => {
    setInspectionData(updatedData);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Technical Inspection</h1>
          <p className="text-gray-600">Vehicle safety and compliance verification for MiliRacing</p>
        </div>
        <div className="status-pending">
          Judge Panel
        </div>
      </div>

      {/* Dropdown para seleccionar equipo */}
      <div className="dashboard-card">
        <div className="flex items-center space-x-4">
          <ClipboardCheck className="w-5 h-5 text-primary" />
          <label htmlFor="team-select" className="text-sm font-medium text-gray-700">
            Select Team to Inspect:
          </label>
          <select
            id="team-select"
            value={selectedTeamId}
            onChange={(e) => setSelectedTeamId(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Select a Team --</option>
            {teams.map((team) => (
              <option key={team.id_team} value={team.id_team}>
                {team.team_name} ({team.institution_name})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla de inspección */}
      <div className="dashboard-card">
        {!selectedTeamId ? (
          <div className="flex items-center justify-center h-64 text-gray-500 text-lg">
            Please select a team to view inspection details
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center h-64 text-blue-500 text-lg">
            Loading inspection data...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64 text-red-500 text-lg">
            Error: {error}
          </div>        ) : inspectionData ? (
          <div>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">
                Inspecting: {teams.find(t => t.id_team === selectedTeamId)?.team_name || 'Unknown Team'}
              </h4>
              <p className="text-sm text-blue-700">
                Institution: {teams.find(t => t.id_team === selectedTeamId)?.institution_name || 'Unknown Institution'}
              </p>
            </div>
            <InspectionTable
              id_team={selectedTeamId}
              initialData={inspectionData}
              onDataUpdate={handleDataUpdate}
              readOnly={false} // Los jueces pueden editar
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <div className="text-lg mb-2">No inspection data available</div>
            <div className="text-sm text-center">
              This team may not have any inspection data yet, or there was an error loading the data.
              <br />
              Try selecting a different team or contact support if the issue persists.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
