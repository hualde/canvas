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

export default function AmazonEmpathyMapCanvas() {
  const navigate = useNavigate();

  const canvasData = {
    title: "Amazon Inc. Empathy Map Canvas",
    content: {
      thinkAndFeel: [
        "• I want to find the best deals and save money",
        "• I need convenient and fast shopping experiences",
        "• I'm concerned about product quality and authenticity",
        "• I feel overwhelmed by the vast product selection",
        "• I'm excited about Prime Day and other special sales events"
      ],
      see: [
        "• Amazon boxes and delivery vans everywhere",
        "• Friends and family using Amazon for various needs",
        "• Personalized product recommendations",
        "• Customer reviews and ratings for products",
        "• Amazon's expanding presence in different industries"
      ],
      hear: [
        "• Discussions about Amazon's impact on retail",
        "• Praise for Prime's fast and free shipping",
        "• Concerns about Amazon's market dominance",
        "• Stories of great deals and unique finds on Amazon",
        "• Debates about working conditions in Amazon warehouses"
      ],
      sayAndDo: [
        "• Compare prices on Amazon before buying elsewhere",
        "• Use Amazon for everything from groceries to electronics",
        "• Share Amazon wishlists with friends and family",
        "• Leave reviews and ratings for purchased products",
        "• Subscribe to Prime for its various benefits"
      ],
      pains: [
        "• Difficulty in choosing between similar products",
        "• Concerns about counterfeit or low-quality items",
        "• Frustration with inaccurate product descriptions",
        "• Anxiety about porch pirates stealing deliveries",
        "• Overwhelm from constant notifications and emails"
      ],
      gains: [
        "• Convenience of one-stop shopping",
        "• Time and money savings through Prime membership",
        "• Access to a vast selection of products",
        "• Easy returns and customer service",
        "• Personalized shopping experiences"
      ]
    },
    project_name: "Amazon Inc. Customer Empathy Analysis",
    author: "User Experience Research Team",
    date: "2023-05-15",
    comments: "This empathy map provides insights into the thoughts, feelings, and experiences of typical Amazon customers."
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