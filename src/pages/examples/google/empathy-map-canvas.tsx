import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { icons } from '../../../utils/icons';

interface CanvasSectionProps {
  title: string;
  items: string[];
  description: string;
  className?: string;
  icon: string;
}

const CanvasSection: React.FC<CanvasSectionProps> = ({ title, items, description, className, icon }) => (
  <div className={`bg-white/50 rounded-lg p-2 sm:p-4 ${className}`}>
    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 flex items-center">
      <img src={icon} alt={title} className="w-4 h-4 sm:w-6 sm:h-6 mr-1 sm:mr-2" />
      <span>{title}</span>
    </h3>
    <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">{description}</p>
    <ul className="list-disc list-inside">
      {items.map((item, index) => (
        <li key={index} className="text-xs sm:text-sm">{item.replace(/^[•\s]+/, '')}</li>
      ))}
    </ul>
  </div>
);

export default function GoogleEmpathyMapCanvas() {
  const navigate = useNavigate();

  const canvasData = {
    title: "Google Inc. Empathy Map Canvas",
    content: {
      thinkAndFeel: [
        "• I want quick and accurate information",
        "• I need my online activities to be seamless",
        "• I'm concerned about data privacy and security",
        "• I feel empowered by access to information",
        "• I'm excited about new Google innovations"
      ],
      see: [
        "• Google's clean and simple interface",
        "• Friends and colleagues using Google services",
        "• Google's colorful and playful branding",
        "• Targeted ads based on search history",
        "• Integration of Google services in daily life"
      ],
      hear: [
        "• Discussions about Google's impact on society",
        "• Praise for Google's free and useful tools",
        "• Concerns about Google's data collection practices",
        "• News about Google's technological advancements",
        "• Comparisons between Google and other tech giants"
      ],
      sayAndDo: [
        "• Use 'Google' as a verb for searching online",
        "• Rely on Google Maps for navigation",
        "• Collaborate using Google Workspace tools",
        "• Watch and share YouTube videos",
        "• Use Android devices and apps"
      ],
      pains: [
        "• Information overload and analysis paralysis",
        "• Concerns about personal data being used for advertising",
        "• Difficulty finding specific information in search results",
        "• Frustration with changing interfaces or features",
        "• Dependence on Google services for daily tasks"
      ],
      gains: [
        "• Easy access to vast amounts of information",
        "• Free, high-quality productivity tools",
        "• Personalized experiences across devices",
        "• Improved efficiency in work and personal life",
        "• Discovering new content and services"
      ]
    },
    project_name: "Google Inc. Customer Empathy Analysis",
    author: "User Experience Research Team",
    date: "2023-05-15",
    comments: "This empathy map provides insights into the thoughts, feelings, and experiences of typical Google users."
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 relative">
      <div className="mb-4 sm:mb-6 flex justify-between items-center">
        <button
          onClick={() => navigate('/examples')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
          <span className="text-sm sm:text-base">Back to Examples</span>
        </button>
      </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">{canvasData.title}</h1>

      <div className="mb-2 sm:mb-4 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
        <div className="text-xs sm:text-sm"><strong>Project:</strong> {canvasData.project_name}</div>
        <div className="text-xs sm:text-sm"><strong>Author:</strong> {canvasData.author}</div>
        <div className="text-xs sm:text-sm"><strong>Date:</strong> {canvasData.date}</div>
      </div>
      <div className="mb-2 sm:mb-4">
        <p className="text-xs sm:text-sm"><strong>Comments:</strong> {canvasData.comments}</p>
      </div>

      <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-blue-200/30"></div>
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-4">
          <CanvasSection
            title="Think & Feel?"
            items={canvasData.content.thinkAndFeel}
            description="What might your user be thinking and feeling?"
            className="bg-white/50 border border-gray-200"
            icon={icons.think}
          />
          <CanvasSection
            title="See?"
            items={canvasData.content.see}
            description="What does your user see in their environment?"
            className="bg-white/50 border border-gray-200"
            icon={icons.see}
          />
          <CanvasSection
            title="Hear?"
            items={canvasData.content.hear}
            description="What does your user hear from others?"
            className="bg-white/50 border border-gray-200"
            icon={icons.hear}
          />
          <CanvasSection
            title="Say & Do?"
            items={canvasData.content.sayAndDo}
            description="What does your user say and do?"
            className="bg-white/50 border border-gray-200"
            icon={icons.sayDo}
          />
          <CanvasSection
            title="Pain"
            items={canvasData.content.pains}
            description="What are your user's fears, frustrations, and anxieties?"
            className="!bg-green-100 border border-gray-200"
            icon={icons.pain}
          />
          <CanvasSection
            title="Gain"
            items={canvasData.content.gains}
            description="What are your user's wants, needs, and measures of success?"
            className="!bg-green-100 border border-gray-200"
            icon={icons.gain}
          />
        </div>
      </div>
    </div>
  );
}