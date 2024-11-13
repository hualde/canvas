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
    name: "Basic",
    price: "$9.99/month",
    features: ["1 User", "5 Projects", "Basic Analytics", "Email Support"]
  },
  {
    name: "Pro",
    price: "$29.99/month",
    features: ["5 Users", "Unlimited Projects", "Advanced Analytics", "Priority Support", "API Access"]
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Unlimited Users", "Unlimited Projects", "Custom Analytics", "24/7 Support", "API Access", "Custom Integrations"]
  },
]

const faqs = [
  {
    question: "What is a Value Proposition Canvas?",
    answer: "A Value Proposition Canvas is a tool to ensure that a product or service is positioned around what the customer values and needs. It helps businesses to design products and services that customers want."
  },
  {
    question: "How does this app differ from traditional business planning tools?",
    answer: "Our app brings the Value Proposition Canvas to life with interactive features, real-time collaboration, and AI-powered insights. It's designed to be more dynamic and user-friendly than traditional business planning tools."
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
    <div style={{ minHeight: '100vh', backgroundColor: 'white', color: '#1a202c', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/placeholder.svg?height=40&width=40" alt="Logo" style={{ height: '40px', width: 'auto' }} />
            <span style={{ marginLeft: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: '#3182ce' }}>ValueProp</span>
          </a>
          <nav style={{ display: 'none', '@media (min-width: 768px)': { display: 'flex' } }}>
            <a href="#features" style={{ marginLeft: '1.5rem', color: '#4a5568', textDecoration: 'none' }}>Features</a>
            <a href="#demo" style={{ marginLeft: '1.5rem', color: '#4a5568', textDecoration: 'none' }}>Demo</a>
            <a href="#pricing" style={{ marginLeft: '1.5rem', color: '#4a5568', textDecoration: 'none' }}>Pricing</a>
            <a href="#faq" style={{ marginLeft: '1.5rem', color: '#4a5568', textDecoration: 'none' }}>FAQ</a>
          </nav>
          <div style={{ display: 'none', '@media (min-width: 768px)': { display: 'flex', alignItems: 'center' } }}>
            <select 
              value={currentLanguage.code}
              onChange={(e) => setCurrentLanguage(languages.find(lang => lang.code === e.target.value) || languages[0])}
              style={{ marginLeft: '1rem', padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '0.25rem' }}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
            <button style={{ marginLeft: '1rem', padding: '0.5rem 1rem', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
              Get Started
            </button>
          </div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ '@media (min-width: 768px)': { display: 'none' }, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '1.5rem' }}>☰</span>
          </button>
        </div>
        {isMenuOpen && (
          <div style={{ padding: '1rem', backgroundColor: 'white', '@media (min-width: 768px)': { display: 'none' } }}>
            <a href="#features" style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568', textDecoration: 'none' }}>Features</a>
            <a href="#demo" style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568', textDecoration: 'none' }}>Demo</a>
            <a href="#pricing" style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568', textDecoration: 'none' }}>Pricing</a>
            <a href="#faq" style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568', textDecoration: 'none' }}>FAQ</a>
            <select 
              value={currentLanguage.code}
              onChange={(e) => setCurrentLanguage(languages.find(lang => lang.code === e.target.value) || languages[0])}
              style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '0.25rem' }}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
            <button style={{ display: 'block', width: '100%', padding: '0.5rem 1rem', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
              Get Started
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section style={{ backgroundColor: '#ebf8ff', padding: '4rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', '@media (min-width: 1024px)': { flexDirection: 'row', alignItems: 'center' } }}>
            <div style={{ flex: 1, marginBottom: '2rem', '@media (min-width: 1024px)': { marginBottom: 0, marginRight: '2rem' } }}>
              <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Design Your <span style={{ color: '#3182ce' }}>Value Proposition</span>
              </h1>
              <p style={{ fontSize: '1.25rem', color: '#4a5568', marginBottom: '2rem' }}>
                Create, test, and refine your value proposition with our intuitive canvas tool. Inspired by Alexander Osterwalder's methodology.
              </p>
              <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '0.25rem', fontSize: '1.125rem', cursor: 'pointer' }}>
                Download App
              </button>
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
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>
            Everything you need to design your value proposition
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr' } }}>
            {features.map((feature, index) => (
              <div key={index} style={{ display: 'flex' }}>
                <div style={{ fontSize: '2rem', marginRight: '1rem' }}>{feature.icon}</div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{feature.title}</h3>
                  <p style={{ color: '#4a5568' }}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Demo Section */}
      <section id="demo" style={{ backgroundColor: '#f7fafc', padding: '4rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            See ValueProp in Action
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#4a5568', marginBottom: '2rem' }}>
            Watch how easy it is to create and refine your value proposition using our intuitive interface.
          </p>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <img
              src="/placeholder.svg?height=720&width=1280"
              alt="App demo"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '4rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '2rem' }}>
            What our users are saying
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr' } }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} style={{ backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
                <p style={{ fontSize: '1.125rem', color: '#4a5568', fontStyle: 'italic', marginBottom: '1rem' }}>"{testimonial.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={testimonial.image} alt={testimonial.name} style={{ width: '3rem', height: '3rem', borderRadius: '9999px', marginRight: '1rem' }} />
                  <div>
                    <p style={{ fontWeight: 'bold' }}>{testimonial.name}</p>
                    <p style={{ color: '#718096' }}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ backgroundColor: '#f7fafc', padding: '4rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Pricing Plans
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#4a5568', marginBottom: '2rem' }}>
            Choose the plan that's right for you and start designing your value proposition today.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr 1fr' } }}>
            {pricingPlans.map((plan, index) => (
              <div key={index} style={{ backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{plan.name}</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{plan.price}</p>
                <ul style={{ marginBottom: '1.5rem' }}>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#48bb78', marginRight: '0.5rem' }}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <button style={{ width: '100%', padding: '0.75rem', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '0.25rem', fontSize: '1rem', cursor: 'pointer' }}>
                  Get started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ padding: '4rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '2rem' }}>
            Frequently Asked Questions
          </h2>
          <div>
            {faqs.map((faq, index) => (
              <div key={index} style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{faq.question}</h3>
                <p style={{ color: '#4a5568' }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{ backgroundColor: '#3182ce', color: 'white', padding: '4rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', '@media (min-width: 1024px)': { flexDirection: 'row', justifyContent: 'space-between' } }}>
          <div style={{ marginBottom: '2rem', '@media (min-width: 1024px)': { marginBottom: 0 } }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Ready to dive in?</h2>
            <p style={{ fontSize: '1.25rem' }}>Start your free trial today.</p>
          </div>
          <button style={{ padding: '0.75rem 1.5rem', backgroundColor: 'white', color: '#3182ce', border: 'none', borderRadius: '0.25rem', fontSize: '1.125rem', fontWeight: 'bold', cursor: 'pointer' }}>
            Get started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#2d3748', color: '#a0aec0', padding: '4rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr 1fr 1fr' } }}>
            <div>
              <img src="/placeholder.svg?height=40&width=40" alt="Company logo" style={{ height: '2.5rem', marginBottom: '1rem' }} />
              <p style={{ marginBottom: '1rem' }}>Making the world a better place through constructing elegant hierarchies.</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#" style={{ color: '#a0aec0' }}>
                  <span style={{ fontSize: '1.5rem' }}>f</span>
                </a>
                <a href="#" style={{ color: '#a0aec0' }}>
                  <span style={{ fontSize: '1.5rem' }}>t</span>
                </a>
              </div>
            </div>
            <div>
              <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Solutions</h3>
              <ul>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Marketing</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Analytics</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Commerce</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Insights</a></li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Support</h3>
              <ul>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Pricing</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Documentation</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Guides</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>API Status</a></li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Company</h3>
              <ul>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>About</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Blog</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Jobs</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Press</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Partners</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #4a5568', marginTop: '2rem', paddingTop: '2rem', textAlign: 'center' }}>
            <p>&copy; 2023 ValueProp, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}