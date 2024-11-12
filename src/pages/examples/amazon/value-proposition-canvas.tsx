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

export default function AmazonValuePropositionCanvas() {
  const navigate = useNavigate();

  const canvasData = {
    title: "Amazon Inc. Value Proposition Canvas",
    content: {
      productsAndServices: [
        "• E-commerce platform",
        "• Amazon Prime subscription",
        "• Amazon Web Services (AWS)",
        "• Kindle e-readers and e-books",
        "• Amazon Echo and Alexa",
        "• Amazon Fresh grocery delivery",
        "• Amazon Prime Video",
        "• Amazon Music",
        "• Amazon Marketplace for third-party sellers",
        "• Amazon Basics product line"
      ],
      gainCreators: [
        "• Wide product selection",
        "• Competitive pricing and deals",
        "• Fast and reliable delivery",
        "• Personalized recommendations",
        "• Convenient one-stop shopping experience"
      ],
      painRelievers: [
        "• Easy product returns and refunds",
        "• Customer reviews and ratings",
        "• 24/7 customer support",
        "• Secure payment options",
        "• Prime benefits (free shipping, streaming, etc.)"
      ],
      customerJobs: [
        "• Find and purchase products efficiently",
        "• Compare prices and product features",
        "• Receive orders quickly and reliably",
        "• Access entertainment content",
        "• Manage online shopping and subscriptions"
      ],
      gains: [
        "• Time and cost savings",
        "• Access to a vast product selection",
        "• Convenience of online shopping",
        "• Membership benefits and exclusive deals",
        "• Reliable and fast delivery options"
      ],
      pains: [
        "• Overwhelm from too many product choices",
        "• Concerns about product quality and authenticity",
        "• Shipping costs and delivery times",
        "• Difficulty in making informed purchase decisions",
        "• Privacy and data security concerns"
      ]
    },
    project_name: "Amazon Inc. Value Proposition Analysis",
    author: "Business Strategy Team",
    date: "2023-05-15",
    comments: "This canvas provides an overview of Amazon Inc.'s value proposition as of 2023."
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

      <div className="grid grid-cols-2 gap-8">
        {/* Left side - Square section */}
        <div className="relative border-2 border-gray-200 rounded-lg p-6 aspect-square overflow-hidden">
          <div className="absolute inset-0 bg-blue-200/30"></div>
          <div className="relative grid grid-cols-2 gap-4 h-full z-10">
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
            <div className="relative col-span-2">
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
        <div className="relative border-2 border-gray-200 rounded-full aspect-square">
          <div className="absolute inset-0 bg-blue-200/30 rounded-full"></div>
          <div className="absolute inset-0 grid grid-cols-2 gap-2 p-4">
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
            <div className="relative col-span-2 z-20">
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