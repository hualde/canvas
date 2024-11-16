import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, PieChart, BarChart2, Users, Compass, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const companies = [
  { id: 'apple', name: 'Apple' },
  { id: 'google', name: 'Google' },
  { id: 'amazon', name: 'Amazon' },
  { id: 'microsoft', name: 'Microsoft' },
  { id: 'tesla', name: 'Tesla' },
];

const canvasTypes = [
  { id: 'business', name: 'examples.canvasTypes.business', icon: FileText },
  { id: 'value-proposition', name: 'examples.canvasTypes.valueProposition', icon: PieChart },
  { id: 'swot', name: 'examples.canvasTypes.swot', icon: BarChart2 },
  { id: 'empathy-map', name: 'examples.canvasTypes.empathyMap', icon: Users },
  { id: 'pestel', name: 'examples.canvasTypes.pestel', icon: Compass },
];

export function Examples() {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCanvas, setSelectedCanvas] = useState('');
  const { t } = useTranslation();

  const handleViewExample = () => {
    if (selectedCompany && selectedCanvas) {
      navigate(`/examples/${selectedCompany}/${selectedCanvas}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="mb-4 sm:mb-6 flex items-center">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="hidden sm:inline">{t('examples.backToDashboard')}</span>
          <span className="sm:hidden">{t('examples.back')}</span>
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">{t('examples.title')}</h1>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t('examples.selectCompany')}</h2>
          <div className="grid gap-3 sm:gap-4">
            {companies.map((company) => (
              <button
                key={company.id}
                onClick={() => setSelectedCompany(company.id)}
                className={`p-3 sm:p-4 rounded-lg text-left transition-colors ${
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
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t('examples.selectCanvasType')}</h2>
          <div className="grid gap-3 sm:gap-4">
            {canvasTypes.map((canvas) => {
              const Icon = canvas.icon;
              return (
                <button
                  key={canvas.id}
                  onClick={() => setSelectedCanvas(canvas.id)}
                  className={`p-3 sm:p-4 rounded-lg text-left transition-colors flex items-center ${
                    selectedCanvas === canvas.id
                      ? 'bg-green-100 border-2 border-green-500'
                      : 'bg-white border-2 border-gray-200 hover:border-green-300'
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{t(canvas.name)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 flex justify-center">
        <button
          onClick={handleViewExample}
          disabled={!selectedCompany || !selectedCanvas}
          className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
            selectedCompany && selectedCanvas
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {t('examples.viewExample')}
        </button>
      </div>
    </div>
  );
}

export default Examples;