"use client";

import { useEffect, useState, useRef } from 'react';
import { Car, Battery, Gauge, MapPin, Thermometer, Zap } from 'lucide-react';
import VehicleImage from '@/components/vehicle/VehicleImage';
import RealTimeMetrics from '@/components/vehicle/RealTimeMetrics';
import LocationMap from '@/components/vehicle/LocationMap';
import InspectionTableReadOnly from '@/components/inspection/InspectionTableReadOnly';
import io from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export default function Vehicle() {
  // Team selection states
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
  const [vehicleData, setVehicleData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Real-time metrics state
  const [realTimeData, setRealTimeData] = useState<any>(null);
  const socketRef = useRef<any>(null);

  // Load all teams
  const loadAllTeams = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/teams`);
      if (res.ok) {
        const data = await res.json();
        console.log('🏆 All teams data received:', data);
        setTeams(data.teams || []);
      }
    } catch (error) {
      console.error('Error loading teams:', error);
    }
  };

  // Load vehicle by teamId
  const loadVehicleByTeamId = async (teamId: string) => {
    console.log('🚀 loadVehicleByTeamId called with teamId:', teamId);
    if (!teamId) {
      console.log('❌ No teamId provided, returning');
      return;
    }
    console.log('⏳ Setting loading to true');
    setLoading(true);
    try {
      // Load vehicle photo
      const resTeamPhoto = await fetch(`${BACKEND_URL}/api/teams/${teamId}/vehicle-photo`);
      let teamPhotoData = null;
      if (resTeamPhoto.ok) {
        teamPhotoData = await resTeamPhoto.json();
        console.log('🚗 Backend team photo data received:', teamPhotoData);
      }

      // Load team data
      const resTeam = await fetch(`${BACKEND_URL}/api/teams/${teamId}`);
      let teamData = null;
      if (resTeam.ok) {
        teamData = await resTeam.json();
        console.log('🏆 Backend team data received:', teamData);
      }

      // Load vehicle data
      const resVehicle = await fetch(`${BACKEND_URL}/api/vehicle/by-team/${teamId}`);
      console.log('🚗 Vehicle API response status:', resVehicle.status);
      if (resVehicle.ok) {
        const vehicleStatic = await resVehicle.json();
        console.log('🚗 Vehicle static data received:', vehicleStatic);
        let vehicleDynamic = null;
        try {
          const resDynamic = await fetch(`${BACKEND_URL}/api/vehicle/dynamic/${vehicleStatic.vehicle_id}`);
          if (resDynamic.ok) {
            vehicleDynamic = await resDynamic.json();
          }
        } catch {}
        
        // Prioritize photo from new endpoint
        const finalTeamData = {
          ...teamData,
          vehicle_photo: teamPhotoData?.vehicle_photo || teamData?.vehicle_photo
        };
        
        const vehicleData = {
          static: vehicleStatic,
          dynamic: vehicleDynamic,
          team: finalTeamData
        };
        console.log('🚗 Setting vehicle data:', vehicleData);
        setVehicleData(vehicleData);
      } else {
        setVehicleData(null);
        console.log('❌ Failed to load vehicle data');
      }
    } catch (err) {
      setVehicleData(null);
      console.error('❌ Error loading vehicle data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load teams on component mount
  useEffect(() => {
    loadAllTeams();
  }, []);

  // Load vehicle when team is selected
  useEffect(() => {
    console.log('🎯 TEAM SELECTION EFFECT - SelectedTeamId:', selectedTeamId);
    if (selectedTeamId) {
      console.log('🚀 CALLING loadVehicleByTeamId from useEffect');
      loadVehicleByTeamId(selectedTeamId);
    }
  }, [selectedTeamId]);

  // WebSocket logic for real-time updates
  useEffect(() => {
    if (!selectedTeamId) return;
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL);
      socketRef.current.on('connect', () => {
        console.log('[SOCKET FRONTEND] Connected');
      });
      socketRef.current.on('disconnect', () => {
        console.log('[SOCKET FRONTEND] Disconnected');
      });
    }
    const socket = socketRef.current;
    socket.emit('join_team_room', selectedTeamId);

    const handler = (payload: any) => {
      if (payload.team_id === selectedTeamId) {
        // Si location viene vacío pero lat/lng/altitude están en el payload, reconstruir location
        let fixedPayload = { ...payload.data };
        if (
          (!payload.data.location || Object.keys(payload.data.location).length === 0) &&
          (payload.data.lat !== undefined || payload.data.lng !== undefined || payload.data.altitude !== undefined)
        ) {
          fixedPayload.location = {
            lat: payload.data.lat,
            lng: payload.data.lng,
            altitude: payload.data.altitude,
          };
        }
        setRealTimeData(fixedPayload);
      }
    };

    socket.on('vehicle_update', handler);

    return () => {
      socket.emit('leave_team_room', selectedTeamId);
      socket.off('vehicle_update', handler);
    };
  }, [selectedTeamId]);

  // Merge real-time data with static/dynamic data
  const mergedDynamic = {
    current_speed: realTimeData?.speed ?? vehicleData?.dynamic?.current_speed,
    battery_percentage: realTimeData?.battery ?? vehicleData?.dynamic?.battery_percentage,
    voltage: realTimeData?.voltage ?? vehicleData?.dynamic?.voltage,
    temperature: realTimeData?.temperature ?? vehicleData?.dynamic?.temperature,
    current: realTimeData?.current ?? vehicleData?.dynamic?.current,
    power: realTimeData?.power ?? vehicleData?.dynamic?.power,
    average_speed: realTimeData?.average_speed ?? vehicleData?.dynamic?.average_speed,
    distance_traveled: realTimeData?.distance_traveled ?? vehicleData?.dynamic?.distance_traveled,
    odometer: realTimeData?.odometer ?? undefined,
    // location: preferir siempre los valores directos si existen en realTimeData
    location: (() => {
      // Si viene location como objeto válido en realTimeData, úsalo
      if (realTimeData?.location && Object.keys(realTimeData.location).length > 0) {
        return {
          lat: realTimeData.location.lat !== undefined ? Number(realTimeData.location.lat) : undefined,
          lng: realTimeData.location.lng !== undefined ? Number(realTimeData.location.lng) : undefined,
          altitude: realTimeData.location.altitude !== undefined ? Number(realTimeData.location.altitude) : undefined,
        };
      }
      // Si viene lat/lng/altitude directo en realTimeData, úsalo
      if (
        realTimeData?.lat !== undefined ||
        realTimeData?.lng !== undefined ||
        realTimeData?.altitude !== undefined
      ) {
        return {
          lat: realTimeData.lat !== undefined ? Number(realTimeData.lat) : undefined,
          lng: realTimeData.lng !== undefined ? Number(realTimeData.lng) : undefined,
          altitude: realTimeData.altitude !== undefined ? Number(realTimeData.altitude) : undefined,
        };
      }
      // Si no, usa la del backend
      if (vehicleData?.dynamic?.location) {
        return {
          lat: vehicleData.dynamic.location.lat !== undefined ? Number(vehicleData.dynamic.location.lat) : undefined,
          lng: vehicleData.dynamic.location.lng !== undefined ? Number(vehicleData.dynamic.location.lng) : undefined,
          altitude: vehicleData.dynamic.location.altitude !== undefined ? Number(vehicleData.dynamic.location.altitude) : undefined,
        };
      }
      return { lat: undefined, lng: undefined, altitude: undefined };
    })(),
  };

  // Pasar como number | string | undefined, sin conversión innecesaria
  const mergedLat =
    realTimeData?.lat !== undefined && realTimeData?.lat !== null && !isNaN(Number(realTimeData.lat))
      ? realTimeData.lat
      : mergedDynamic.location?.lat !== undefined && mergedDynamic.location?.lat !== null && !isNaN(Number(mergedDynamic.location?.lat))
        ? mergedDynamic.location?.lat
        : undefined;
  const mergedLng =
    realTimeData?.lng !== undefined && realTimeData?.lng !== null && !isNaN(Number(realTimeData.lng))
      ? realTimeData.lng
      : mergedDynamic.location?.lng !== undefined && mergedDynamic.location?.lng !== null && !isNaN(Number(mergedDynamic.location?.lng))
        ? mergedDynamic.location?.lng
        : undefined;
  const mergedAltitude =
    realTimeData?.altitude !== undefined && realTimeData?.altitude !== null && !isNaN(Number(realTimeData.altitude))
      ? realTimeData.altitude
      : mergedDynamic.location?.altitude !== undefined && mergedDynamic.location?.altitude !== null && !isNaN(Number(mergedDynamic.location?.altitude))
        ? mergedDynamic.location?.altitude
        : undefined;

  // Don't block the UI on error, just show empty state
  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 pt-40 pb-12 px-4 sm:px-6 lg:px-8">
  //       <div className="max-w-7xl mx-auto">
  //         <div className="dashboard-card text-red-500">Error: {error}</div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50 pt-40 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Vehicle Panel</h1>
            <p className="text-gray-600">Real-time monitoring and control</p>
          </div>
          <div className="status-approved">
            Vehicle Active
          </div>
        </div>

      {/* Team Selection Dropdown */}
      <div className="dashboard-card">
        <div className="flex items-center space-x-4">
          <label htmlFor="team-select" className="text-sm font-medium text-gray-700">
            Select Team to Monitor:
          </label>
          <select
            id="team-select"
            value={selectedTeamId}
            onChange={(e) => {
              console.log('🔄 TEAM CHANGE - Old:', selectedTeamId, 'New:', e.target.value);
              setSelectedTeamId(e.target.value);
            }}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VehicleImage
          vehiclePhoto={vehicleData?.team?.vehicle_photo}
          vehicleName={vehicleData?.static?.vehicle_name}
          creationYear={vehicleData?.static?.creation_year}
          vehicleWeight={vehicleData?.static?.vehicle_weight}
          maxSpeed={vehicleData?.static?.max_speed}
          isLoading={loading}
          selectedTeamId={selectedTeamId}
          userRole="judge"
          onPhotoUpdate={(newPhotoUrl) => {
            // Update the vehicle data with new photo
            if (vehicleData) {
              setVehicleData({
                ...vehicleData,
                team: {
                  ...vehicleData.team,
                  vehicle_photo: newPhotoUrl
                }
              });
            }
          }}
        />
        <RealTimeMetrics
          speed={mergedDynamic.current_speed}
          gpsSpeed={mergedDynamic.average_speed}
          battery={mergedDynamic.battery_percentage}
          voltage={mergedDynamic.voltage}
          current={mergedDynamic.current}
          power={mergedDynamic.power}
          temperature={mergedDynamic.temperature}
          isLoading={loading}
          teamId={selectedTeamId}
          lat={mergedLat}
          lng={mergedLng}
          altitude={mergedAltitude}
        />
      </div>

      <LocationMap
        lat={mergedLat}
        lng={mergedLng}
        altitude={mergedAltitude}
        distanceTraveled={
          mergedDynamic.distance_traveled !== undefined && mergedDynamic.distance_traveled !== null
            ? `${mergedDynamic.distance_traveled} km`
            : undefined
        }
        averageSpeed={undefined}
        odometer={mergedDynamic.odometer}
        teamId={selectedTeamId}
      />

      {/* Technical Inspection Section - Always visible, below map */}
      {selectedTeamId ? (
        <InspectionTableReadOnly id_team={selectedTeamId} readOnly={true} />
      ) : (
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Inspection Results</h3>
          <div className="text-center py-8">
            <p className="text-gray-500">Select a team to view inspection results</p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}