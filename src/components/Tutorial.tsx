import React from 'react';
import { ArrowLeft, FileText, PieChart, Users, BarChart2, Compass, Sparkles, Download, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Tutorial() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 sm:mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        <span className="text-sm sm:text-base">{t('tutorial.backToDashboard')}</span>
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">{t('tutorial.title')}</h1>

      <div className="prose prose-sm sm:prose prose-blue max-w-none">
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">{t('tutorial.introduction.title')}</h2>
          <p className="text-gray-600 mb-4">
            {t('tutorial.introduction.description')}
          </p>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">{t('tutorial.dashboard.title')}</h2>
          <p className="text-gray-600 mb-4">
            {t('tutorial.dashboard.description')}
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {t('tutorial.dashboard.features', { returnObjects: true }).map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">{t('tutorial.canvasTypes.title')}</h2>
          <p className="text-gray-600 mb-4">
            {t('tutorial.canvasTypes.description')}
          </p>
          <ul className="list-none space-y-4">
            {[
              { icon: FileText, color: 'text-blue-600', key: 'businessModel' },
              { icon: PieChart, color: 'text-green-600', key: 'valueProposition' },
              { icon: Users, color: 'text-purple-600', key: 'empathyMap' },
              { icon: BarChart2, color: 'text-orange-600', key: 'swot' },
              { icon: Compass, color: 'text-red-600', key: 'pestel' },
            ].map(({ icon: Icon, color, key }) => (
              <li key={key} className="flex items-start">
                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${color} mr-2 mt-1`} />
                <div>
                  <h3 className="font-semibold">{t(`tutorial.canvasTypes.${key}.title`)}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{t(`tutorial.canvasTypes.${key}.description`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">{t('tutorial.creatingEditing.title')}</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            {t('tutorial.creatingEditing.description1')}
          </p>
          <p className="text-sm sm:text-base text-gray-600 mt-4">
            {t('tutorial.creatingEditing.description2')}
          </p>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">{t('tutorial.canvasInfo.title')}</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            {t('tutorial.canvasInfo.description1')}
          </p>
          <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-2">
            {t('tutorial.canvasInfo.fields', { returnObjects: true }).map((field, index) => (
              <li key={index}>{field}</li>
            ))}
          </ul>
          <p className="text-sm sm:text-base text-gray-600 mt-4">
            {t('tutorial.canvasInfo.description2')}
          </p>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">{t('tutorial.specialFeatures.title')}</h2>
          <div className="space-y-6">
            {[
              { icon: Download, color: 'text-blue-600', key: 'exportPdf' },
              { icon: Sparkles, color: 'text-purple-600', key: 'aiAssistant' },
              { icon: Palette, color: 'text-green-600', key: 'canvasExamples' },
            ].map(({ icon: Icon, color, key }) => (
              <div key={key}>
                <div className="flex items-center space-x-2 mb-2">
                  <Icon className={`h-5 w-5 ${color}`} />
                  <h3 className="text-lg sm:text-xl font-medium text-gray-800">{t(`tutorial.specialFeatures.${key}.title`)}</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  {t(`tutorial.specialFeatures.${key}.description`)}
                </p>
                {key === 'aiAssistant' && (
                  <>
                    <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-2">{t('tutorial.specialFeatures.aiAssistant.features.title')}</h4>
                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-2">
                      {t('tutorial.specialFeatures.aiAssistant.features.list', { returnObjects: true }).map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    <p className="text-sm sm:text-base text-gray-600 mt-4">
                      {t('tutorial.specialFeatures.aiAssistant.usage')}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">{t('tutorial.tips.title')}</h2>
          <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-2">
            {t('tutorial.tips.list', { returnObjects: true }).map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">{t('tutorial.needHelp.title')}</h2>
          <p className="text-sm sm:text-base text-gray-600">
            {t('tutorial.needHelp.description')}
          </p>
        </section>
      </div>
    </div>
  );
  
}