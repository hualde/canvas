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

const sections = [
  { 
    key: 'political', 
    color: '#4DB6AC', 
    lightColor: '#B2DFDB', 
    label: 'Political', 
    description: 'What political factors can affect your business?'
  },
  { 
    key: 'economic', 
    color: '#FF7043', 
    lightColor: '#FFCCBC', 
    label: 'Economic', 
    description: 'What are the economic conditions influencing your market?'
  },
  { 
    key: 'social', 
    color: '#C0CA33', 
    lightColor: '#F0F4C3', 
    label: 'Social', 
    description: 'What social and cultural trends affect your audience?'
  },
  { 
    key: 'technological', 
    color: '#4DB6AC', 
    lightColor: '#B2DFDB', 
    label: 'Technological', 
    description: 'How does technology impact your industry and products?'
  },
  { 
    key: 'environmental', 
    color: '#FF7043', 
    lightColor: '#FFCCBC', 
    label: 'Environmental', 
    description: 'What environmental factors are relevant to your business?'
  },
  { 
    key: 'legal', 
    color: '#C0CA33', 
    lightColor: '#F0F4C3', 
    label: 'Legal', 
    description: 'What laws and regulations affect your operation?'
  }
];

export default function MicrosoftPESTELCanvas() {
  const navigate = useNavigate();

  const canvasData = {
    title: "Microsoft Corporation PESTEL Analysis",
    content: {
      political: [
        "• Government regulations on tech companies and data privacy",
        "• International trade policies affecting global operations",
        "• Political pressure on big tech companies",
        "• Government contracts and partnerships (e.g., JEDI contract)",
        "• Lobbying efforts and political influence in tech policy"
      ],
      economic: [
        "• Global economic conditions affecting IT spending",
        "• Currency exchange rate fluctuations",
        "• Competition in cloud services and software markets",
        "• Economic disparities in different markets",
        "• Shifts in enterprise and consumer spending patterns"
      ],
      social: [
        "• Changing work patterns (remote work, digital transformation)",
        "• Growing demand for accessibility in technology",
        "• Increasing awareness of tech's role in society",
        "• Cultural differences in international markets",
        "• Social media influence on brand perception"
      ],
      technological: [
        "• Rapid advancements in AI and machine learning",
        "• Cloud computing and edge computing developments",
        "• Quantum computing research and development",
        "• Cybersecurity challenges and solutions",
        "• Internet of Things (IoT) and 5G technology integration"
      ],
      environmental: [
        "• Pressure to reduce carbon footprint in operations and data centers",
        "• Sustainable product design and manufacturing",
        "• E-waste management and recycling programs",
        "• Renewable energy adoption in facilities",
        "• Climate change impacts on global operations"
      ],
      legal: [
        "• Antitrust laws and regulations",
        "• Data protection and privacy laws (e.g., GDPR, CCPA)",
        "• Intellectual property rights and patent laws",
        "• Software licensing and piracy regulations",
        "• Employment laws in different countries"
      ]
    },
    project_name: "Microsoft Corporation PESTEL Analysis",
    author: "Strategic Planning Team",
    date: "2023-05-15",
    comments: "This PESTEL analysis provides an overview of the macro-environmental factors affecting Microsoft Corporation as of 2023."
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

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {sections.map((section) => (
          <div key={section.key} className="relative">
            <div 
              style={{ backgroundColor: section.lightColor }}
              className="rounded-lg pt-8 pb-4 px-4 h-full"
            >
              <div 
                style={{ backgroundColor: section.color }}
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-2xl font-bold text-white">
                  {section.key.charAt(0).toUpperCase()}
                </span>
              </div>
              <div 
                style={{ backgroundColor: section.color }}
                className="text-white text-center py-2 -mx-4 mb-4"
              >
                <h3 className="text-lg font-semibold">{section.label}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">{section.description}</p>
              <div className="min-h-[200px]">
                <CanvasSection
                  title=""
                  items={canvasData.content[section.key as keyof typeof canvasData.content]}
                  description=""
                  className="bg-transparent"
                  icon={icons[section.key as keyof typeof icons]}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}