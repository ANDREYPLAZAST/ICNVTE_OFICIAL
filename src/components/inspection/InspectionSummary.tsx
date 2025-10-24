import { CheckCircle, AlertTriangle, Clock, FileText } from 'lucide-react';

interface InspectionSummaryProps {
  stats?: {
    passed: number;
    failed: number;
    pending: number;
    total: number;
  };
}

export default function InspectionSummary({ stats }: InspectionSummaryProps) {
  // Valores por defecto si no hay stats
  const defaultStats = {
    passed: 0,
    failed: 0,
    pending: 0,
    total: 0
  };
  
  const currentStats = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="dashboard-card text-center">
        <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
        <div className="text-2xl font-bold text-green-600">{currentStats.passed}</div>
        <div className="text-sm text-gray-600">Passed</div>
      </div>

      <div className="dashboard-card text-center">
        <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <div className="text-2xl font-bold text-red-600">{currentStats.failed}</div>
        <div className="text-sm text-gray-600">Failed</div>
      </div>

      <div className="dashboard-card text-center">
        <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
        <div className="text-2xl font-bold text-yellow-600">{currentStats.pending}</div>
        <div className="text-sm text-gray-600">Pending</div>
      </div>

      <div className="dashboard-card text-center">
        <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
        <div className="text-2xl font-bold text-blue-600">{currentStats.total}</div>
        <div className="text-sm text-gray-600">Total Items</div>
      </div>
    </div>
  );
}