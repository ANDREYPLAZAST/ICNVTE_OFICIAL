'use client';

import { Battery, Gauge, Thermometer, Zap, TrendingUp, BarChart3, X, Activity, Cpu, Navigation, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useVehicleWebSocket } from '@/hooks/useVehicleWebSocket';
import { BACKEND_URL, debugApiConfig } from '@/lib/apiConfig';
import * as XLSX from 'xlsx';

interface RealTimeMetricsProps {
  speed?: string | number;
  gpsSpeed?: string | number;
  battery?: string | number;
  voltage?: string | number;
  current?: string | number;
  power?: string | number;
  temperature?: string | number;
  isLoading: boolean;
  teamId?: string;
  lat?: number | string;
  lng?: number | string;
  altitude?: number | string;
}

interface HistoricalData {
  speed: Array<{ value: number; timestamp: string }>;
  gpsSpeed: Array<{ value: number; timestamp: string }>;
  battery: Array<{ value: number; timestamp: string }>;
  voltage: Array<{ value: number; timestamp: string }>;
  current: Array<{ value: number; timestamp: string }>;
  power: Array<{ value: number; timestamp: string }>;
  temperature: Array<{ value: number; timestamp: string }>;
}

const Metric = ({
  value,
  unit,
  isLoading,
  onClick
}: {
  value?: string | number;
  unit: string;
  isLoading: boolean;
  onClick?: () => void;
}) => {
  const displayValue = () => {
    if (isLoading) return '--';
    if (value === undefined || value === null) return '--';
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '--';
    return numValue % 1 === 0 ? numValue.toString() : numValue.toFixed(1);
  };

  // 🔍 DEBUG: Log para métricas específicas
  if (unit === 'km/h' || unit === 'km') {
    console.log(`🔍 [Metric] Value: ${value}, Unit: ${unit}, Type: ${typeof value}, Display: ${displayValue()}`);
  }

  return (
    <div
      // className="cursor-pointer hover:opacity-80 transition-opacity"
      // onClick={onClick}
    >
      {displayValue()} <span className="text-sm font-normal text-gray-500">{unit}</span>
    </div>
  );
};

// Función para obtener el color y configuración del gráfico según la métrica
const getMetricConfig = (metric: string) => {
  const configs = {
    speed: { color: '#2563eb', name: 'Speed (km/h)', unit: 'km/h' },
    gpsSpeed: { color: '#0ea5e9', name: 'GPS Speed (km/h)', unit: 'km/h' },
    battery: { color: '#16a34a', name: 'Battery (%)', unit: '%' },
    voltage: { color: '#9333ea', name: 'Voltage (V)', unit: 'V' },
    temperature: { color: '#ea580c', name: 'Temperature (°C)', unit: '°C' },
    current: { color: '#dc2626', name: 'Current (A)', unit: 'A' },
    power: { color: '#ca8a04', name: 'Power (W)', unit: 'W' }
  };
  return configs[metric as keyof typeof configs] || { color: '#6b7280', name: metric, unit: '' };
};

// Constante para conversión de UTC a Colombia (UTC-5)
const COLOMBIA_OFFSET_MS = 5 * 60 * 60 * 1000; // 5 horas en milisegundos

