import React, { useEffect, useState } from 'react';
import { Car, Edit3 } from 'lucide-react';

interface VehicleImageProps {
  vehiclePhoto?: string;
  vehicleName?: string;
  creationYear?: string;
  vehicleWeight?: string;
  maxSpeed?: string;
  isLoading: boolean;
  selectedTeamId?: string;
  userRole?: string;
  onPhotoUpdate?: (newPhotoUrl: string) => void;
}

export default function VehicleImage({
  vehiclePhoto: propVehiclePhoto,
  vehicleName,
  creationYear,
  vehicleWeight,
  maxSpeed,
  isLoading,
  selectedTeamId,
  userRole,
  onPhotoUpdate,
}: VehicleImageProps) {
  const [vehiclePhoto, setVehiclePhoto] = useState(propVehiclePhoto);
  const [isUploading, setIsUploading] = useState(false);

  // Actualizar la imagen cuando cambie
  useEffect(() => {
    console.log('🖼️ VehicleImage Debug:');
    console.log('📸 Prop vehicle photo:', propVehiclePhoto);
    console.log('🔍 Type of propVehiclePhoto:', typeof propVehiclePhoto);
    
    if (propVehiclePhoto) {
      console.log('✅ Using prop vehicle photo:', propVehiclePhoto);
      setVehiclePhoto(propVehiclePhoto);
    } else {
      console.log('❌ No vehicle photo available');
      setVehiclePhoto(undefined);
    }
  }, [propVehiclePhoto]);

  // 🔧 Log adicional para verificar el estado actual
  useEffect(() => {
    console.log('🎯 Final vehicle photo state updated to:', vehiclePhoto);
  }, [vehiclePhoto]);

  // Función para manejar la subida de foto (solo para judges)
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedTeamId || userRole !== 'judge') return;

    console.log('📤 Judge uploading new photo for team:', selectedTeamId);
    setIsUploading(true);
    
    try {
      // Crear FormData para la subida
      const formData = new FormData();
      formData.append('file', file);
      formData.append('teamId', selectedTeamId);
      
      // Subir la imagen
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/api/teams/upload-vehicle-photo`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Photo uploaded successfully:', result);
        
        // Actualizar la imagen local
        setVehiclePhoto(result.vehicle_photo);
        
        // Notificar al componente padre
        if (onPhotoUpdate) {
          onPhotoUpdate(result.vehicle_photo);
        }
      } else {
        console.error('❌ Failed to upload photo:', response.status);
      }
    } catch (error) {
      console.error('❌ Error uploading photo:', error);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="dashboard-card">
      {isLoading || isUploading ? (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          {isUploading && <p className="ml-2 text-sm text-gray-600">Uploading...</p>}
        </div>
       ) : vehiclePhoto ? (
         <div className="w-full h-56 rounded-lg flex items-center justify-center bg-gray-50">
           <img
             src={vehiclePhoto}
             alt="Electric Racing Vehicle"
             className="max-w-full max-h-full object-contain"
           />
         </div>
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg">
          <div className="text-center text-gray-500">
            <Car className="w-16 h-16 mx-auto text-gray-400 mb-2" />
            <p className="text-sm">No Image Available</p>
          </div>
        </div>
      )}

       <div className="mt-2 space-y-2">
         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100">
           <div className="flex items-center justify-between">
             <div>
               <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Vehicle Name</p>
               <p className="text-base font-bold text-gray-900">{isLoading ? '--' : vehicleName ?? '--'}</p>
             </div>
             <div className="text-right">
               <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Year</p>
               <p className="text-base font-bold text-gray-900">{isLoading ? '--' : creationYear ?? '--'}</p>
             </div>
           </div>
         </div>
         
         <div className="grid grid-cols-2 gap-3">
           <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-100">
             <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Weight</p>
             <p className="text-lg font-bold text-gray-900">{isLoading ? '--' : vehicleWeight ?? '--'} kg</p>
           </div>
           <div className="bg-gradient-to-r from-red-50 to-pink-50 p-3 rounded-lg border border-red-100">
             <p className="text-xs text-red-600 font-medium uppercase tracking-wide">Max Speed</p>
             <p className="text-lg font-bold text-gray-900">{isLoading ? '--' : maxSpeed ?? '--'} km/h</p>
           </div>
         </div>
       </div>
    </div>
  );
}