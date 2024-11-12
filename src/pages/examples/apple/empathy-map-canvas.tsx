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

export default function AppleEmpathyMapCanvas() {
  const navigate = useNavigate();

  const canvasData = {
    title: "Apple Inc. Empathy Map Canvas",
    content: {
      thinkAndFeel: [
        "• I want the latest and coolest technology",
        "• I need my devices to work seamlessly",
        "• I'm concerned about my privacy and data security",
        "• I feel part of an exclusive community",
        "• I'm excited about new product releases"
      ],
      see: [
        "• Sleek and modern Apple stores",
        "• Friends and colleagues using Apple products",
        "• Apple's minimalist advertising",
        "• Positive reviews and high ratings for Apple products",
        "• People lining up for new product launches"
      ],
      hear: [
        "• Buzz about new Apple products and features",
        "• Praise for Apple's customer service",
        "• Discussions about Apple's environmental initiatives",
        "• Comparisons between Apple and other tech brands",
        "• Stories of how Apple products improve productivity"
      ],
      sayAndDo: [
        "• Share experiences with Apple products on social media",
        "• Recommend Apple products to friends and family",
        "• Attend product launch events or watch them online",
        "• Use multiple Apple devices in daily life",
        "• Customize their devices with apps and accessories"
      ],
      pains: [
        "• High prices of Apple products",
        "• Compatibility issues with non-Apple devices",
        "• Fear of damaging expensive devices",
        "• Frustration with forced upgrades or obsolescence",
        "• Concerns about vendor lock-in"
      ],
      gains: [
        "• Seamless integration across all devices",
        "• Status symbol and sense of belonging",
        "• Intuitive and user-friendly interfaces",
        "• High-quality and reliable products",
        "• Access to exclusive apps and services"
      ]
    },
    project_name: "Apple Inc. Customer Empathy Analysis",
    author: "User Experience Team",
    date: "2023-05-15",
    comments: "This empathy map provides insights into the thoughts, feelings, and experiences of typical Apple customers."
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