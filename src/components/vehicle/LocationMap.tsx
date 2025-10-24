'use client';

import { MapPin, Navigation, Globe, Gauge } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useTrajectory } from '@/hooks/useTrajectory';

// Importa el mapa dinámicamente para evitar SSR
const SimpleMap = dynamic(() => import('@/components/vehicle/map'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
        <p className="text-sm text-gray-500">Loading map...</p>
      </div>
    </div>
  )
});

interface LocationMapProps {
  lat?: number | string;
  lng?: number | string;
  altitude?: number | string;
  distanceTraveled?: string;
  averageSpeed?: string;
  odometer?: number | string;
  teamId?: string;
}

export default function LocationMap({
  lat,
  lng,
  altitude,
  distanceTraveled,
  averageSpeed,
  odometer,
  teamId,
}: LocationMapProps) {
  // Asegura que los valores sean numéricos para el mapa
  const latNum = useMemo(() => lat !== undefined ? Number(lat) : undefined, [lat]);
  const lngNum = useMemo(() => lng !== undefined ? Number(lng) : undefined, [lng]);

  // Obtener trayectoria GPS
  const { trajectory, loading: trajectoryLoading, error: trajectoryError } = useTrajectory({
    teamId,
    enabled: !!teamId,
    refreshInterval: 30000 // Actualizar cada 30 segundos
  });

  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-primary" />
          Vehicle Location
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-green-600 font-medium">Live Tracking</span>
          {trajectory.length > 0 && (
            <div className="flex items-center space-x-1 ml-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-xs text-blue-600 font-medium">Trajectory ({trajectory.length}pts)</span>
            </div>
          )}
          {trajectoryLoading && (
            <div className="flex items-center space-x-1 ml-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-spin" />
              <span className="text-xs text-gray-500">Loading path...</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="space-y-2 lg:col-span-2">
          <div className="p-2.5 bg-blue-50 rounded-lg">
            <div className="flex items-center mb-1.5">
              <Globe className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-semibold text-blue-900">Current Position</span>
            </div>
            <div className="space-y-0.5 text-sm">
              <p><span className="text-gray-500">Latitude:</span> {lat !== undefined && lat !== null && lat !== '' ? Number(lat).toFixed(6) : '--'}</p>
              <p><span className="text-gray-500">Longitude:</span> {lng !== undefined && lng !== null && lng !== '' ? Number(lng).toFixed(6) : '--'}</p>
              {/* Altitude hidden by request */}
            </div>
          </div>

          {/* Odometer Section */}
          <div className="p-2.5 bg-green-50 rounded-lg">
            <div className="flex items-center mb-1.5">
              <Gauge className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-semibold text-green-900">Odometer</span>
            </div>
            <div className="text-sm">
              <p><span className="text-gray-500">Total Distance:</span> <span className="font-semibold">{odometer !== undefined && odometer !== null && odometer !== '' ? `${Number(odometer).toFixed(2)} km` : '--'}</span></p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 border-2 border-gray-100 rounded-xl overflow-hidden shadow-md" style={{ height: '330px', position: 'relative', zIndex: 1 }}>
          {(latNum !== undefined && lngNum !== undefined && !isNaN(latNum) && !isNaN(lngNum)) ? (
            <SimpleMap 
              lat={latNum} 
              lng={lngNum} 
              zoom={19} 
              trajectory={trajectory}
            />
          ) : (
            <SimpleMap 
              lat={4.710989} 
              lng={-74.072092} 
              zoom={19}
              trajectory={trajectory}
            />
          )}
        </div>
      </div>
    </div>
  );
}