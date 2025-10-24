import { useEffect, useState } from 'react';
import { Check, X, Clock, MessageSquare, AlertTriangle } from 'lucide-react';

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

export default function InspectionTable({ 
  id_team, 
  initialData, 
  onDataUpdate, 
  readOnly = true 
}: InspectionTableProps) {
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

  const updateTestStatus = async (
    sectionId: string, 
    testId: string, 
    newStatus: string, 
    comments: string
  ) => {
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
          comments
        }),
      });

      if (response.ok) {
        // Actualizar estado local
        setSections(prevSections => 
          prevSections.map(section => 
            section.section_id === sectionId 
              ? {
                  ...section,
                  tests: section.tests.map(test => 
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
          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            onDataUpdate(refreshData);
          }
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
    return (
      <div className="dashboard-card">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading inspection data...</p>
        </div>
      </div>
    );
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
            {readOnly ? 'Read-only view of your team\'s technical inspection results' : 'Technical inspection details'}
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
                    {!readOnly && (
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {section.tests?.map((test) => (
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
                      {!readOnly && (
                        <td className="px-4 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setEditingTest({
                              sectionId: section.section_id,
                              testId: test.test_id
                            })}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                            disabled={updatingTest === test.test_id}
                          >
                            {updatingTest === test.test_id ? 'Updating...' : 'Edit'}
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

      {/* Modal de edición */}
      {editingTest && !readOnly && (
        <EditTestModal
          test={sections
            .find(s => s.section_id === editingTest.sectionId)
            ?.tests.find(t => t.test_id === editingTest.testId)
          }
          onClose={() => setEditingTest(null)}
          onSave={updateTestStatus}
          sectionId={editingTest.sectionId}
          testId={editingTest.testId}
        />
      )}
    </div>
  );
}

// Componente Modal para edición
interface EditTestModalProps {
  test?: Test;
  onClose: () => void;
  onSave: (sectionId: string, testId: string, status: string, comments: string) => Promise<void>;
  sectionId: string;
  testId: string;
}

function EditTestModal({ test, onClose, onSave, sectionId, testId }: EditTestModalProps) {
  const [status, setStatus] = useState(test?.status_team || 'Pending');
  const [comments, setComments] = useState(test?.comments || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(sectionId, testId, status, comments);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Edit Test Status</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="Pending">Pending</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comments
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Add inspection comments..."
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
