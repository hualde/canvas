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

export default function AmazonPESTELCanvas() {
  const navigate = useNavigate();

  const canvasData = {
    title: "Amazon Inc. PESTEL Analysis",
    content: {
      political: [
        "• Government regulations on e-commerce and online sales",
        "• International trade policies and tariffs",
        "• Political pressure on big tech companies",
        "• Lobbying efforts and political influence",
        "• Government contracts and partnerships"
      ],
      economic: [
        "• Global economic conditions affecting consumer spending",
        "• Currency exchange rate fluctuations",
        "• Labor market trends and wage pressures",
        "• Interest rates impacting consumer credit",
        "• Economic disparities in different markets"
      ],
      social: [
        "• Changing consumer shopping habits (e.g., shift to online)",
        "• Increasing demand for fast and convenient delivery",
        "• Growing awareness of ethical consumption",
        "• Social media influence on shopping behavior",
        "• Cultural differences in international markets"
      ],
      technological: [
        "• Advancements in AI and machine learning",
        "• Innovations in logistics and delivery (e.g., drones)",
        "• Cloud computing and AWS developments",
        "• Internet of Things (IoT) and smart home technology",
        "• Cybersecurity challenges and solutions"
      ],
      environmental: [
        "• Pressure to reduce carbon footprint in operations",
        "• Sustainable packaging initiatives",
        "• Climate change impacts on supply chain",
        "• Renewable energy adoption in data centers",
        "• E-waste management and recycling programs"
      ],
      legal: [
        "• Antitrust laws and regulations",
        "• Data protection and privacy laws (e.g., GDPR, CCPA)",
        "• Consumer protection regulations",
        "• Employment laws in different countries",
        "• Intellectual property rights and patent laws"
      ]
    },
    project_name: "Amazon Inc. PESTEL Analysis",
    author: "Strategic Planning Team",
    date: "2023-05-15",
    comments: "This PESTEL analysis provides an overview of the macro-environmental factors affecting Amazon Inc. as of 2023."
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {sections.map((section) => (
          <div key={section.key} className="relative">
            <div 
              style={{ backgroundColor: section.lightColor }}
              className="rounded-lg pt-8 pb-4 px-2 sm:px-4 h-full"
            >
              <div 
                style={{ backgroundColor: section.color }}
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-xl sm:text-2xl font-bold text-white">
                  {section.key.charAt(0).toUpperCase()}
                </span>
              </div>
              <div 
                style={{ backgroundColor: section.color }}
                className="text-white text-center py-1 sm:py-2 -mx-2 sm:-mx-4 mb-2 sm:mb-4"
              >
                <h3 className="text-base sm:text-lg font-semibold">{section.label}</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">{section.description}</p>
              <div className="min-h-[150px] sm:min-h-[200px]">
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