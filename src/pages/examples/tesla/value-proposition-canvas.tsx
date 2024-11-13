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

export default function TeslaValuePropositionCanvas() {
  const navigate = useNavigate();

  const canvasData = {
    title: "Tesla Inc. Value Proposition Canvas",
    content: {
      productsAndServices: [
        "• Electric vehicles (Model S, 3, X, Y)",
        "• Solar roof and solar panels",
        "• Powerwall and Powerpack energy storage",
        "• Supercharger network",
        "• Full Self-Driving (FSD) capability",
        "• Over-the-air software updates",
        "• Tesla mobile app",
        "• Tesla insurance",
        "• Cybertruck (upcoming)",
        "• Tesla Semi (upcoming)"
      ],
      gainCreators: [
        "• Long-range, high-performance electric vehicles",
        "• Advanced autonomous driving features",
        "• Integrated sustainable energy ecosystem",
        "• Regular software updates enhancing vehicle capabilities",
        "• Innovative and futuristic design"
      ],
      painRelievers: [
        "• Extensive Supercharger network reducing range anxiety",
        "• Low maintenance requirements compared to ICE vehicles",
        "• Enhanced safety features and high crash test ratings",
        "• Simplified purchasing and delivery process",
        "• Mobile app for remote vehicle control and monitoring"
      ],
      customerJobs: [
        "• Commute and travel efficiently and sustainably",
        "• Reduce carbon footprint and environmental impact",
        "• Stay up-to-date with cutting-edge technology",
        "• Enhance home energy management and independence",
        "• Experience high-performance driving"
      ],
      gains: [
        "• Reduced long-term transportation costs",
        "• Improved environmental impact",
        "• Access to latest automotive technology",
        "• Enhanced driving experience and performance",
        "• Status symbol of owning a premium, innovative vehicle"
      ],
      pains: [
        "• Range anxiety for long trips",
        "• High upfront costs of electric vehicles",
        "• Limited model options compared to traditional automakers",
        "• Concerns about battery longevity and replacement costs",
        "• Adapting to new technology and charging infrastructure"
      ]
    },
    project_name: "Tesla Inc. Value Proposition Analysis",
    author: "Business Strategy Team",
    date: "2023-05-15",
    comments: "This canvas provides an overview of Tesla Inc.'s value proposition as of 2023."
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {/* Left side - Square section */}
        <div className="relative border-2 border-gray-200 rounded-lg p-2 sm:p-4 md:p-6 overflow-hidden">
          <div className="absolute inset-0 bg-blue-200/30"></div>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 h-full z-10">
            <div className="relative">
              <CanvasSection
                title="Products and Services"
                items={canvasData.content.productsAndServices}
                description="What products and services do you offer?"
                icon={icons.products}
                className="h-full"
              />
            </div>
            <div className="relative">
              <CanvasSection
                title="Gain Creators"
                items={canvasData.content.gainCreators}
                description="How do you create customer gains?"
                icon={icons.gainCreators}
                className="h-full"
              />
            </div>
            <div className="relative col-span-1 sm:col-span-2">
              <CanvasSection
                title="Pain Relievers"
                items={canvasData.content.painRelievers}
                description="How do you relieve customer pains?"
                icon={icons.painRelievers}
                className="h-full"
              />
            </div>
          </div>
        </div>

        {/* Right side - Circle section */}
        <div className="relative border-2 border-gray-200 rounded-lg lg:rounded-full aspect-auto lg:aspect-square">
          <div className="absolute inset-0 bg-blue-200/30 rounded-lg lg:rounded-full"></div>
          <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 sm:p-4">
            <div className="relative z-20">
              <CanvasSection
                title="Customer Jobs"
                items={canvasData.content.customerJobs}
                description="What jobs do your customers need to get done?"
                icon={icons.customerJobs}
                className="h-full"
              />
            </div>
            <div className="relative z-20">
              <CanvasSection
                title="Gains"
                items={canvasData.content.gains}
                description="What gains do your customers desire?"
                icon={icons.gains}
                className="h-full"
              />
            </div>
            <div className="relative col-span-1 sm:col-span-2 z-20">
              <CanvasSection
                title="Pains"
                items={canvasData.content.pains}
                description="What pains do your customers experience?"
                icon={icons.pains}
                className="h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}