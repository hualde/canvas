import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, PieChart, BarChart2, Users, Compass, ArrowLeft } from 'lucide-react';

const companies = [
  { id: 'apple', name: 'Apple' },
  { id: 'google', name: 'Google' },
  { id: 'amazon', name: 'Amazon' },
  { id: 'microsoft', name: 'Microsoft' },
  { id: 'tesla', name: 'Tesla' },
];

const canvasTypes = [
  { id: 'business', name: 'Business Model Canvas', icon: FileText },
  { id: 'value-proposition', name: 'Value Proposition Canvas', icon: PieChart },
  { id: 'swot', name: 'SWOT Analysis', icon: BarChart2 },
  { id: 'empathy-map', name: 'Empathy Map', icon: Users },
  { id: 'pestel', name: 'PESTEL Analysis', icon: Compass },
];

export function Examples() {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCanvas, setSelectedCanvas] = useState('');

  const handleViewExample = () => {
    if (selectedCompany && selectedCanvas) {
      navigate(`/examples/${selectedCompany}/${selectedCanvas}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">View Example Canvases</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Select a Company</h2>
          <div className="grid gap-4">
            {companies.map((company) => (
              <button
                key={company.id}
                onClick={() => setSelectedCompany(company.id)}
                className={`p-4 rounded-lg text-left transition-colors ${
                  selectedCompany === company.id
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-white border-2 border-gray-200 hover:border-blue-300'
                }`}
              >
                {company.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Select a Canvas Type</h2>
          <div className="grid gap-4">
            {canvasTypes.map((canvas) => {
              const Icon = canvas.icon;
              return (
                <button
                  key={canvas.id}
                  onClick={() => setSelectedCanvas(canvas.id)}
                  className={`p-4 rounded-lg text-left transition-colors flex items-center ${
                    selectedCanvas === canvas.id
                      ? 'bg-green-100 border-2 border-green-500'
                      : 'bg-white border-2 border-gray-200 hover:border-green-300'
                  }`}
                >
                  <Icon className="w-6 h-6 mr-3" />
                  {canvas.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleViewExample}
          disabled={!selectedCompany || !selectedCanvas}
          className={`px-6 py-3 rounded-lg transition-colors ${
            selectedCompany && selectedCanvas
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          View Example
        </button>
      </div>
    </div>
  );
}

export default Examples;