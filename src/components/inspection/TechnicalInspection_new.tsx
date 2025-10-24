'use client';

import { ClipboardCheck, AlertTriangle, CheckCircle } from 'lucide-react';
import InspectionTableReadOnly from './InspectionTableReadOnly';
import InspectionTable from './InspectionTable';
import InspectionSummary from './InspectionSummary';
import { useEffect, useState } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export default function TechnicalInspection() {
  // Default to judge role for development
  const userRole = 'judge';
  const [inspectionData, setInspectionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [teamInfo, setTeamInfo] = useState<any>(null);
  
  // States específicos para JUDGE
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
  const [teamsLoading, setTeamsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (userRole === 'judge') {
        await fetchTeamsForJudge();
      } else {
        await fetchInspectionDataForTeamMember();
      }
    };

    const fetchTeamsForJudge = async () => {
      try {
        setTeamsLoading(true);
        setError(null);
        
        const response = await fetch(`${BACKEND_URL}/api/teams`);
        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }
        
        const teamsData = await response.json();
        setTeams(teamsData);
        
        // Si hay equipos, seleccionar el primero por defecto
        if (teamsData.length > 0) {
          setSelectedTeamId(teamsData[0].id_team);
        }
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error loading teams');
        setLoading(false);
      } finally {
        setTeamsLoading(false);
      }
    };

    const fetchInspectionDataForTeamMember = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simplified logic - load all teams and use the first one for demo
        const teamsResponse = await fetch(`${BACKEND_URL}/api/teams`);
        if (!teamsResponse.ok) {
          throw new Error('Failed to fetch teams');
        }
        
        const teamsData = await teamsResponse.json();
        if (!teamsData.teams || teamsData.teams.length === 0) {
          throw new Error('No teams available');
        }
        
        // Use the first team for demo purposes
        const firstTeam = teamsData.teams[0];
        const fetchUrl = `${BACKEND_URL}/api/teams/${firstTeam.id_team}`;
        
        // Obtener información del equipo
        const teamResponse = await fetch(fetchUrl);        
        if (!teamResponse.ok) {
          if (teamResponse.status === 404) {
            throw new Error('You are not assigned to any team yet');
          }
          throw new Error('Failed to fetch team information');
        }
        
        const teamData = await teamResponse.json();
        setTeamInfo(teamData);
        
        if (!teamData.id_team) {
          throw new Error('Team ID not found');
        }        
        
        // Obtener datos de inspección técnica del equipo
        const inspectionResponse = await fetch(`${BACKEND_URL}/api/inspection/${teamData.id_team}`);
        if (!inspectionResponse.ok) {
          if (inspectionResponse.status === 404) {
            throw new Error('No inspection data found for this team');
          }
          throw new Error('Failed to fetch inspection data');
        }
        
        const inspectionData = await inspectionResponse.json();
        setInspectionData(inspectionData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error loading inspection data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Efecto para cargar datos de inspección cuando el judge selecciona un equipo
  useEffect(() => {
    if (userRole === 'judge' && selectedTeamId) {
      fetchInspectionForTeam(selectedTeamId);
    }
  }, [selectedTeamId]);

  const fetchInspectionForTeam = async (teamId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Obtener información del equipo seleccionado
      const teamResponse = await fetch(`${BACKEND_URL}/api/teams/${teamId}`);
      if (!teamResponse.ok) {
        throw new Error('Failed to fetch team information');
      }
      
      const teamData = await teamResponse.json();
      setTeamInfo(teamData);
      
      // Obtener datos de inspección técnica del equipo
      const inspectionResponse = await fetch(`${BACKEND_URL}/api/inspection/${teamId}`);
      if (!inspectionResponse.ok) {
        if (inspectionResponse.status === 404) {
          throw new Error('No inspection data found for this team');
        }
        throw new Error('Failed to fetch inspection data');
      }
      
      const inspectionData = await inspectionResponse.json();
      setInspectionData(inspectionData);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error loading inspection data');
    } finally {
      setLoading(false);
    }
  };

  // Determinar el status general de la inspección
  const getInspectionStatus = () => {
    if (!inspectionData?.stats) return 'Inspection Pending';
    
    const { passed, failed, pending, total } = inspectionData.stats;
    
    if (failed > 0) return 'Inspection Failed';
    if (pending > 0) return 'Inspection Pending';
    if (passed === total) return 'Inspection Passed';
    
    return 'Inspection Pending';
  };

  const getStatusClass = () => {
    const status = getInspectionStatus();
    if (status.includes('Failed')) return 'status-rejected';
    if (status.includes('Passed')) return 'status-approved';
    return 'status-pending';
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Technical Inspection</h1>
          <p className="text-gray-600">
            {userRole === 'judge' 
              ? 'Evaluate and manage team technical inspections'
              : teamInfo 
                ? `Vehicle safety and compliance verification for ${teamInfo.team_name}` 
                : 'Vehicle safety and compliance verification'
            }
          </p>
        </div>
        <div className={getStatusClass()}>
          {getInspectionStatus()}
        </div>
      </div>

      {/* Dropdown para jueces para seleccionar equipo */}
      {userRole === 'judge' && (
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Select Team</h3>
            <select 
              value={selectedTeamId} 
              onChange={(e) => setSelectedTeamId(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white min-w-[200px]"
              disabled={teamsLoading}
            >
              <option value="">Select a team...</option>
              {teams.map(team => (
                <option key={team.id_team} value={team.id_team}>
                  {team.team_name}
                </option>
              ))}
            </select>
          </div>
          {selectedTeamId && teamInfo && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Selected Team:</strong> {teamInfo.team_name}
              </p>
              {teamInfo.vehicle_name && (
                <p className="text-sm text-gray-600">
                  <strong>Vehicle:</strong> {teamInfo.vehicle_name}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {loading ? (
        <div className="dashboard-card">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {userRole === 'judge' 
                ? 'Loading inspection data...' 
                : 'Loading inspection data...'
              }
            </p>
          </div>
        </div>
      ) : error ? (
        <div className="dashboard-card">
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 mx-auto text-red-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Inspection Data</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            {error.includes('not assigned to any team') && (
              <p className="text-sm text-gray-400">
                Please contact an administrator to be assigned to a team.
              </p>
            )}
            {error.includes('No inspection data found') && (
              <p className="text-sm text-gray-400">
                {userRole === 'judge' 
                  ? 'This team hasn\'t been scheduled for technical inspection yet.'
                  : 'Your team hasn\'t been scheduled for technical inspection yet.'
                }
              </p>
            )}
          </div>
        </div>
      ) : userRole === 'judge' && !selectedTeamId ? (
        <div className="dashboard-card">
          <div className="text-center py-8">
            <ClipboardCheck className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Team</h3>
            <p className="text-gray-500">Please select a team from the dropdown above to view their inspection data.</p>
          </div>
        </div>
      ) : (
        <>
          <InspectionSummary stats={inspectionData?.stats} />
          {userRole === 'judge' ? (
            <InspectionTable 
              id_team={teamInfo?.id_team || ''} 
              initialData={inspectionData}
              onDataUpdate={setInspectionData}
              readOnly={false}
            />
          ) : (
            <InspectionTableReadOnly 
              id_team={teamInfo?.id_team || ''} 
              initialData={inspectionData}
              onDataUpdate={setInspectionData}
            />
          )}
        </>
      )}
    </div>
  );
}
