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

export default function TeslaEmpathyMapCanvas() {
  const navigate = useNavigate();

  const canvasData = {
    title: "Tesla Inc. Empathy Map Canvas",
    content: {
      thinkAndFeel: [
        "• I want to contribute to a sustainable future",
        "• I'm excited about cutting-edge technology in cars",
        "• I'm concerned about the range and charging infrastructure",
        "• I feel proud to be part of the electric vehicle revolution",
        "• I'm worried about the high initial cost of Tesla vehicles"
      ],
      see: [
        "• Tesla cars on the roads and in parking lots",
        "• Charging stations becoming more common",
        "• News about Tesla's innovations and Elon Musk",
        "• Friends and colleagues driving electric vehicles",
        "• Increasing awareness of climate change impacts"
      ],
      hear: [
        "• Discussions about Tesla's autopilot and full self-driving capabilities",
        "• Debates about the environmental impact of electric vs. gas vehicles",
        "• Praise for Tesla's performance and technology",
        "• Concerns about battery life and replacement costs",
        "• Stories of Tesla's customer service experiences"
      ],
      sayAndDo: [
        "• Research and compare electric vehicle options",
        "• Test drive Tesla cars and experience the technology",
        "• Discuss the benefits of electric vehicles with others",
        "• Calculate potential savings on fuel and maintenance",
        "• Share Tesla referral codes and experiences on social media"
      ],
      pains: [
        "• Range anxiety on long trips",
        "• High upfront cost of purchasing a Tesla",
        "• Concerns about the learning curve for new technology",
        "• Worry about potential software glitches or updates",
        "• Limited options for third-party repairs and maintenance"
      ],
      gains: [
        "• Reduced carbon footprint and environmental impact",
        "• Lower long-term operating costs (fuel and maintenance)",
        "• Access to cutting-edge technology and frequent updates",
        "• Improved driving experience with instant torque and quiet operation",
        "• Status symbol of owning a premium, innovative vehicle"
      ]
    },
    project_name: "Tesla Inc. Customer Empathy Analysis",
    author: "User Experience Research Team",
    date: "2023-05-15",
    comments: "This empathy map provides insights into the thoughts, feelings, and experiences of typical Tesla customers and potential buyers."
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

      <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-blue-200/30"></div>
        <div className="relative z-10 grid grid-cols-2 gap-4 p-4">
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