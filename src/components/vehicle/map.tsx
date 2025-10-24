'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Solución para los iconos de Leaflet en Next.js
// Soluciona el problema de las imágenes no cargadas en SSR
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3774/3774270.png', // Icono de carrito
  iconRetinaUrl: 'https://cdn-icons-png.flaticon.com/512/3774/3774270.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [32, 32], // Tamaño ajustado para el icono de carrito
  iconAnchor: [16, 32], // Punto de anclaje en la base del icono
  popupAnchor: [0, -32], // Posición del popup
  shadowSize: [41, 41]
});

interface TrajectoryPoint {
  lat: number;
  lng: number;
  timestamp: string;
}

interface SimpleMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  trajectory?: TrajectoryPoint[];
}

export default function SimpleMap({ lat, lng, zoom = 19, trajectory }: SimpleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const trajectoryLayerRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    // Asegurarse de que el componente está montado y que window está disponible
    if (!mapRef.current || typeof window === 'undefined') return;

    // Prevenir múltiples inicializaciones
    if (mapInstanceRef.current) return;

    let map: L.Map | null = null;
    let marker: L.Marker | null = null;

    try {
      // Verificar que Leaflet está disponible
      if (typeof L === 'undefined') {
        console.warn('Leaflet not available');
        return;
      }

      // Limpiar cualquier instancia previa del contenedor
      const container = mapRef.current;
      if ((container as any)._leaflet_id) {
        delete (container as any)._leaflet_id;
      }

      // Crear el mapa con opciones optimizadas y zoom máximo
      map = L.map(container, {
        center: [lat, lng],
        zoom: 19,
        zoomControl: true,
        scrollWheelZoom: true,
        preferCanvas: true,
        attributionControl: true
      });
      
      mapInstanceRef.current = map;

      // Agregar capa de tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      // Crear marcador inicial
      marker = L.marker([lat, lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`
          <div style="text-align: center;">
            <strong>Current Position</strong><br>
            Latitude: ${lat.toFixed(6)}<br>
            Longitude: ${lng.toFixed(6)}
          </div>
        `);
      
      markerRef.current = marker;

      // Forzar recálculo del tamaño después del renderizado
      setTimeout(() => {
        if (map && mapRef.current) {
          try {
            map.invalidateSize(true);
          } catch (error) {
            // Silently handle invalidateSize errors
          }
        }
      }, 250);

      // Agregar eventos para garantizar que el mapa se muestra bien
      map.on('load', () => {
        if (map) {
          try {
            map.invalidateSize(true);
          } catch (error) {
            // Silently handle invalidateSize errors
          }
        }
      });
      
      const handleResize = () => {
        if (map && mapRef.current) {
          try {
            map.invalidateSize(true);
          } catch (error) {
            // Silently handle invalidateSize errors
          }
        }
      };
      
      window.addEventListener('resize', handleResize);

      // Cleanup function para remover event listener
      return () => {
        window.removeEventListener('resize', handleResize);
      };

    } catch (error) {
      console.error("Error al inicializar el mapa:", error);
      // Limpiar en caso de error
      if (map) {
        try {
          map.remove();
        } catch (cleanupError) {
          // Silently handle cleanup errors
        }
      }
      mapInstanceRef.current = null;
      markerRef.current = null;
    }

    // Limpiar al desmontar
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
          markerRef.current = null;
        } catch (error) {
          console.warn("Error cleaning up map:", error);
        }
      }
    };
  }, []); // Solo se ejecuta una vez al montar

  // Efecto separado para actualizar posición cuando cambian las coordenadas
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      try {
        const newLatLng = new L.LatLng(lat, lng);
        
        // Actualizar posición del marcador
        markerRef.current.setLatLng(newLatLng);
        
        // Actualizar popup con nueva información
        markerRef.current.bindPopup(`
          <div style="text-align: center;">
            <strong>Current Position</strong><br>
            Latitude: ${lat.toFixed(6)}<br>
            Longitude: ${lng.toFixed(6)}
          </div>
        `);
        
        // Actualizar vista del mapa para centrar en la nueva posición con zoom máximo
        mapInstanceRef.current.setView(newLatLng, 19);
        
        // Forzar actualización del tamaño
        if (mapRef.current) {
          mapInstanceRef.current.invalidateSize(true);
        }
      } catch (error) {
        console.warn("Error updating map position:", error);
      }
    }
  }, [lat, lng]); // Removido zoom de las dependencias para mantener zoom 19

  // Efecto separado para manejar la trayectoria
  useEffect(() => {
    if (!mapInstanceRef.current || !trajectory || trajectory.length < 2) {
      // Si no hay mapa o trayectoria insuficiente, limpiar la línea existente
      if (trajectoryLayerRef.current) {
        mapInstanceRef.current?.removeLayer(trajectoryLayerRef.current);
        trajectoryLayerRef.current = null;
      }
      return;
    }

    try {
      // Limpiar trayectoria anterior
      if (trajectoryLayerRef.current) {
        mapInstanceRef.current.removeLayer(trajectoryLayerRef.current);
      }

      // Crear array de coordenadas para la polilínea
      const latLngs: L.LatLng[] = trajectory.map(point => new L.LatLng(point.lat, point.lng));

      // Crear la polilínea con estilo
      const polyline = new L.Polyline(latLngs, {
        color: '#3b82f6', // Azul
        weight: 4,
        opacity: 0.8,
        smoothFactor: 1,
        dashArray: '5, 10' // Línea punteada
      });

      // Agregar la polilínea al mapa
      polyline.addTo(mapInstanceRef.current);
      trajectoryLayerRef.current = polyline;

      // Agregar popup con información de la trayectoria
      polyline.bindPopup(`
        <div style="text-align: center;">
          <strong>🗺️ Trajectory</strong><br>
          <span style="color: #3b82f6;">Last 15 minutes</span><br>
          ${trajectory.length} GPS points
        </div>
      `);

      console.log(`🗺️ Trajectory displayed with ${trajectory.length} points`);

    } catch (error) {
      console.warn("Error updating trajectory:", error);
    }
  }, [trajectory]);

  // Limpiar trayectoria al desmontar
  useEffect(() => {
    return () => {
      if (trajectoryLayerRef.current && mapInstanceRef.current) {
        try {
          mapInstanceRef.current.removeLayer(trajectoryLayerRef.current);
          trajectoryLayerRef.current = null;
        } catch (error) {
          console.warn("Error cleaning up trajectory:", error);
        }
      }
    };
  }, []);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full"
      style={{ 
        height: '100%', 
        minHeight: '300px',
        maxWidth: '100%'
      }}
    />
  );
}
