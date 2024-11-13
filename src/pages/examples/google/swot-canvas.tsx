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

export default function GoogleSWOTCanvas() {
  const navigate = useNavigate();

  const canvasData = {
    title: "Google Inc. SWOT Analysis",
    content: {
      strengths: [
        "• Dominant market position in search and online advertising",
        "• Strong brand recognition and reputation",
        "• Diverse portfolio of products and services",
        "• Massive user base and data collection capabilities",
        "• Significant financial resources for R&D and acquisitions"
      ],
      weaknesses: [
        "• Heavy reliance on advertising revenue",
        "• Privacy concerns and data collection criticisms",
        "• Unsuccessful attempts in social media (Google+)",
        "• Dependence on Android's success in mobile market",
        "• Potential for antitrust regulations and fines"
      ],
      opportunities: [
        "• Expansion in cloud computing and AI technologies",
        "• Growth in emerging markets and developing countries",
        "• Development of new hardware products (e.g., Pixel, Nest)",
        "• Advancements in autonomous vehicle technology",
        "• Potential in AR/VR and wearable tech markets"
      ],
      threats: [
        "• Increasing competition in core markets (e.g., Microsoft, Amazon)",
        "• Regulatory challenges and potential breakup threats",
        "• Rapid technological changes and innovation",
        "• Privacy laws and data protection regulations",
        "• Cybersecurity threats and potential data breaches"
      ]
    },
    project_name: "Google Inc. Strategic Analysis",
    author: "Business Strategy Team",
    date: "2023-05-15",
    comments: "This SWOT analysis provides an overview of Google Inc.'s current strategic position as of 2023."
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

      <div className="relative border-2 border-gray-200 rounded-lg p-2 sm:p-4 md:p-6 overflow-hidden">
        <div className="absolute inset-0 bg-blue-200/30"></div>
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          <CanvasSection
            title="Strengths"
            items={canvasData.content.strengths}
            description="Internal factors that give an advantage over others"
            className="h-full bg-white/50"
            icon={icons.strength}
          />
          <CanvasSection
            title="Weaknesses"
            items={canvasData.content.weaknesses}
            description="Internal factors that place the business at a disadvantage"
            className="h-full bg-white/50"
            icon={icons.weakness}
          />
          <CanvasSection
            title="Opportunities"
            items={canvasData.content.opportunities}
            description="External factors that the business could exploit to its advantage"
            className="h-full bg-white/50"
            icon={icons.opportunity}
          />
          <CanvasSection
            title="Threats"
            items={canvasData.content.threats}
            description="External factors that could cause trouble for the business"
            className="h-full bg-white/50"
            icon={icons.threat}
          />
        </div>
      </div>
    </div>
  );
}