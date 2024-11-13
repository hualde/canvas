import React, { useState } from 'react'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
]

const features = [
  { 
    icon: '📊',
    title: 'Value Mapping',
    description: 'Easily map and visualize your value propositions.'
  },
  {
    icon: '🎯',
    title: 'Customer Profiling',
    description: 'Create detailed customer profiles to understand your audience better.'
  },
  {
    icon: '🧪',
    title: 'Hypothesis Testing',
    description: 'Test your business assumptions with built-in experimentation tools.'
  },
  {
    icon: '📈',
    title: 'Progress Tracking',
    description: 'Monitor your business model evolution over time.'
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(languages[0])

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'white', 
      color: '#2C3E50', 
      fontFamily: 'Arial, sans-serif',
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23C5D9F1" fill-opacity="0.1" fill-rule="evenodd"/%3E%3C/svg%3E")',
      backgroundAttachment: 'fixed',
    }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/placeholder.svg?height=40&width=40" alt="Logo" style={{ height: '40px', width: 'auto' }} />
            <span style={{ marginLeft: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: '#2C3E50', fontFamily: 'Comic Sans MS, cursive' }}>ValueProp</span>
          </a>
          <nav style={{ display: 'none', '@media (min-width: 768px)': { display: 'flex' } }}>
            <a href="#features" style={{ marginLeft: '1.5rem', color: '#2C3E50', textDecoration: 'none' }}>Features</a>
            <a href="#pricing" style={{ marginLeft: '1.5rem', color: '#2C3E50', textDecoration: 'none' }}>Pricing</a>
            <a href="#faq" style={{ marginLeft: '1.5rem', color: '#2C3E50', textDecoration: 'none' }}>FAQ</a>
          </nav>
          <div style={{ display: 'none', '@media (min-width: 768px)': { display: 'flex', alignItems: 'center' } }}>
            <select 
              value={currentLanguage.code}
              onChange={(e) => setCurrentLanguage(languages.find(lang => lang.code === e.target.value) || languages[0])}
              style={{ marginLeft: '1rem', padding: '0.5rem', border: '1px solid #C5D9F1', borderRadius: '0.25rem', backgroundColor: 'white', color: '#2C3E50' }}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
            <button style={{ marginLeft: '1rem', padding: '0.5rem 1rem', backgroundColor: '#E74C3C', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
              Login
            </button>
          </div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ '@media (min-width: 768px)': { display: 'none' }, background: 'none', border: 'none', cursor: 'pointer', color: '#2C3E50' }}
          >
            <span style={{ fontSize: '1.5rem' }}>☰</span>
          </button>
        </div>
        {isMenuOpen && (
          <div style={{ padding: '1rem', backgroundColor: 'white', '@media (min-width: 768px)': { display: 'none' } }}>
            <a href="#features" style={{ display: 'block', marginBottom: '0.5rem', color: '#2C3E50', textDecoration: 'none' }}>Features</a>
            <a href="#pricing" style={{ display: 'block', marginBottom: '0.5rem', color: '#2C3E50', textDecoration: 'none' }}>Pricing</a>
            <a href="#faq" style={{ display: 'block', marginBottom: '0.5rem', color: '#2C3E50', textDecoration: 'none' }}>FAQ</a>
            <select 
              value={currentLanguage.code}
              onChange={(e) => setCurrentLanguage(languages.find(lang => lang.code === e.target.value) || languages[0])}
              style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem', border: '1px solid #C5D9F1', borderRadius: '0.25rem', backgroundColor: 'white', color: '#2C3E50' }}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
            <button style={{ display: 'block', width: '100%', padding: '0.5rem 1rem', backgroundColor: '#E74C3C', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
              Login
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section style={{ backgroundColor: '#C5D9F1', padding: '4rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', '@media (min-width: 1024px)': { flexDirection: 'row', alignItems: 'center' } }}>
            <div style={{ flex: 1, marginBottom: '2rem', '@media (min-width: 1024px)': { marginBottom: 0, marginRight: '2rem' } }}>
              <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'Comic Sans MS, cursive', color: '#2C3E50' }}>
                Design Your <span style={{ color: '#E74C3C' }}>Value Proposition</span>
              </h1>
              <p style={{ fontSize: '1.25rem', color: '#2C3E50', marginBottom: '2rem' }}>
                Create, test, and refine your value proposition with our intuitive canvas tool. Inspired by Alexander Osterwalder's methodology.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#E74C3C', color: 'white', border: 'none', borderRadius: '0.25rem', fontSize: '1.125rem', cursor: 'pointer' }}>
                  Get Started
                </button>
                <button style={{ padding: '0.75rem 1.5rem', backgroundColor: 'white', color: '#E74C3C', border: '2px solid #E74C3C', borderRadius: '0.25rem', fontSize: '1.125rem', cursor: 'pointer' }}>
                  Learn More
                </button>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <img src="/placeholder.svg?height=400&width=600" alt="App screenshot" style={{ width: '100%', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '4rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem', fontFamily: 'Comic Sans MS, cursive', color: '#2C3E50' }}>
            Everything you need to design your value proposition
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr' } }}>
            {features.map((feature, index) => (
              <div key={index} style={{ display: 'flex', backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
                <div style={{ fontSize: '2rem', marginRight: '1rem' }}>{feature.icon}</div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#2C3E50' }}>{feature.title}</h3>
                  <p style={{ color: '#2C3E50' }}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '4rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '2rem', fontFamily: 'Comic Sans MS, cursive', color: '#2C3E50', textAlign: 'center' }}>
            What our users are saying
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr' } }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} style={{ backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
                <p style={{ fontSize: '1.125rem', color: '#2C3E50', fontStyle: 'italic', marginBottom: '1rem' }}>"{testimonial.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={testimonial.image} alt={testimonial.name} style={{ width: '3rem', height: '3rem', borderRadius: '9999px', marginRight: '1rem' }} />
                  <div>
                    <p style={{ fontWeight: 'bold', color: '#2C3E50' }}>{testimonial.name}</p>
                    <p style={{ color: '#2C3E50' }}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ backgroundColor: '#C5D9F1', padding: '4rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'Comic Sans MS, cursive', color: '#2C3E50', textAlign: 'center' }}>
            Pricing Plans
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#2C3E50', marginBottom: '2rem', textAlign: 'center' }}>
            Choose the plan that's right for you and start designing your value proposition today.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr 1fr' } }}>
            {pricingPlans.map((plan, index) => (
              <div key={index} style={{ backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#2C3E50' }}>{plan.name}</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#E74C3C' }}>{plan.price}</p>
                <ul style={{ marginBottom: '1.5rem' }}>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', color: '#2C3E50' }}>
                      <span style={{ color: '#E74C3C', marginRight: '0.5rem' }}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <button style={{ width: '100%', padding: '0.75rem', backgroundColor: '#E74C3C', color: 'white', border: 'none', borderRadius: '0.25rem', fontSize: '1rem', cursor: 'pointer' }}>
                  {plan.name === 'Free' ? 'Get Started' : 'Upgrade Now'}
                </button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '4rem', backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#2C3E50', textAlign: 'center' }}>Feature Comparison</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #C5D9F1' }}>
                  <th style={{ padding: '0.5rem', textAlign: 'left', color: '#2C3E50' }}>Feature</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center', color: '#2C3E50' }}>Free</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center', color: '#2C3E50' }}>Premium Monthly</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center', color: '#2C3E50' }}>Premium Annual</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #C5D9F1' }}>
                    <td style={{ padding: '0.5rem', color: '#2C3E50' }}>{item.feature}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'center', color: '#2C3E50' }}>{item.free}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'center', color: '#2C3E50' }}>{item.premium}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'center', color: '#2C3E50' }}>{item.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ padding: '4rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '2rem', fontFamily: 'Comic Sans MS, cursive', color: '#2C3E50', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          <div>
            {faqs.map((faq, index) => (
              <div key={index} style={{ marginBottom: '1.5rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#2C3E50' }}>{faq.question}</h3>
                <p style={{ color: '#2C3E50' }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{ backgroundColor: '#2C3E50', color: 'white', padding: '4rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', '@media (min-width: 1024px)': { flexDirection: 'row', justifyContent: 'space-between' } }}>
          <div style={{ marginBottom: '2rem', '@media (min-width: 1024px)': { marginBottom: 0 } }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.5rem', fontFamily: 'Comic Sans MS, cursive' }}>Ready to dive in?</h2>
            <p style={{ fontSize: '1.25rem' }}>Start your free trial today.</p>
          </div>
          <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#E74C3C', color: 'white', border: 'none', borderRadius: '0.25rem', fontSize: '1.125rem', fontWeight: 'bold', cursor: 'pointer' }}>
            Get started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#2C3E50', color: '#C5D9F1', padding: '4rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr 1fr 1fr' } }}>
            <div>
              <img src="/placeholder.svg?height=40&width=40" alt="Company logo" style={{ height: '2.5rem', marginBottom: '1rem' }} />
              <p style={{ marginBottom: '1rem' }}>Making the world a better place through constructing elegant hierarchies.</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#" style={{ color: '#C5D9F1' }}>
                  <span style={{ fontSize: '1.5rem' }}>f</span>
                </a>
                <a href="#" style={{ color: '#C5D9F1' }}>
                  <span style={{ fontSize: '1.5rem' }}>t</span>
                </a>
              </div>
            </div>
            <div>
              <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Solutions</h3>
              <ul>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#C5D9F1', textDecoration: 'none' }}>Marketing</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#C5D9F1', textDecoration: 'none' }}>Analytics</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#C5D9F1', textDecoration: 'none' }}>Commerce</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#C5D9F1', textDecoration: 'none' }}>Insights</a></li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Company</h3>
              <ul>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#C5D9F1', textDecoration: 'none' }}>About</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#C5D9F1', textDecoration: 'none' }}>Blog</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#C5D9F1', textDecoration: 'none' }}>Jobs</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#C5D9F1', textDecoration: 'none' }}>Press</a></li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Legal</h3>
              <ul>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#C5D9F1', textDecoration: 'none' }}>Privacy</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#C5D9F1', textDecoration: 'none' }}>Terms</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #C5D9F1', marginTop: '2rem', paddingTop: '2rem', textAlign: 'center' }}>
            <p>&copy; 2023 ValueProp, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}