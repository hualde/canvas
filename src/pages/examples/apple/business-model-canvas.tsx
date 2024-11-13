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

export default function AppleBusinessModelCanvas() {
  const navigate = useNavigate();

  const canvasData = {
    title: "Apple Inc. Business Model Canvas",
    content: {
      keyPartners: [
        "• Component suppliers (e.g., Samsung, Intel)",
        "• Manufacturing partners (e.g., Foxconn)",
        "• Software developers",
        "• Content providers",
        "• Telecom carriers"
      ],
      keyActivities: [
        "• Product design and development",
        "• Marketing and branding",
        "• Software development (iOS, macOS)",
        "• Supply chain management",
        "• Retail operations"
      ],
      keyResources: [
        "• Brand and reputation",
        "• Proprietary technology and patents",
        "• Apple ecosystem",
        "• Retail stores",
        "• Human resources (designers, engineers)"
      ],
      valuePropositions: [
        "• User-friendly, innovative products",
        "• Seamless ecosystem integration",
        "• Premium brand experience",
        "• High-quality customer service",
        "• Privacy and security focus"
      ],
      customerRelationships: [
        "• Personal assistance in retail stores",
        "• Self-service through website and app",
        "• Customer support (Apple Care)",
        "• Community engagement",
        "• Loyalty programs (Apple Card)"
      ],
      channels: [
        "• Apple retail stores",
        "• Online Apple Store",
        "• Authorized resellers",
        "• App Store",
        "• Direct sales team (for enterprise)"
      ],
      customerSegments: [
        "• Consumers (mass market)",
        "• Professionals and creatives",
        "• Educational institutions",
        "• Enterprises",
        "• Tech enthusiasts"
      ],
      costStructure: [
        "• Research and development",
        "• Manufacturing and assembly",
        "• Marketing and advertising",
        "• Retail operations",
        "• Software development and maintenance"
      ],
      revenueStreams: [
        "• Hardware sales (iPhone, Mac, iPad, etc.)",
        "• Services (iCloud, Apple Music, Apple TV+)",
        "• App Store commissions",
        "• AppleCare and warranties",
        "• Licensing"
      ]
    },
    project_name: "Apple Inc. Analysis",
    author: "Business Strategy Team",
    date: "2023-05-15",
    comments: "This canvas provides an overview of Apple Inc.'s business model as of 2023."
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
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4">
          <CanvasSection
            title="Key Partners"
            items={canvasData.content.keyPartners}
            description="Who are your key partners and suppliers?"
            className="h-full"
            icon={icons.keyPartnerships}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-4">
            <CanvasSection
              title="Key Activities"
              items={canvasData.content.keyActivities}
              description="What key activities does your value proposition require?"
              className="h-full"
              icon={icons.keyActivities}
            />
            <CanvasSection
              title="Key Resources"
              items={canvasData.content.keyResources}
              description="What key resources does your value proposition require?"
              className="h-full"
              icon={icons.keyResources}
            />
          </div>
          <CanvasSection
            title="Value Propositions"
            items={canvasData.content.valuePropositions}
            description="What value do you deliver to the customer?"
            className="h-full"
            icon={icons.valuePropositions}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-4">
            <CanvasSection
              title="Customer Relationships"
              items={canvasData.content.customerRelationships}
              description="What relationship does each customer segment expect?"
              className="h-full"
              icon={icons.customerRelationships}
            />
            <CanvasSection
              title="Channels"
              items={canvasData.content.channels}
              description="Which channels do your customers prefer?"
              className="h-full"
              icon={icons.channels}
            />
          </div>
          <CanvasSection
            title="Customer Segments"
            items={canvasData.content.customerSegments}
            description="For whom are you creating value?"
            className="h-full"
            icon={icons.customerSegments}
          />
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-2 sm:mt-4">
          <CanvasSection
            title="Cost Structure"
            items={canvasData.content.costStructure}
            description="What are the most important costs inherent in your business model?"
            className="h-full"
            icon={icons.costStructure}
          />
          <CanvasSection
            title="Revenue Streams"
            items={canvasData.content.revenueStreams}
            description="For what value are your customers really willing to pay?"
            className="h-full"
            icon={icons.revenueStreams}
          />
        </div>
      </div>
    </div>
  );
}