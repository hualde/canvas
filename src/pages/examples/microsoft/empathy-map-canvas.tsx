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

export default function MicrosoftEmpathyMapCanvas() {
  const navigate = useNavigate();

  const canvasData = {
    title: "Microsoft Corporation Empathy Map Canvas",
    content: {
      thinkAndFeel: [
        "• I need reliable and efficient tools for work and personal use",
        "• I want to stay up-to-date with the latest technology",
        "• I'm concerned about data security and privacy",
        "• I feel overwhelmed by the rapid pace of technological change",
        "• I'm excited about the potential of AI and cloud computing"
      ],
      see: [
        "• Microsoft products in workplaces and schools",
        "• Friends and colleagues using Windows, Office, and Teams",
        "• Advertisements for Surface devices and Xbox consoles",
        "• News about Microsoft's innovations and acquisitions",
        "• Cloud adoption and digital transformation in various industries"
      ],
      hear: [
        "• Discussions about the importance of Microsoft certifications",
        "• Praise for Microsoft's cloud services and enterprise solutions",
        "• Debates about Windows updates and features",
        "• Excitement around new Xbox game releases and Game Pass",
        "• Concerns about tech giants' influence on society"
      ],
      sayAndDo: [
        "• Use Microsoft Office for daily tasks and collaboration",
        "• Rely on Windows for personal and professional computing",
        "• Participate in online communities for Microsoft products",
        "• Attend Microsoft events or watch product launches",
        "• Consider Microsoft certifications for career advancement"
      ],
      pains: [
        "• Frustration with software updates and compatibility issues",
        "• Concerns about learning curves for new tools and features",
        "• Anxiety about data breaches and privacy violations",
        "• Difficulty choosing between different Microsoft product tiers",
        "• Balancing work and personal life with always-on technology"
      ],
      gains: [
        "• Increased productivity through integrated Microsoft tools",
        "• Enhanced collaboration with colleagues using Microsoft 365",
        "• Access to cutting-edge technology and cloud services",
        "• Improved gaming experiences with Xbox and Game Pass",
        "• Career growth opportunities through Microsoft skills"
      ]
    },
    project_name: "Microsoft Corporation Customer Empathy Analysis",
    author: "User Experience Research Team",
    date: "2023-05-15",
    comments: "This empathy map provides insights into the thoughts, feelings, and experiences of typical Microsoft customers across various product lines."
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