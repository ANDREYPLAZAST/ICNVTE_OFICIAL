import { useState, useEffect, useCallback } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

interface TrajectoryPoint {
  lat: number;
  lng: number;
  timestamp: string;
}

interface TrajectoryData {
  trajectory: TrajectoryPoint[];
  totalPoints: number;
  timeRange: string;
}

interface UseTrajectoryOptions {
  teamId?: string;
  enabled?: boolean;
  refreshInterval?: number; // en milisegundos
}

export function useTrajectory({ 
  teamId, 
  enabled = true, 
  refreshInterval = 30000 // 30 segundos por defecto
}: UseTrajectoryOptions) {
  const [trajectory, setTrajectory] = useState<TrajectoryPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrajectory = useCallback(async () => {
    if (!teamId || !enabled) return;

    setLoading(true);
    setError(null);

    try {
      console.log(`🗺️ Fetching trajectory for team: ${teamId}`);
      
      const response = await fetch(`${BACKEND_URL}/api/vehicle/trajectory/${teamId}`);
      
      if (response.ok) {
        const data: TrajectoryData = await response.json();
        console.log(`✅ Trajectory received: ${data.totalPoints} points`);
        setTrajectory(data.trajectory);
      } else {
        const errorData = await response.json();
        console.warn(`❌ Failed to fetch trajectory: ${response.status}`, errorData);
        setError(errorData.message || 'Failed to fetch trajectory');
        setTrajectory([]); // Limpiar trayectoria en caso de error
      }
    } catch (err) {
      console.error('❌ Error fetching trajectory:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setTrajectory([]);
    } finally {
      setLoading(false);
    }
  }, [teamId, enabled]);

  // Fetch inicial
  useEffect(() => {
    fetchTrajectory();
  }, [fetchTrajectory]);

  // Refresh automático
  useEffect(() => {
    if (!enabled || !teamId || !refreshInterval) return;

    const interval = setInterval(fetchTrajectory, refreshInterval);
    
    return () => clearInterval(interval);
  }, [fetchTrajectory, enabled, teamId, refreshInterval]);

  return {
    trajectory,
    loading,
    error,
    refetch: fetchTrajectory
  };
}

