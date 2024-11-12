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
  <div className={`bg-white/50 rounded-lg p-4 ${className}`}>
    <h3 className="text-lg font-semibold mb-2 flex items-center">
      <img src={icon} alt={title} className="w-6 h-6 mr-2" />
      <span>{title}</span>
    </h3>
    <p className="text-sm text-gray-500 mb-2">{description}</p>
    <ul className="list-disc list-inside">
      {items.map((item, index) => (
        <li key={index} className="text-sm">{item.replace(/^[•\s]+/, '')}</li>
      ))}
    </ul>
  </div>
);

export default function TeslaSWOTCanvas() {
  const navigate = useNavigate();

  const canvasData = {
    title: "Tesla Inc. SWOT Analysis",
    content: {
      strengths: [
        "• Strong brand recognition and loyal customer base",
        "• Leadership in electric vehicle technology and innovation",
        "• Vertical integration (batteries, software, charging network)",
        "• Advanced autonomous driving capabilities",
        "• Synergies between automotive and energy businesses"
      ],
      weaknesses: [
        "• Limited vehicle production capacity compared to traditional automakers",
        "• High production costs and reliance on economies of scale",
        "• Dependence on government incentives for EV adoption",
        "• Quality control issues and recalls",
        "• Limited service network compared to established automakers"
      ],
      opportunities: [
        "• Growing global demand for electric vehicles",
        "• Expansion into new markets (e.g., China, India)",
        "• Development of new vehicle models (e.g., Cybertruck, Semi)",
        "• Advancements in battery technology and energy storage",
        "• Potential for licensing technology to other automakers"
      ],
      threats: [
        "• Increasing competition from traditional automakers and new EV startups",
        "• Potential changes in government policies and incentives for EVs",
        "• Supply chain disruptions and raw material shortages",
        "• Cybersecurity risks in connected and autonomous vehicles",
        "• Economic downturns affecting luxury vehicle sales"
      ]
    },
    project_name: "Tesla Inc. Strategic Analysis",
    author: "Business Strategy Team",
    date: "2023-05-15",
    comments: "This SWOT analysis provides an overview of Tesla Inc.'s current strategic position as of 2023."
  };

  return (
    <div className="max-w-[1600px] mx-auto p-6 relative">
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => navigate('/examples')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Examples
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">{canvasData.title}</h1>

      <div className="mb-4 grid grid-cols-3 gap-4">
        <div className="text-sm"><strong>Project:</strong> {canvasData.project_name}</div>
        <div className="text-sm"><strong>Author:</strong> {canvasData.author}</div>
        <div className="text-sm"><strong>Date:</strong> {canvasData.date}</div>
      </div>
      <div className="mb-4">
        <p className="text-sm"><strong>Comments:</strong> {canvasData.comments}</p>
      </div>

      <div className="relative border-2 border-gray-200 rounded-lg p-6 overflow-hidden">
        <div className="absolute inset-0 bg-blue-200/30"></div>
        <div className="relative z-10 grid grid-cols-2 gap-4">
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