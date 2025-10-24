import { useEffect, useState } from 'react';
import { Check, X, Clock, MessageSquare, AlertTriangle } from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

interface InspectionTableProps {
  id_team: string;
  initialData?: any;
  onDataUpdate?: (data: any) => void;
  readOnly?: boolean;
}

export default function InspectionTable({ id_team, initialData, onDataUpdate, readOnly = true }: InspectionTableProps) {
  const [sections, setSections] = useState<any[]>(initialData?.sections || []);
  const [loading, setLoading] = useState(!initialData);
  const [selectedSection, setSelectedSection] = useState<string>('all');

  useEffect(() => {
    if (initialData) {
      setSections(initialData.sections || []);
      setLoading(false);
      return;
    }

    fetch(`${BACKEND_URL}/api/inspection/${id_team}`)
      .then(res => res.json())
      .then(data => {
        setSections(data.sections || []);
        setLoading(false);
        if (onDataUpdate) onDataUpdate(data);
      })
      .catch(error => {
        console.error('Error fetching inspection data:', error);
        setLoading(false);
      });
  }, [id_team, initialData]);

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'passed':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <X className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'passed':
        return <span className="status-approved">Passed</span>;
      case 'failed':
        return <span className="status-rejected">Failed</span>;
      default:
        return <span className="status-pending">Pending</span>;
    }
  };

  // Filtrar secciones según la selección
  const filteredSections = selectedSection === 'all' 
    ? sections 
    : sections.filter(section => section.section_id === selectedSection);

  if (loading) {
    return <div className="dashboard-card">Loading inspection data...</div>;
  }

  if (!sections || sections.length === 0) {
    return (
      <div className="dashboard-card">
        <div className="text-center py-8">
          <AlertTriangle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Inspection Data</h3>
          <p className="text-gray-500">No technical inspection data available for this team.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Inspection Results</h3>
          <p className="text-sm text-gray-500 mt-1">
            Read-only view of your team's technical inspection results
          </p>
        </div>
        
        {/* Selector de sección */}
        <select 
          value={selectedSection} 
          onChange={(e) => setSelectedSection(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 bg-white"
        >
          <option value="all">All Sections</option>
          {sections.map(section => (
            <option key={section.section_id} value={section.section_id}>
              {section.section_name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-8">
        {filteredSections.map((section) => (
          <div key={section.section_id} className="border-l-4 border-blue-500 pl-4">
            <h4 className="text-md font-semibold text-gray-800 mb-4">{section.section_name}</h4>
            
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Test
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comments
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {section.tests?.map((test: any) => (
                    <tr key={test.test_id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(test.status_team)}
                          <span className="ml-3 text-sm font-medium text-gray-900">
                            {test.test_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-gray-600">{test.description}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {getStatusBadge(test.status_team)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          {test.comments && (
                            <>
                              <MessageSquare className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-600">{test.comments}</span>
                            </>
                          )}
                          {!test.comments && (
                            <span className="text-sm text-gray-400 italic">No comments</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
