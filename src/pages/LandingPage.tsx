import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
]

const features = [
  { 
    icon: '🤖',
    title: 'AI Assistant',
    description: 'Get intelligent suggestions and insights to improve your value propositions with our AI-powered assistant.'
  },
  {
    icon: '📄',
    title: 'PDF Export',
    description: 'Export your canvas to PDF format for easy sharing and presentation with stakeholders.'
  },
  {
    icon: '💡',
    title: 'Example Library',
    description: 'Access a comprehensive library of canvas examples from successful companies.'
  },
  {
    icon: '🎯',
    title: 'Multiple Canvas Types',
    description: 'Create Business Model, Value Proposition, Empathy Map, and other strategic canvases.'
  },
]

const testimonials = [
  {
    quote: "This app has revolutionized how we approach our value proposition. It's intuitive and powerful!",
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    quote: "The visual approach of this tool helped us identify gaps in our offering we never knew existed.",
    name: "Michael Chen",
    role: "Product Manager, InnovateCorp",
    image: "/placeholder.svg?height=100&width=100"
  },
]

const pricingPlans = [
  {
    name: "Free",
    price: "$0/month",
    features: [
      "1 User",
      "3 Projects",
      "Basic Analytics",
      "Limited Canvas Tools"
    ]
  },
  {
    name: "Premium Monthly",
    price: "$9.99/month",
    features: [
      "Unlimited Users",
      "Unlimited Projects",
      "Advanced Analytics",
      "Full Canvas Toolkit",
      "AI-Powered Insights",
      "Custom Integrations"
    ]
  },
  {
    name: "Premium Annual",
    price: "$99.99/year",
    features: [
      "Unlimited Users",
      "Unlimited Projects",
      "Advanced Analytics",
      "Full Canvas Toolkit",
      "AI-Powered Insights",
      "Custom Integrations",
      "Save 16% compared to monthly"
    ]
  }
]

const featureComparison = [
  { feature: "Number of Users", free: "1", premium: "Unlimited" },
  { feature: "Number of Projects", free: "3", premium: "Unlimited" },
  { feature: "Analytics", free: "Basic", premium: "Advanced" },
  { feature: "Canvas Tools", free: "Limited", premium: "Full Toolkit" },
  { feature: "AI-Powered Insights", free: "❌", premium: "✅" },
  { feature: "Custom Integrations", free: "❌", premium: "✅" }
]

const faqs = [
  {
    question: "What is a Value Proposition Canvas?",
    answer: "A Value Proposition Canvas is a tool to ensure that a product or service is positioned around what the customer values and needs. It helps businesses to design products and services that customers want."
  },
  {
    question: "How does this app differ from traditional business planning tools?",
    answer: "Our app brings the Value Proposition Canvas to life with interactive features and AI-powered insights. It's designed to be more dynamic and user-friendly than traditional business planning tools."
  },
  {
    question: "Can I use this app for multiple projects?",
    answer: "Yes! Depending on your plan, you can manage multiple projects within the app. This allows you to create and compare value propositions for different products or customer segments."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use industry-standard encryption and security practices to ensure your data is safe. We never share your information with third parties."
  },
]

