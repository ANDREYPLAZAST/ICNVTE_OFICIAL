import { useEffect, useState } from 'react';
import { Check, X, Clock, MessageSquare, AlertTriangle, Edit3 } from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

interface Test {
  test_id: string;
  test_name: string;
  description: string;
  status_team: string;
  comments: string;
}

interface Section {
  section_id: string;
  section_name: string;
  tests: Test[];
}

interface InspectionData {
  sections: Section[];
  stats: {
    total: number;
    passed: number;
    failed: number;
    pending: number;
  };
  team_id: string;
}

interface InspectionTableProps {
  id_team: string;
  initialData?: InspectionData;
  onDataUpdate?: (data: InspectionData) => void;
  readOnly?: boolean;
}

export default function InspectionTable({ id_team, initialData, onDataUpdate, readOnly = false }: InspectionTableProps) {
  const [sections, setSections] = useState<Section[]>(initialData?.sections || []);
  const [loading, setLoading] = useState(!initialData);
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [editingTest, setEditingTest] = useState<{sectionId: string, testId: string} | null>(null);
  const [updatingTest, setUpdatingTest] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setSections(initialData.sections || []);
      setLoading(false);
      return;
    }

    fetch(`${BACKEND_URL}/api/inspection/${id_team}`)
      .then(res => res.json())
      .then((data: InspectionData) => {
        setSections(data.sections || []);
        setLoading(false);
        if (onDataUpdate) onDataUpdate(data);
      })
      .catch(error => {
        console.error('Error fetching inspection data:', error);
        setLoading(false);
      });
  }, [id_team, initialData, onDataUpdate]);

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

  const updateTestStatus = async (sectionId: string, testId: string, newStatus: string, comments: string) => {
    if (readOnly) return;
    
    setUpdatingTest(testId);
    try {
      const response = await fetch(`${BACKEND_URL}/api/inspection/${id_team}/test`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section_id: sectionId,
          test_id: testId,
          status_team: newStatus,
          comments,
        }),
      });

      if (response.ok) {
        // Actualizar estado local
        setSections(prevSections => 
          prevSections.map(section => 
            section.section_id === sectionId 
              ? {
                  ...section,
                  tests: section.tests.map((test: Test) => 
                    test.test_id === testId 
                      ? { ...test, status_team: newStatus, comments }
                      : test
                  )
                }
              : section
          )
        );

        // Si hay callback, refrescar datos completos
        if (onDataUpdate) {
          const refreshResponse = await fetch(`${BACKEND_URL}/api/inspection/${id_team}`);
          const refreshData = await refreshResponse.json();
          onDataUpdate(refreshData);
        }
        
        setEditingTest(null);
      } else {
        alert('Error updating test status');
      }
    } catch (error) {
      console.error('Error updating test status:', error);
      alert('Error updating test status');
    } finally {
      setUpdatingTest(null);
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
          <h3 className="text-lg font-semibold text-gray-900">
            {readOnly ? 'Inspection Results' : 'Technical Inspection'}
          </h3>
          {readOnly && (
            <p className="text-sm text-gray-500 mt-1">
              Read-only view of your team's technical inspection results
            </p>
          )}
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
                    {!readOnly && (
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {section.tests?.map((test: Test) => (
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
                        {readOnly ? (
                          getStatusBadge(test.status_team)
                        ) : (
                          <div className="flex items-center space-x-2">
                            <select
                              value={test.status_team}
                              onChange={(e) => updateTestStatus(section.section_id, test.test_id, e.target.value, test.comments)}
                              disabled={updatingTest === test.test_id}
                              className="text-sm border border-gray-300 rounded px-2 py-1 bg-white hover:border-gray-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Passed">Passed</option>
                              <option value="Failed">Failed</option>
                            </select>
                            {updatingTest === test.test_id && (
                              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        {readOnly ? (
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
                        ) : (
                          editingTest?.sectionId === section.section_id && editingTest?.testId === test.test_id ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                defaultValue={test.comments}
                                placeholder="Add comments..."
                                className="flex-1 text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 focus:outline-none"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    updateTestStatus(section.section_id, test.test_id, test.status_team, (e.target as HTMLInputElement).value);
                                  } else if (e.key === 'Escape') {
                                    setEditingTest(null);
                                  }
                                }}
                                autoFocus
                              />
                              <button
                                onClick={() => setEditingTest(null)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">{test.comments || 'No comments'}</span>
                              <button
                                onClick={() => setEditingTest({sectionId: section.section_id, testId: test.test_id})}
                                className="text-gray-400 hover:text-gray-600 ml-2"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                            </div>
                          )
                        )}
                      </td>
                      {!readOnly && (
                        <td className="px-4 py-4 whitespace-nowrap">
                          <button 
                            onClick={() => setEditingTest({sectionId: section.section_id, testId: test.test_id})}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <MessageSquare className="w-4 h-4 text-gray-400" />
                          </button>
                        </td>
                      )}
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
