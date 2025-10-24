import { useEffect, useRef, useState, useCallback } from 'react';
import io from 'socket.io-client';
import { SOCKET_URL } from '@/lib/apiConfig';

interface VehicleRealtimeData {
  speed?: number;
  battery?: number;
  voltage?: number;
  temperature?: number;
  current?: number;
  power?: number;
  lat?: number;
  lng?: number;
  altitude?: number;
  location?: {
    lat?: number;
    lng?: number;
    altitude?: number;
  };
  distance_traveled?: number;
  average_speed?: number;
  odometer?: number;
}

interface UseVehicleWebSocketOptions {
  teamId?: string;
  enabled?: boolean;
}

export function useVehicleWebSocket({ teamId, enabled = true }: UseVehicleWebSocketOptions) {
  const socketRef = useRef<any>(null);
  const [realtimeData, setRealtimeData] = useState<VehicleRealtimeData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // 🔧 URL del socket desde configuración centralizada

  // Helper function to get the last value from array or return the value directly
  const getLastValue = useCallback((val: any) => {
    if (Array.isArray(val)) {
      return val.length > 0 ? val[val.length - 1] : undefined;
    }
    return val;
  }, []);

  const connect = useCallback(() => {
    if (!teamId || !enabled) return;

    // Clean up existing connection
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    try {
      const socket = io(SOCKET_URL, {
        transports: ['websocket'],
        path: '/socket.io',
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
        timeout: 20000,
      });

      socketRef.current = socket;

      socket.on('connect', () => {
        // console.log('[WebSocket] Connected to server');
        setIsConnected(true);
        setConnectionError(null);
        socket.emit('join_team_room', teamId);
      });

      socket.on('disconnect', (reason: any) => {
        // console.log('[WebSocket] Disconnected:', reason);
        setIsConnected(false);
      });

      socket.on('connect_error', (error: any) => {
        console.error('[WebSocket] Connection error:', error);
        setConnectionError(error.message);
        setIsConnected(false);
      });

      socket.on('vehicle_update', (payload: any) => {
        if (payload?.team_id === teamId && payload.data) {
          // Process the received data with robust validation
          const processedData: VehicleRealtimeData = {
            speed: payload.data.speed !== undefined ? Number(getLastValue(payload.data.speed)) : undefined,
            battery: payload.data.battery !== undefined ? Number(getLastValue(payload.data.battery)) : undefined,
            voltage: payload.data.voltage !== undefined ? Number(getLastValue(payload.data.voltage)) : undefined,
            temperature: payload.data.temperature !== undefined ? Number(getLastValue(payload.data.temperature)) : undefined,
            current: payload.data.current !== undefined ? Number(getLastValue(payload.data.current)) : undefined,
            power: payload.data.power !== undefined ? Number(getLastValue(payload.data.power)) : undefined,
            distance_traveled: payload.data.distance_traveled !== undefined ? Number(getLastValue(payload.data.distance_traveled)) : undefined,
            average_speed: (() => {
              const rawValue = getLastValue(payload.data.average_speed);
              if (rawValue !== undefined && rawValue !== null && rawValue !== '') {
                const parsed = Number(rawValue);
                return (!isNaN(parsed) && isFinite(parsed)) ? parsed : undefined;
              }
              return undefined;
            })(),
            odometer: (() => {
              const rawValue = getLastValue(payload.data.odometer);
              if (rawValue !== undefined && rawValue !== null && rawValue !== '') {
                const parsed = Number(rawValue);
                return (!isNaN(parsed) && isFinite(parsed)) ? parsed : undefined;
              }
              return undefined;
            })(),
          };

          // Handle location data - prioritize direct lat/lng/altitude over location object
          if (payload.data.lat !== undefined || payload.data.lng !== undefined || payload.data.altitude !== undefined) {
            processedData.lat = payload.data.lat !== undefined ? Number(getLastValue(payload.data.lat)) : undefined;
            processedData.lng = payload.data.lng !== undefined ? Number(getLastValue(payload.data.lng)) : undefined;
            processedData.altitude = payload.data.altitude !== undefined ? Number(getLastValue(payload.data.altitude)) : undefined;
            
            // Also create location object for compatibility
            processedData.location = {
              lat: processedData.lat,
              lng: processedData.lng,
              altitude: processedData.altitude,
            };
          } else if (payload.data.location) {
            const location = getLastValue(payload.data.location);
            if (location) {
              processedData.lat = location.lat !== undefined ? Number(location.lat) : undefined;
              processedData.lng = location.lng !== undefined ? Number(location.lng) : undefined;
              processedData.altitude = location.altitude !== undefined ? Number(location.altitude) : undefined;
              processedData.location = {
                lat: processedData.lat,
                lng: processedData.lng,
                altitude: processedData.altitude,
              };
            }
          }

          // 🔍 DEBUG: Log detallado GPS Speed y Odometer
          console.log(`🚗 [Frontend WebSocket] Raw payload data:`, payload.data);
          console.log(`🚗 [Frontend WebSocket] average_speed raw: ${payload.data.average_speed}, processed: ${processedData.average_speed}`);
          console.log(`🚗 [Frontend WebSocket] odometer raw: ${payload.data.odometer}, processed: ${processedData.odometer}`);
          console.log(`🚗 [Frontend WebSocket] voltage for comparison: ${processedData.voltage}`);
          
          setRealtimeData(processedData);
        }
      });

    } catch (error) {
      console.error('[WebSocket] Failed to create connection:', error);
      setConnectionError(error instanceof Error ? error.message : 'Failed to connect');
    }
  }, [teamId, enabled, SOCKET_URL, getLastValue]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit('leave_team_room', teamId);
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setIsConnected(false);
    setRealtimeData(null);
  }, [teamId]);

  // Effect to manage connection
  useEffect(() => {
    if (teamId && enabled) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [teamId, enabled, connect, disconnect]);

  return {
    realtimeData,
    isConnected,
    connectionError,
    connect,
    disconnect,
  };
}