export default function LandingPage() {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0])
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5F7FA',
      color: '#1E1F26',
      fontFamily: 'Arial, sans-serif',
      backgroundImage: 'linear-gradient(to right, #F5F7FA, #E6ECF2)',
    }}>
      {/* Language Selector Bar */}
      <div style={{ backgroundColor: '#1E1F26', color: 'white', padding: '0.5rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <select
            value={currentLanguage.code}
            onChange={(e) => setCurrentLanguage(languages.find(lang => lang.code === e.target.value) || languages[0])}
            style={{
              padding: '0.25rem',
              border: '1px solid #E6ECF2',
              borderRadius: '0.25rem',
              backgroundColor: 'white',
              color: '#1E1F26'
            }}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Header */}
      <header style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto', padding: '1rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/placeholder.svg?height=40&width=40" alt="Logo" style={{ height: '40px', width: 'auto' }} />
            <span style={{
              marginLeft: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold',
              color: '#1E1F26', fontFamily: 'Helvetica Neue, sans-serif'
            }}>ValueProp</span>
          </a>
          <nav style={{ display: 'flex', alignItems: 'center' }}>
            <a href="#pricing" style={{
              marginLeft: '1.5rem', color: '#1E1F26', textDecoration: 'none', fontWeight: '500'
            }}>Pricing</a>
            <a href="#faq" style={{
              marginLeft: '1.5rem', color: '#1E1F26', textDecoration: 'none', fontWeight: '500'
            }}>FAQ</a>
            <button
              onClick={() => loginWithRedirect({ appState: { returnTo: "/app" } })}
              style={{
                marginLeft: '1.5rem', padding: '0.5rem 1rem', backgroundColor: '#FF6600', color: 'white',
                border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontWeight: '600'
              }}
            >
              {isLoading ? 'Loading...' : (isAuthenticated ? 'Go to App' : 'Login')}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        backgroundColor: '#F5F7FA',
        padding: '4rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto', padding: '0 1rem',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h1 style={{
            fontSize: '3rem', fontWeight: '700',
            marginBottom: '1rem', fontFamily: 'Helvetica Neue, sans-serif',
            color: '#1E1F26'
          }}>
            Design Your <span style={{ color: '#FF6600' }}>Value Proposition</span>
          </h1>
          <p style={{
            fontSize: '1.25rem', color: '#6B7280', marginBottom: '2rem', maxWidth: '600px'
          }}>
            Create, test, and refine your value proposition with our intuitive canvas tool, inspired by Alexander Osterwalder's methodology.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => loginWithRedirect({ appState: { returnTo: "/app" } })}
              style={{
                padding: '0.75rem 1.5rem', backgroundColor: '#FF6600', color: 'white',
                border: 'none', borderRadius: '0.25rem', fontWeight: '600',
                fontSize: '1rem', cursor: 'pointer'
              }}
            >
              Get Started
            </button>
            <button
              onClick={() => window.scrollTo(0, document.body.scrollHeight)}
              style={{
                padding: '0.75rem 1.5rem', backgroundColor: '#1E1F26', color: 'white',
                border: 'none', borderRadius: '0.25rem', fontWeight: '600',
                fontSize: '1rem', cursor: 'pointer'
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
<section style={{
  backgroundColor: '#FFFFFF',
  padding: '4rem 0',
  borderTop: '1px solid #E6ECF2',
  borderBottom: '1px solid #E6ECF2',
}}>
  <div style={{
    maxWidth: '1280px', margin: '0 auto', padding: '0 1rem',
    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
  }}>
    <h2 style={{
      fontSize: '2.5rem', fontWeight: '700',
      marginBottom: '2rem', color: '#1E1F26', fontFamily: 'Helvetica Neue, sans-serif'
    }}>Features</h2>
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem', width: '100%'
    }}>
      {features.map((feature, index) => (
        <div key={index} style={{
          padding: '2rem', borderRadius: '0.5rem', backgroundColor: '#F5F7FA',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem' }}>{feature.icon}</div>
          <h3 style={{
            fontSize: '1.5rem', fontWeight: '600', color: '#FF6600', marginTop: '0.5rem'
          }}>{feature.title}</h3>
          <p style={{ color: '#6B7280', marginTop: '0.5rem' }}>{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Pricing Section */}
<section id="pricing" style={{
  backgroundColor: '#F5F7FA', padding: '4rem 0',
}}>
  <div style={{
    maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', textAlign: 'center'
  }}>
    <h2 style={{
      fontSize: '2.5rem', fontWeight: '700', color: '#1E1F26',
      fontFamily: 'Helvetica Neue, sans-serif', marginBottom: '2rem'
    }}>Pricing</h2>
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem', width: '100%'
    }}>
      {pricingPlans.map((plan, index) => (
        <div key={index} style={{
          padding: '2rem', borderRadius: '0.5rem', backgroundColor: '#FFFFFF',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '1.75rem', fontWeight: '700', color: '#FF6600'
          }}>{plan.name}</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1E1F26', margin: '1rem 0' }}>
            {plan.price}
          </p>
          <ul style={{ color: '#6B7280', listStyle: 'none', padding: 0, textAlign: 'left' }}>
            {plan.features.map((feature, featureIndex) => (
              <li key={featureIndex} style={{ marginBottom: '0.5rem' }}>
                ✔ {feature}
              </li>
            ))}
          </ul>
          <button style={{
            marginTop: '1.5rem', padding: '0.5rem 1rem', backgroundColor: '#FF6600',
            color: 'white', border: 'none', borderRadius: '0.25rem', fontWeight: '600',
            fontSize: '1rem', cursor: 'pointer'
          }}>
            Choose Plan
          </button>
        </div>
      ))}
    </div>
  </div>
</section>

{/* FAQ Section */}
<section id="faq" style={{
  backgroundColor: '#FFFFFF', padding: '4rem 0',
}}>
  <div style={{
    maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', textAlign: 'center'
  }}>
    <h2 style={{
      fontSize: '2.5rem', fontWeight: '700', color: '#1E1F26', fontFamily: 'Helvetica Neue, sans-serif',
      marginBottom: '2rem'
    }}>Frequently Asked Questions</h2>
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {faqs.map((faq, index) => (
        <div key={index} style={{
          marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#F5F7FA',
          borderRadius: '0.5rem', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          textAlign: 'left'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#FF6600' }}>{faq.question}</h3>
          <p style={{ color: '#6B7280', marginTop: '0.5rem' }}>{faq.answer}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Footer */}
<footer style={{
  backgroundColor: '#1E1F26', color: 'white', padding: '2rem 0', textAlign: 'center'
}}>
  <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
    <p>&copy; {new Date().getFullYear()} ValueProp. All rights reserved.</p>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
      <a href="#" style={{ color: '#FF6600', textDecoration: 'none' }}>Privacy Policy</a>
      <a href="#" style={{ color: '#FF6600', textDecoration: 'none' }}>Terms of Service</a>
      <a href="#" style={{ color: '#FF6600', textDecoration: 'none' }}>Contact Us</a>
    </div>
  </div>
</footer>
</div>
);
}