export default function RealTimeMetrics({
  speed,
  gpsSpeed,
  battery,
  voltage,
  current,
  power,
  temperature,
  isLoading,
  teamId,
  lat,
  lng,
  altitude,
}: RealTimeMetricsProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalMetric, setModalMetric] = useState<string>('');
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(null);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [realtimeData, setRealtimeData] = useState<any>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(0);
  const [timeFilter, setTimeFilter] = useState<string>('1hour');
  const [chartLoading, setChartLoading] = useState(false);
  const [chartKey, setChartKey] = useState(0);

  // 🔧 URL del backend desde configuración centralizada
  
  // 🔄 NUEVO: WebSocket para datos en tiempo real
  const { realtimeData: wsData } = useVehicleWebSocket({ 
    teamId: teamId || undefined, 
    enabled: showModal // Solo activar cuando el modal esté abierto
  });

  const fetchHistoricalData = async (metric: string) => {
    if (!teamId) {
      console.log('❌ No teamId provided for historical data');
      return;
    }
    setLoadingHistory(true);
    
    // 🔧 Debug de configuración de API
    debugApiConfig();
    
    console.log(`📊 Fetching historical data from RTDB for metric: ${metric}, teamId: ${teamId}`);
    console.log(`🌐 Using backend URL: ${BACKEND_URL}`);
    console.log(`🔗 Full URL: ${BACKEND_URL}/api/vehicle/history-rtdb/${teamId}/${metric}`);
    console.log(`📝 TeamId type: ${typeof teamId}, length: ${teamId?.length}`);
    
    try {
      // 🔄 NUEVO: Usar endpoint de Realtime Database
      console.log(`🚀 FETCHING ALL DATA for ${metric} from backend...`);
      const response = await fetch(`${BACKEND_URL}/api/vehicle/history-rtdb/${teamId}/${metric}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // No timeout para permitir respuestas grandes
      });
      console.log(`📡 Response status: ${response.status}`);
      console.log(`📡 Response headers:`, Object.fromEntries(response.headers.entries()));
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Historical data from RTDB received:`, data);
        console.log(`📊 Data keys:`, Object.keys(data));
        console.log(`🔥 RESPONSE SIZE: ${JSON.stringify(data).length} characters`);
        
        if (data[metric]) {
          console.log(`✅ Metric ${metric} found with ${data[metric].length} points`);
          console.log(`📅 Sample timestamps:`, data[metric].slice(0, 3).map((item: any) => item.timestamp));
          console.log(`📊 Sample values:`, data[metric].slice(0, 3).map((item: any) => item.value));
          console.log(`🔥 TOTAL POINTS RECEIVED FROM BACKEND: ${data[metric].length}`);
          console.log(`🔥 FIRST TIMESTAMP: ${data[metric][0]?.timestamp}`);
          console.log(`🔥 LAST TIMESTAMP: ${data[metric][data[metric].length - 1]?.timestamp}`);
        } else {
          console.log(`❌ Metric ${metric} not found in response`);
          console.log(`❌ Available metrics:`, Object.keys(data));
        }
        
        setHistoricalData(data);
      } else {
        const errorText = await response.text();
        console.log(`❌ Failed to fetch historical data from RTDB: ${response.status}`);
        console.log(`❌ Error response:`, errorText);
        // Fallback al endpoint original si RTDB falla
        const fallbackResponse = await fetch(`${BACKEND_URL}/api/vehicle/history/${teamId}/${metric}`);
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          console.log(`✅ Fallback historical data received:`, fallbackData);
          setHistoricalData(fallbackData);
        }
      }
    } catch (error) {
      console.error('❌ Error fetching historical data:', error);
    } finally {
      setLoadingHistory(false);
    }
  };

  // 🔄 NUEVO: Actualizar datos en tiempo real cuando cambie WebSocket
  useEffect(() => {
    if (wsData && showModal && modalMetric) {
      const now = Date.now();
      // Throttle updates to prevent too frequent updates (máximo cada 1 segundo)
      if (now - lastUpdateTime < 1000) {
        return;
      }
      
      console.log('🔄 Updating real-time data in modal:', wsData);
      setRealtimeData(wsData);
      setLastUpdateTime(now);
      
      // Actualizar el valor actual en el gráfico histórico
      const currentValue = getCurrentValueFromRealtime(modalMetric, wsData);
      if (currentValue !== null) {
        const newDataPoint = {
          value: currentValue,
          timestamp: new Date().toISOString()
        };
        
        setHistoricalData(prev => {
          if (!prev) return prev;
          const updated = { ...prev };
          const metricArray = [...(updated[modalMetric as keyof HistoricalData] || [])];
          metricArray.push(newDataPoint);
          // 🔥 CARGAR TODOS LOS PUNTOS - Sin límite artificial
          updated[modalMetric as keyof HistoricalData] = metricArray;
          return updated;
        });
      }
    }
  }, [wsData, showModal, modalMetric, lastUpdateTime]); // Agregué lastUpdateTime para el throttling

  // 📊 LOGS AL ABRIR EL MODAL - Mostrar información de datos cargados
  useEffect(() => {
    if (historicalData && modalMetric) {
      const metricData = historicalData[modalMetric as keyof HistoricalData];
      
      if (metricData && Array.isArray(metricData)) {
        console.log(`🚀 MODAL ABIERTO - Información de datos:`);
        console.log(`📊 Puntos cargados para ${modalMetric}: ${metricData.length}`);
        
        // Mostrar updatedAt (timestamp más reciente)
        if (metricData.length > 0) {
          const mostRecentTimestamp = metricData[0].timestamp;
          console.log(`🕒 updatedAt (timestamp más reciente): ${mostRecentTimestamp}`);
          
          // Convertir a Colombia para mostrar
          const mostRecentUTC = new Date(mostRecentTimestamp);
          const mostRecentColombia = new Date(mostRecentUTC.getTime() - COLOMBIA_OFFSET_MS);
          console.log(`🇨🇴 updatedAt en Colombia: ${mostRecentColombia.toISOString()}`);
        }
        
        // Mostrar información del array timestamp si está disponible
        // Nota: El timestamp array viene del backend, aquí solo tenemos los datos ya procesados
        console.log(`📋 Array timestamp: Los datos ya están procesados con timestamps individuales`);
        console.log(`📈 Rango de datos: ${metricData.length > 0 ? metricData[0].timestamp : 'N/A'} a ${metricData.length > 0 ? metricData[metricData.length - 1].timestamp : 'N/A'}`);
      } else {
        console.log(`❌ No hay datos disponibles para ${modalMetric}`);
      }
    }
  }, [historicalData, modalMetric]);

  // Helper para obtener el valor actual de la métrica desde datos en tiempo real
  const getCurrentValueFromRealtime = (metric: string, data: any): number | null => {
    const metricMapping: { [key: string]: string } = {
      speed: 'speed',
      gpsSpeed: 'average_speed',
      battery: 'battery',
      voltage: 'voltage',
      temperature: 'temperature',
      current: 'current',
      power: 'power'
    };
    
    const field = metricMapping[metric];
    if (field && data[field] !== undefined) {
      return Number(data[field]);
    }
    return null;
  };

  // Helper para filtrar datos por tiempo - CORREGIDO para respetar rangos reales
  const filterDataByTime = (data: Array<{ value: number; timestamp: string }>, filter: string): Array<{ value: number; timestamp: string }> => {
    if (!data || data.length === 0) return data;
    
    console.log(`🔥 filterDataByTime INPUT: ${data.length} points`);
    
    // Ordenar datos por timestamp (más reciente primero)
    const sortedData = [...data].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    console.log(`🔥 filterDataByTime SORTED: ${sortedData.length} points`);
    
    // CONVERTIR DE UTC A HORA DE COLOMBIA (UTC-5)
    // Los timestamps vienen en UTC, necesitamos ajustar a Colombia
    
    // 🔥 USAR EL TIMESTAMP MÁS RECIENTE DE LOS DATOS COMO REFERENCIA
    const nowUTC = new Date();
    const nowColombia = new Date(nowUTC.getTime() - COLOMBIA_OFFSET_MS);
    // Usar el timestamp más reciente de los datos como referencia para el filtrado
    const mostRecentDataUTC = new Date(sortedData[0].timestamp);
    const mostRecentDataColombia = new Date(mostRecentDataUTC.getTime() - COLOMBIA_OFFSET_MS);
    
    // 🔥 NUEVO: Usar el timestamp más reciente de la mayoría de datos (ignorar outliers)
    // Buscar el timestamp más reciente que tenga al menos 100 puntos de datos
    let referenceIndex = 0;
    let referenceDataUTC = new Date(sortedData[0].timestamp);
    
    // Si hay suficientes datos, buscar un punto de referencia más estable
    if (sortedData.length > 1000) {
      // Usar el percentil 90 para tener más datos en el filtro
      referenceIndex = Math.floor(sortedData.length * 0.1); // 10% más reciente
      referenceDataUTC = new Date(sortedData[referenceIndex].timestamp);
    } else if (sortedData.length > 100) {
      // Para conjuntos más pequeños, usar el percentil 80
      referenceIndex = Math.floor(sortedData.length * 0.2); // 20% más reciente
      referenceDataUTC = new Date(sortedData[referenceIndex].timestamp);
    }
    
    const referenceDataColombia = new Date(referenceDataUTC.getTime() - COLOMBIA_OFFSET_MS);
    
    // Usar este timestamp como referencia para evitar puntos outliers
    const referenceTime = referenceDataColombia;
    
    console.log(`🌍 Current time (UTC): ${nowUTC.toISOString()}`);
    console.log(`🇨🇴 Current time (Colombia): ${nowColombia.toISOString()}`);
    console.log(`📊 Total data points available: ${sortedData.length}`);
    console.log(`🔥 Most recent data time (UTC): ${mostRecentDataUTC.toISOString()}`);
    console.log(`🔥 Most recent data time (Colombia): ${mostRecentDataColombia.toISOString()}`);
    console.log(`📊 Reference data time (UTC): ${referenceDataUTC.toISOString()}`);
    console.log(`📊 Reference data time (Colombia): ${referenceDataColombia.toISOString()}`);
    console.log(`🎯 Using reference time for filtering: ${referenceTime.toISOString()}`);
    console.log(`📈 Reference index: ${referenceIndex} out of ${sortedData.length} points`);
    
    // Usar el timestamp más reciente de los datos como referencia para el filtrado
    let cutoffTime: Date;
    
    // Calcular tiempo de corte basado en el filtro seleccionado desde el timestamp más reciente de los datos
    switch (filter) {
      case 'all':
        // Mostrar TODOS los datos disponibles - usar fecha muy antigua
        cutoffTime = new Date('2020-01-01'); // Desde 2020 (incluye todo)
        console.log(`🎯 ALL filter: Showing all ${sortedData.length} data points`);
        break;
      case '15min':
        cutoffTime = new Date(referenceTime.getTime() - 15 * 60 * 1000);
        break;
      case '30min':
        cutoffTime = new Date(referenceTime.getTime() - 30 * 60 * 1000);
        console.log(`⏰ 30min filter: referenceTime=${referenceTime.toISOString()}`);
        console.log(`⏰ 30min filter: cutoffTime=${cutoffTime.toISOString()}`);
        console.log(`⏰ 30min filter: range=${((referenceTime.getTime() - cutoffTime.getTime()) / (1000 * 60)).toFixed(1)} minutes`);
        break;
      case '1hour':
        cutoffTime = new Date(referenceTime.getTime() - 1 * 60 * 60 * 1000);
        console.log(`⏰ 1hour filter: referenceTime=${referenceTime.toISOString()}`);
        console.log(`⏰ 1hour filter: cutoffTime=${cutoffTime.toISOString()}`);
        console.log(`⏰ 1hour filter: range=${((referenceTime.getTime() - cutoffTime.getTime()) / (1000 * 60)).toFixed(1)} minutes`);
        break;
      case '2hours':
        cutoffTime = new Date(referenceTime.getTime() - 2 * 60 * 60 * 1000);
        break;
      case '3hours':
        cutoffTime = new Date(referenceTime.getTime() - 3 * 60 * 60 * 1000);
        console.log(`⏰ 3hours filter: referenceTime=${referenceTime.toISOString()}`);
        console.log(`⏰ 3hours filter: cutoffTime=${cutoffTime.toISOString()}`);
        console.log(`⏰ 3hours filter: range=${((referenceTime.getTime() - cutoffTime.getTime()) / (1000 * 60)).toFixed(1)} minutes`);
        break;
      case '6hours':
        cutoffTime = new Date(referenceTime.getTime() - 6 * 60 * 60 * 1000);
        break;
      case '12hours':
        cutoffTime = new Date(referenceTime.getTime() - 12 * 60 * 60 * 1000);
        break;
      case '1day':
        cutoffTime = new Date(referenceTime.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '3days':
        cutoffTime = new Date(referenceTime.getTime() - 3 * 24 * 60 * 60 * 1000);
        break;
      case '1week':
        cutoffTime = new Date(referenceTime.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      default:
        cutoffTime = new Date(referenceTime.getTime() - 3 * 60 * 60 * 1000);
        break;
    }
    
    console.log(`🕒 Filtering data with filter: ${filter}, Reference time: ${referenceTime.toISOString()}`);
    console.log(`⏰ Cutoff time for ${filter}: ${cutoffTime.toISOString()}`);
    console.log(`📋 Total data available: ${sortedData.length} items`);
    
    // Mostrar rango de datos disponibles
    if (sortedData.length > 0) {
      const oldestItem = sortedData[sortedData.length - 1];
      const newestItem = sortedData[0];
      console.log(`📅 Data range: ${oldestItem.timestamp} to ${newestItem.timestamp}`);
      console.log(`📅 Oldest: ${new Date(oldestItem.timestamp).toISOString()}`);
      console.log(`📅 Newest: ${new Date(newestItem.timestamp).toISOString()}`);
    }
    
    // Filtrar datos por tiempo real - CONVERTIR UTC A COLOMBIA
    const timeFilteredData = sortedData.filter(item => {
      // Convertir timestamp UTC del item a hora de Colombia
      const itemDateUTC = new Date(item.timestamp);
      const itemDateColombia = new Date(itemDateUTC.getTime() - COLOMBIA_OFFSET_MS);
      const isInRange = itemDateColombia >= cutoffTime;
      
      // Debug para los primeros y últimos elementos
      const index = sortedData.indexOf(item);
      if (index < 5 || index >= sortedData.length - 5) {
        console.log(`📅 Item ${index}: ${item.timestamp}`);
        console.log(`   UTC: ${itemDateUTC.toISOString()}`);
        console.log(`   COL: ${itemDateColombia.toISOString()}`);
        console.log(`   ${isInRange ? 'INCLUDED' : 'EXCLUDED'}`);
      }
      
      return isInRange;
    });
    
    console.log(`📊 Time filtered: ${sortedData.length} items to ${timeFilteredData.length} items for filter: ${filter}`);
    
    // Si hay muy pocos datos filtrados, mostrar por qué
    if (timeFilteredData.length < 10 && sortedData.length > 100) {
      console.log(`⚠️ WARNING: Very few data points after filtering!`);
      console.log(`⚠️ This might indicate a timezone or time filtering issue`);
      console.log(`⚠️ Cutoff Colombia: ${cutoffTime.toISOString()}`);
      console.log(`⚠️ Reference time: ${referenceTime.toISOString()}`);
      
      // Mostrar algunos timestamps para debug
      const sampleItems = sortedData.slice(0, 10);
      sampleItems.forEach((item, idx) => {
        const itemDateUTC = new Date(item.timestamp);
        const itemDateColombia = new Date(itemDateUTC.getTime() - COLOMBIA_OFFSET_MS);
        const diff = (referenceTime.getTime() - itemDateColombia.getTime()) / (1000 * 60); // diferencia en minutos
        console.log(`⚠️ Sample ${idx}: ${item.timestamp}`);
        console.log(`   UTC: ${itemDateUTC.toISOString()}`);
        console.log(`   COL: ${itemDateColombia.toISOString()} (${diff.toFixed(1)} min ago)`);
      });
    }
    
    // FORZAR FILTRADO TEMPORAL CORRECTO - SIN FALLBACKS
    // Ordenar cronológicamente para el gráfico
    const finalData = timeFilteredData.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    console.log(`✅ STRICT TIME FILTERING for ${filter}: ${finalData.length} points from ${finalData.length > 0 ? finalData[0].timestamp : 'N/A'} to ${finalData.length > 0 ? finalData[finalData.length - 1].timestamp : 'N/A'}`);
    
    return finalData;
  };


  const openModal = (metric: string) => {
    // console.log(`🔓 Opening modal for metric: ${metric}`);
    // console.log(`👥 TeamId available: ${teamId}`);
    setModalMetric(metric);
    setShowModal(true);
    fetchHistoricalData(metric);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMetric('');
    setHistoricalData(null);
    setRealtimeData(null);
    setLastUpdateTime(0);
    setTimeFilter('1hour');
  };

  // Función para exportar datos a Excel
  const exportToExcel = () => {
    if (!historicalData || !modalMetric || !historicalData[modalMetric as keyof HistoricalData]) {
      alert('No hay datos disponibles para exportar');
      return;
    }

    // 📊 EXCEL SIEMPRE EXPORTA TODOS LOS DATOS (sin filtrar por tiempo)
    const rawMetricData = historicalData[modalMetric as keyof HistoricalData];
    const allData = rawMetricData; // Usar todos los datos sin filtrar
    
    if (allData.length === 0) {
      alert('No hay datos disponibles para exportar');
      return;
    }

    // Preparar datos para Excel
    const excelData = allData.map((item, index) => ({
      'Punto': index + 1,
      'Fecha y Hora': new Date(item.timestamp).toLocaleString('es-ES'),
      'Timestamp': item.timestamp,
      [`${getMetricConfig(modalMetric).name} (${getMetricConfig(modalMetric).unit})`]: item.value
    }));

    // Crear workbook y worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Configurar el ancho de las columnas
    const colWidths = [
      { wch: 8 },  // Punto
      { wch: 20 }, // Fecha y Hora
      { wch: 25 }, // Timestamp
      { wch: 20 }  // Valor de la métrica
    ];
    ws['!cols'] = colWidths;

    // Agregar el worksheet al workbook
    const sheetName = `${modalMetric}_ALL_DATA`;
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    // Generar nombre del archivo
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
    const fileName = `${modalMetric}_ALL_DATA_${dateStr}_${timeStr}.xlsx`;

    // Descargar el archivo
    XLSX.writeFile(wb, fileName);
    
    // Mostrar mensaje de éxito
    const message = `✅ Exportado exitosamente!\n\n` +
      `📊 Datos: ${allData.length} puntos\n` +
      `📅 Período: TODOS LOS DATOS DISPONIBLES\n` +
      `📈 Métrica: ${getMetricConfig(modalMetric).name}\n` +
      `📄 Archivo: ${fileName}`;
    
    alert(message);
    console.log(`📊 Exported ${allData.length} data points to ${fileName}`);
  };

  return (
    <>
      <div className="dashboard-card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-primary" />
          Real-Time Metrics
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Gauge className="w-5 h-5 text-blue-600" />
              <span className="text-xs text-blue-600 font-medium">SPEED</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">
              <Metric
                value={speed}
                unit="km/h"
                isLoading={isLoading}
                // onClick={() => openModal('speed')}
              />
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Battery className="w-5 h-5 text-green-600" />
              <span className="text-xs text-green-600 font-medium">BATTERY</span>
            </div>
            <div className="text-2xl font-bold text-green-900">
              <Metric
                value={battery}
                unit="%"
                isLoading={isLoading}
                // onClick={() => openModal('battery')}
              />
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-5 h-5 text-purple-600" />
              <span className="text-xs text-purple-600 font-medium">VOLTAGE</span>
            </div>
            <div className="text-2xl font-bold text-purple-900">
              <Metric
                value={voltage}
                unit="V"
                isLoading={isLoading}
                // onClick={() => openModal('voltage')}
              />
            </div>
          </div>

          <div className="p-4 bg-cyan-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Navigation className="w-5 h-5 text-cyan-600" />
              <span className="text-xs text-cyan-600 font-medium">GPS SPEED</span>
            </div>
            <div className="text-2xl font-bold text-cyan-900">
              <Metric
                value={gpsSpeed}
                unit="km/h"
                isLoading={isLoading}
                // onClick={() => openModal('gpsSpeed')}
              />
            </div>
          </div>

          <div className="p-4 bg-red-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-5 h-5 text-red-600" />
              <span className="text-xs text-red-600 font-medium">CURRENT</span>
            </div>
            <div className="text-2xl font-bold text-red-900">
              <Metric
                value={current}
                unit="A"
                isLoading={isLoading}
                // onClick={() => openModal('current')}
              />
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Cpu className="w-5 h-5 text-yellow-600" />
              <span className="text-xs text-yellow-600 font-medium">POWER</span>
            </div>
            <div className="text-2xl font-bold text-yellow-900">
              <Metric
                value={power}
                unit="W"
                isLoading={isLoading}
                // onClick={() => openModal('power')}
              />
            </div>
          </div>
        </div>

        {/* <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            <span className="inline-flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-blue-400 inline-block align-middle" />
              Click on any metric to view interactive charts and historical data
            </span>
          </p>
        </div> */}
      </div>

      {/* Modal para datos históricos */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4" style={{ zIndex: 9999 }}>
          <div className="bg-white rounded-lg p-3 sm:p-6 max-w-6xl w-full max-h-[95vh] overflow-y-auto mx-2 sm:mx-4" style={{ zIndex: 10000 }}>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
                <span className="hidden sm:inline">Historical Data - </span>
                <span className="sm:hidden">Data - </span>
                {modalMetric.toUpperCase()}
                {/* 🔄 NUEVO: Indicador de actualización en tiempo real */}
                {realtimeData && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                    LIVE
                  </span>
                )}
              </h3>
              <div className="flex items-center gap-2">
                {/* 📊 NUEVO: Botón de exportar a Excel */}
                <button
                  onClick={exportToExcel}
                  className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                  title="Exportar datos a Excel"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Excel</span>
                </button>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Filtros de tiempo */}
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <span className="text-sm font-medium text-gray-700 mr-2">Time Range:</span>
                {[
                  { value: '15min', label: '15 min', color: 'bg-blue-500' },
                  { value: '30min', label: '30 min', color: 'bg-blue-500' },
                  { value: '1hour', label: '1 hour', color: 'bg-blue-500' },
                  { value: '2hours', label: '2 hours', color: 'bg-blue-500' },
                  { value: '3hours', label: '3 hours', color: 'bg-blue-500' }
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => {
                      setChartLoading(true);
                      setTimeFilter(filter.value);
                      setChartKey(prev => prev + 1); // Forzar re-render del gráfico
                      // Forzar re-render del gráfico después de un pequeño delay
                      setTimeout(() => {
                        setChartLoading(false);
                      }, 200);
                    }}
                    disabled={chartLoading}
                    className={`px-3 py-1.5 text-xs sm:text-sm rounded-full transition-colors ${
                      timeFilter === filter.value
                        ? `${filter.color} text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } ${chartLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {chartLoading && timeFilter === filter.value ? (
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{filter.label}</span>
                      </div>
                    ) : (
                      filter.label
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {loadingHistory ? (
              <div className="text-center py-8">
                <div className="loading-spinner w-8 h-8 mx-auto mb-4"></div>
                <p>Loading historical data...</p>
              </div>
            ) : historicalData && historicalData[modalMetric as keyof HistoricalData] ? (
              (() => {
                const rawMetricData = historicalData[modalMetric as keyof HistoricalData];
                const metricData = filterDataByTime(rawMetricData, timeFilter);
                
                // Mostrar loading si está procesando el gráfico
                if (chartLoading) {
                  return (
                    <div className="text-center py-8">
                      <div className="loading-spinner w-8 h-8 mx-auto mb-4"></div>
                      <p>Updating chart...</p>
                    </div>
                  );
                }
                // ...existing code...
                if (!metricData || metricData.length === 0) {
                  // ...existing code...
                  return (
                    <div className="text-center py-12">
                      <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">
                        No data points available for {modalMetric}
                      </p>
                    </div>
                  );
                }

                // Formatear tiempo según el rango seleccionado - MEJORADO
                const formatTimeForRange = (timestamp: string, filter: string): string => {
                  // 🔥 CONVERTIR UTC A COLOMBIA PARA MOSTRAR HORA CORRECTA
                  const dateUTC = new Date(timestamp);
                  const dateColombia = new Date(dateUTC.getTime() - COLOMBIA_OFFSET_MS);
                  
                  switch (filter) {
                    case '15min':
                      // Para 15 minutos, mostrar hora:minuto:segundo para mejor detalle
                      return dateColombia.toLocaleTimeString('es-ES', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                      });
                    case '30min':
                      // Para 30 minutos, mostrar hora:minuto
                      return dateColombia.toLocaleTimeString('es-ES', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: false
                      });
                    case '1hour':
                    case '2hours':
                    case '3hours':
                      // Para 1-3 horas, mostrar hora:minuto
                      return dateColombia.toLocaleTimeString('es-ES', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: false
                      });
                    default:
                      return dateColombia.toLocaleTimeString('es-ES', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: false
                      });
                  }
                };

                const chartData = metricData.map((item) => ({
                  value: item.value,
                  time: formatTimeForRange(item.timestamp, timeFilter),
                  fullTime: new Date(item.timestamp).toLocaleString('es-ES'),
                  // Formato especial para tooltip con segundos - CONVERTIR A COLOMBIA
                  tooltipTime: (() => {
                    const dateUTC = new Date(item.timestamp);
                    const dateColombia = new Date(dateUTC.getTime() - COLOMBIA_OFFSET_MS);
                    return dateColombia.toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false
                    });
                  })()
                }));

                const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

                // Calcular estadísticas de los datos
                const values = chartData.map(item => item.value);
                const stats = {
                  min: Math.min(...values),
                  max: Math.max(...values),
                  avg: values.reduce((a, b) => a + b, 0) / values.length,
                  count: values.length,
                  timeRange: chartData.length > 0 ? {
                    start: chartData[0].fullTime,
                    end: chartData[chartData.length - 1].fullTime
                  } : null
                };

                return (
                  <div className="space-y-3">
                    {/* Gráfico mejorado */}
                    <div className="h-80 sm:h-96 -ml-2 sm:ml-0">
                      <ResponsiveContainer width="100%" height="100%" key={`chart-${timeFilter}-${chartKey}`}>
                        <LineChart
                          data={chartData}
                          key={`linechart-${timeFilter}-${chartKey}`}
                          margin={{ 
                            top: 50, 
                            right: isMobile ? 10 : 30, 
                            left: isMobile ? 15 : 35, 
                            bottom: isMobile ? 60 : 80 
                          }}
                        >
                          {/* Título principal */}
                          <text x="50%" y={35} textAnchor="middle" dominantBaseline="middle" fontSize="20" fontWeight="bold" fill="#1e293b">
                            {getMetricConfig(modalMetric).name} vs Time
                          </text>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis 
                            dataKey="time" 
                            label={!isMobile ? { 
                              value: 'Time', 
                              position: 'outsideBottom', 
                              offset: -15,
                              style: { textAnchor: 'middle', fontWeight: 'bold', fontSize: 16 }
                            } : undefined}
                            tick={{ 
                              fontSize: isMobile ? 9 : 11,
                              fill: '#374151'
                            }}
                            height={isMobile ? 50 : 70}
                            interval={(() => {
                              // Lógica mejorada para intervalos según cantidad de datos y filtro
                              if (timeFilter === '15min') {
                                return chartData.length > 15 ? Math.floor(chartData.length / 8) : 0;
                              } else if (timeFilter === '30min') {
                                return chartData.length > 20 ? Math.floor(chartData.length / 10) : 0;
                              } else if (timeFilter === '1hour') {
                                return chartData.length > 30 ? Math.floor(chartData.length / 12) : 0;
                              } else if (timeFilter === '3hours') {
                                return chartData.length > 40 ? Math.floor(chartData.length / 15) : 0;
                              } else if (timeFilter === '6hours') {
                                return chartData.length > 50 ? Math.floor(chartData.length / 18) : 0;
                              }
                              return chartData.length > 25 ? Math.floor(chartData.length / 10) : 0;
                            })()}
                            angle={-45}
                            textAnchor="end"
                            minTickGap={5}
                          />
                          <YAxis 
                            label={!isMobile ? { 
                              value: getMetricConfig(modalMetric).unit, 
                              angle: -90, 
                              position: 'insideLeft',
                              style: { textAnchor: 'middle', fontWeight: 'bold', fontSize: 16 }
                            } : undefined}
                            tick={{ fontSize: 12 }}
                          />
                          <Tooltip 
                            labelFormatter={(value, payload) => {
                              // Usar tooltipTime que siempre incluye segundos
                              const dataPoint = payload && payload[0] && payload[0].payload;
                              return `Time: ${dataPoint ? dataPoint.tooltipTime : value}`;
                            }}
                            formatter={(value: any, name: any, props: any) => [
                              `${Number(value)} ${getMetricConfig(modalMetric).unit}`,
                              getMetricConfig(modalMetric).name
                            ]}
                            contentStyle={{
                              backgroundColor: '#ffffff',
                              border: '1px solid #e2e8f0',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke={getMetricConfig(modalMetric).color}
                            strokeWidth={3}
                            dot={{ r: 3, fill: getMetricConfig(modalMetric).color }}
                            activeDot={{ 
                              r: 6, 
                              stroke: getMetricConfig(modalMetric).color, 
                              strokeWidth: 2, 
                              fill: '#ffffff',
                              style: { filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }
                            }}
                            name={getMetricConfig(modalMetric).name}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Estadísticas en inglés - Last Value, Minimum, Maximum, Average */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border">
                      {(() => {
                        const values = metricData.map(item => item.value);
                        const min = Math.min(...values);
                        const max = Math.max(...values);
                        const avg = values.reduce((a, b) => a + b, 0) / values.length;
                        const latest = values[values.length - 1];

                        return (
                          <>
                            <div className="text-center p-2 sm:p-3 bg-white rounded-lg shadow-sm">
                              <div className="text-lg sm:text-xl font-bold text-blue-600">{latest.toFixed(2)}</div>
                              <div className="text-xs sm:text-sm text-gray-500 font-medium">Last Value</div>
                            </div>
                            <div className="text-center p-2 sm:p-3 bg-white rounded-lg shadow-sm">
                              <div className="text-lg sm:text-xl font-bold text-green-600">{min.toFixed(2)}</div>
                              <div className="text-xs sm:text-sm text-gray-500 font-medium">Minimum</div>
                            </div>
                            <div className="text-center p-2 sm:p-3 bg-white rounded-lg shadow-sm">
                              <div className="text-lg sm:text-xl font-bold text-red-600">{max.toFixed(2)}</div>
                              <div className="text-xs sm:text-sm text-gray-500 font-medium">Maximum</div>
                            </div>
                            <div className="text-center p-2 sm:p-3 bg-white rounded-lg shadow-sm">
                              <div className="text-lg sm:text-xl font-bold text-purple-600">{avg.toFixed(2)}</div>
                              <div className="text-xs sm:text-sm text-gray-500 font-medium">Average</div>
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {/* Tabla de datos (colapsable) */}
                    <details className="group">
                      <summary className="cursor-pointer p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 list-none">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-blue-900 flex items-center">
                            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                            View Raw Data ({metricData.length} points)
                          </span>
                          <div className="flex items-center">
                            <span className="text-sm text-blue-600 mr-2 group-open:hidden">Show</span>
                            <span className="text-sm text-blue-600 mr-2 hidden group-open:block">Hide</span>
                            <svg 
                              className="w-5 h-5 text-blue-600 group-open:rotate-180 transition-transform duration-200" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </summary>
                      <div className="mt-3 max-h-64 overflow-y-auto border rounded-lg">
                        <table className="w-full table-auto">
                          <thead className="bg-gray-100 sticky top-0">
                            <tr>
                              <th className="px-4 py-2 text-left font-medium text-gray-700">Value</th>
                              <th className="px-4 py-2 text-left font-medium text-gray-700">Timestamp</th>
                            </tr>
                          </thead>
                          <tbody>
                            {metricData
                              .slice()
                              .reverse()
                              .map((item, index) => (
                              <tr key={index} className="border-b last:border-b-0 hover:bg-gray-50">
                                <td className="px-4 py-3">
                                  <span className="font-semibold text-lg">
                                    {item.value} <span className="text-sm text-gray-500">{getMetricConfig(modalMetric).unit}</span>
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <span className="text-sm text-gray-500">
                                    {new Date(item.timestamp).toLocaleString()}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </details>

                    {/* Información adicional eliminada por solicitud del usuario */}

                    {metricData.length === 0 && (
                      <div className="text-center py-12">
                        <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">
                          No historical data available for {modalMetric}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No historical data available
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}