'use client';

import { ClipboardCheck, AlertTriangle, CheckCircle } from 'lucide-react';
import InspectionTableReadOnly from './InspectionTableReadOnly';
import InspectionSummary from './InspectionSummary';
import TechnicalInspectionJudge from './TechnicalInspectionJudge';
import { useEffect, useState } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export default function TechnicalInspection() {
  // Default to judge role for development
  const userRole = 'judge';
  
  // Si es judge, usar el componente específico para jueces
  if (userRole === 'judge') {
    return <TechnicalInspectionJudge />;
  }
  
  const [inspectionData, setInspectionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [teamInfo, setTeamInfo] = useState<any>(null);useEffect(() => {
    const fetchInspectionData = async () => {
      await performFetch();
    };    const performFetch = async () => {
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

    fetchInspectionData();
  }, []);

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
            {teamInfo ? `Vehicle safety and compliance verification for ${teamInfo.team_name}` : 'Vehicle safety and compliance verification'}
          </p>
        </div>
        <div className={getStatusClass()}>
          {getInspectionStatus()}
        </div>
      </div>

      {loading ? (
        <div className="dashboard-card">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading inspection data...</p>
          </div>
        </div>
      ) : error ? (
        <div className="dashboard-card">
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 mx-auto text-red-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Inspection Data</h3>            <p className="text-gray-500 mb-4">{error}</p>
            {error.includes('not assigned to any team') && (
              <p className="text-sm text-gray-400">
                Please contact an administrator to be assigned to a team.
              </p>
            )}
            {error.includes('No inspection data found') && (
              <p className="text-sm text-gray-400">
                Your team hasn't been scheduled for technical inspection yet.
              </p>
            )}
          </div>
        </div>
      ) : (
        <>
          <InspectionSummary stats={inspectionData?.stats} />
          <InspectionTableReadOnly 
            id_team={teamInfo?.id_team || ''} 
            initialData={inspectionData}
            onDataUpdate={setInspectionData}
          />
        </>
      )}
    </div>
  );
}