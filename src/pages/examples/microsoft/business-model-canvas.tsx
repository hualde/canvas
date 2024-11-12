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

export default function MicrosoftBusinessModelCanvas() {
  const navigate = useNavigate();

  const canvasData = {
    title: "Microsoft Corporation Business Model Canvas",
    content: {
      keyPartners: [
        "• Hardware manufacturers (OEMs)",
        "• Software developers and ISVs",
        "• Cloud service providers",
        "• Research institutions and universities",
        "• Retailers and distributors"
      ],
      keyActivities: [
        "• Software development and innovation",
        "• Cloud infrastructure management (Azure)",
        "• Hardware design and production (Surface, Xbox)",
        "• Research and development",
        "• Customer support and services"
      ],
      keyResources: [
        "• Intellectual property and patents",
        "• Global data centers and cloud infrastructure",
        "• Skilled workforce and engineering talent",
        "• Brand reputation and customer trust",
        "• Financial resources"
      ],
      valuePropositions: [
        "• Comprehensive productivity and collaboration tools",
        "• Scalable cloud computing solutions (Azure)",
        "• Enterprise software and services",
        "• Consumer electronics and gaming (Xbox, Surface)",
        "• AI and machine learning technologies"
      ],
      customerRelationships: [
        "• Long-term enterprise partnerships",
        "• Developer community engagement",
        "• Customer support and training",
        "• Subscription-based services",
        "• User feedback and product improvement"
      ],
      channels: [
        "• Microsoft website and online stores",
        "• Partner network and resellers",
        "• Microsoft Stores (physical retail)",
        "• Enterprise sales teams",
        "• Digital marketplaces (Microsoft Store, Azure Marketplace)"
      ],
      customerSegments: [
        "• Enterprises and businesses",
        "• Small and medium-sized businesses",
        "• Developers and IT professionals",
        "• Educational institutions",
        "• Consumers and gamers"
      ],
      costStructure: [
        "• Research and development",
        "• Cloud infrastructure and data centers",
        "• Marketing and sales",
        "• Employee salaries and benefits",
        "• Hardware manufacturing and distribution"
      ],
      revenueStreams: [
        "• Software licenses and subscriptions",
        "• Cloud services (Azure)",
        "• Enterprise solutions and services",
        "• Hardware sales (Surface, Xbox)",
        "• Gaming revenue (Xbox, game sales)"
      ]
    },
    project_name: "Microsoft Corporation Analysis",
    author: "Business Strategy Team",
    date: "2023-05-15",
    comments: "This canvas provides an overview of Microsoft Corporation's business model as of 2023."
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