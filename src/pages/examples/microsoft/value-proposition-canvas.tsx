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

export default function MicrosoftValuePropositionCanvas() {
  const navigate = useNavigate();

  const canvasData = {
    title: "Microsoft Corporation Value Proposition Canvas",
    content: {
      productsAndServices: [
        "• Windows operating system",
        "• Microsoft 365 (Office suite)",
        "• Azure cloud services",
        "• Xbox gaming consoles and services",
        "• Surface hardware devices",
        "• LinkedIn professional network",
        "• GitHub development platform",
        "• Dynamics 365 (CRM and ERP)",
        "• Power Platform (low-code development)",
        "• Microsoft Teams collaboration tool"
      ],
      gainCreators: [
        "• Integrated ecosystem of productivity tools",
        "• Scalable cloud solutions for businesses",
        "• Regular software updates and improvements",
        "• Cross-platform compatibility",
        "• AI and machine learning integration"
      ],
      painRelievers: [
        "• Comprehensive security features",
        "• 24/7 technical support",
        "• Seamless integration between products",
        "• Familiar user interfaces across products",
        "• Flexible licensing and subscription options"
      ],
      customerJobs: [
        "• Increase productivity and efficiency",
        "• Collaborate effectively with teams",
        "• Manage and analyze large datasets",
        "• Secure sensitive information",
        "• Scale IT infrastructure"
      ],
      gains: [
        "• Streamlined workflows and processes",
        "• Cost savings through integrated solutions",
        "• Access to cutting-edge technology",
        "• Enhanced communication and collaboration",
        "• Improved decision-making with data insights"
      ],
      pains: [
        "• Complexity of managing multiple IT systems",
        "• Security vulnerabilities and data breaches",
        "• High costs of software licenses and hardware",
        "• Difficulty in adopting new technologies",
        "• Compatibility issues between different platforms"
      ]
    },
    project_name: "Microsoft Corporation Value Proposition Analysis",
    author: "Business Strategy Team",
    date: "2023-05-15",
    comments: "This canvas provides an overview of Microsoft Corporation's value proposition as of 2023."
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