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

export default function TeslaBusinessModelCanvas() {
  const navigate = useNavigate();

  const canvasData = {
    title: "Tesla Inc. Business Model Canvas",
    content: {
      keyPartners: [
        "• Battery suppliers and manufacturers",
        "• Charging network partners",
        "• Automotive suppliers",
        "• Technology partners for autonomous driving",
        "• Solar panel and energy storage suppliers"
      ],
      keyActivities: [
        "• Electric vehicle design and manufacturing",
        "• Battery technology development",
        "• Software and autonomous driving development",
        "• Charging network expansion",
        "• Energy storage solutions development"
      ],
      keyResources: [
        "• Innovative technology and patents",
        "• Manufacturing facilities (Gigafactories)",
        "• Brand reputation and loyal customer base",
        "• Supercharger network",
        "• Talented engineering and design team"
      ],
      valuePropositions: [
        "• High-performance electric vehicles",
        "• Long-range and fast-charging capabilities",
        "• Advanced autonomous driving features",
        "• Sustainable energy solutions",
        "• Innovative and futuristic brand image"
      ],
      customerRelationships: [
        "• Direct sales model",
        "• Online customer support",
        "• Over-the-air software updates",
        "• Tesla community and brand loyalty",
        "• Referral programs"
      ],
      channels: [
        "• Tesla website and mobile app",
        "• Tesla-owned showrooms and galleries",
        "• Social media and word-of-mouth",
        "• Tesla events and product launches",
        "• Supercharger network locations"
      ],
      customerSegments: [
        "• Early adopters of technology",
        "• Environmentally conscious consumers",
        "• Luxury and performance car enthusiasts",
        "• Businesses and fleet operators",
        "• Energy-conscious homeowners"
      ],
      costStructure: [
        "• Research and development",
        "• Manufacturing and production",
        "• Raw materials and components",
        "• Expansion of Gigafactories",
        "• Supercharger network infrastructure"
      ],
      revenueStreams: [
        "• Electric vehicle sales",
        "• Energy generation and storage products",
        "• Charging and service fees",
        "• Software upgrades and subscriptions",
        "• Regulatory credits"
      ]
    },
    project_name: "Tesla Inc. Analysis",
    author: "Business Strategy Team",
    date: "2023-05-15",
    comments: "This canvas provides an overview of Tesla Inc.'s business model as of 2023."
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
        <div className="relative z-10 grid grid-cols-5 gap-4">
          <CanvasSection
            title="Key Partners"
            items={canvasData.content.keyPartners}
            description="Who are your key partners and suppliers?"
            className="h-full"
            icon={icons.keyPartnerships}
          />
          <div className="grid grid-rows-2 gap-4">
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
          <div className="grid grid-rows-2 gap-4">
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

        <div className="relative z-10 grid grid-cols-2 gap-4 mt-4">
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