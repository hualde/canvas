import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
]

const features = [
  { 
    icon: '🤖',
    title: 'AI Assistant',
    description: 'Receive real-time recommendations and analysis to help strengthen your value proposition with the support of our AI assistant.'
  },
  {
    icon: '📄',
    title: 'PDF Export',
    description: 'Download your strategy models in PDF format to easily share with your team and stakeholders.'
  },
  {
    icon: '💡',
    title: 'Example Library',
    description: 'Access examples of strategic Canvases based on successful companies to inspire and guide your own strategies.'
  },
  {
    icon: '🎯',
    title: 'Multiple Canvases',
    description: 'Easily create and customize Business Model Canvas, Value Proposition, SWOT, PESTEL, and Empathy Map.'
  },
]

const testimonials = [
  {
    quote: "This app has revolutionized how we approach our value proposition. It's intuitive and powerful, an essential tool for any strategist.",
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    image: "/images/sarah.png?height=100&width=100"
  },
  {
    quote: "The visual perspective of this tool helped us identify critical points in our offering that we didn't even know existed.",
    name: "Michael Chen",
    role: "Product Manager, InnovateCorp",
    image: "/images/cheng.png?height=100&width=160"
  },
]

const pricingPlans = [
  {
    name: "Free Plan",
    price: "€0/month",
    features: [
      "1 user",
      "3 projects",
      "Limited Canvas tools"
    ]
  },
  {
    name: "Monthly Premium Plan",
    price: "€9.99/month",
    features: [
      "Unlimited users",
      "Unlimited projects",
      "AI assistance",
      "Full Canvas tools",
      "PDF export",
      "Access to example library"
    ]
  },
  {
    name: "Annual Premium Plan",
    price: "€99.99/year",
    features: [
      "Everything included in the monthly plan",
      "Save 16% compared to monthly plan"
    ]
  }
]

const featureComparison = [
  { feature: "Number of Users", free: "1", premium: "Unlimited" },
  { feature: "Number of Projects", free: "3", premium: "Unlimited" },
  { feature: "AI Assistance", free: "No", premium: "Yes" },
  { feature: "Canvas Tools", free: "Limited", premium: "Unlimited" },
  { feature: "PDF Export", free: "❌", premium: "✅" },
  { feature: "Example Library", free: "❌", premium: "✅" }
]

const faqs = [
  {
    question: "What is a Value Proposition Canvas?",
    answer: "It's a tool that helps position your product or service around customer needs and values. It facilitates the design of products and services that your customers really want."
  },
  {
    question: "How does D'AI Vinci differ from other business planning tools?",
    answer: "D'AI Vinci brings the Value Proposition Canvas and other strategic models to life with interactive features and AI-driven analysis, offering a more dynamic and user-friendly experience."
  },
  {
    question: "Can I use D'AI Vinci for multiple projects?",
    answer: "Yes, depending on the plan you choose, you can manage several projects within the app, allowing you to design and compare value propositions for different customer segments."
  },
]

const companies = [
  { name: 'McKinsey & Company', logo: '/images/mckinsey.png?height=80&width=200' },
  { name: 'Boston Consulting Group', logo: '/images/bcg.png?height=80&width=200' },
  { name: 'Deloitte', logo: '/images/deloitte.png?height=80&width=200' },
  { name: 'Microsoft', logo: '/images/microsoft.png?height=80&width=200' },
  { name: 'IBM', logo: '/images/ibm.png?height=80&width=200' },
  { name: 'Salesforce', logo: '/images/salesforce.png?height=80&width=200' },
]

export default function LandingPage() {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0])
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0()

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#F5F7FA] to-[#E6ECF2] text-[#1E1F26] font-sans">
      {/* Language Selector Bar */}
      <div className="bg-[#1E1F26] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-end">
          <select
            value={currentLanguage.code}
            onChange={(e) => setCurrentLanguage(languages.find(lang => lang.code === e.target.value) || languages[0])}
            className="py-1 px-2 border border-[#E6ECF2] rounded bg-white text-[#1E1F26]"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center no-underline">
            <img src="/images/logo.png" alt="Logo" className="h-20 w-auto" />
            <span className="ml-2 text-2xl font-bold text-[#1E1F26] font-helvetica"></span>
          </a>
          <nav className="flex items-center">
            <a href="#pricing" className="ml-6 text-[#1E1F26] no-underline font-medium">Pricing</a>
            <a href="#faq" className="ml-6 text-[#1E1F26] no-underline font-medium">FAQ</a>
            <Button
              onClick={() => loginWithRedirect({ appState: { returnTo: "/dashboard" } })}
              className="ml-6"
              variant="default"
            >
              {isLoading ? 'Loading...' : (isAuthenticated ? 'Go to App' : 'Login')}
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#F5F7FA] py-16 flex flex-col items-center text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-4 font-helvetica text-[#1E1F26]">
            Design Your Value Proposition with <span className="text-[#FF6600]">D'AI Vinci</span>
          </h1>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl">
            D'AI Vinci helps you structure, visualize, and refine your company's strategy simply and effectively. Use analysis tools like Business Model Canvas, Value Proposition Canvas, SWOT, PESTEL, and more to create a solid approach that drives your business.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => loginWithRedirect({ appState: { returnTo: "/app" } })}
              size="lg"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 border-t border-b border-[#E6ECF2]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#1E1F26] font-helvetica">D'AI Vinci Features</h2>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl">
            D'AI Vinci's powerful tools are designed to help you structure and optimize every aspect of your business strategy. From planning to presentation, each function is designed to make the process simple and effective.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <span className="text-4xl mr-2">{feature.icon}</span>
                    <span className="text-xl font-semibold text-[#FF6600]">{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#6B7280]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1E1F26] font-helvetica mb-8 text-center">
            Trusted by Industry Leaders
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {companies.map((company) => (
              <div key={company.name} className="flex justify-center">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#F5F7FA] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#1E1F26] font-helvetica mb-4">What our users say about D'AI Vinci</h2>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
            Discover how D'AI Vinci has transformed business strategy for companies worldwide. Our users' experience speaks to the simplicity and effectiveness that the app brings to their business planning and execution.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center p-6">
                  <p className="text-lg text-[#6B7280] mb-4 italic">"{testimonial.quote}"</p>
                  <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mb-2" />
                  <h3 className="font-semibold text-[#1E1F26]">{testimonial.name}</h3>
                  <p className="text-[#6B7280]">{testimonial.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#1E1F26] font-helvetica mb-4">D'AI Vinci Subscription Plans</h2>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
            Choose the plan that best suits your needs and start optimizing your business strategy with D'AI Vinci.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className="flex flex-col min-h-[400px]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-[#FF6600]">{plan.name}</CardTitle>
                  <p className="text-2xl font-semibold text-[#1E1F26]">{plan.price}</p>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-grow">
                  <ul className="text-[#6B7280] list-none p-0 text-left mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="mb-2">✔ {feature}</li>
                    ))}
                  </ul>
                  <Button className="w-full mt-auto">Choose Plan</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Section */}
      <section className="bg-[#F5F7FA] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#1E1F26] font-helvetica mb-4">Plan Feature Comparison</h2>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
            Compare our plan options to find the one that best fits the needs of your team and your business projects.
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3 text-left font-bold">Feature</TableHead>
                <TableHead className="w-1/3 text-center font-bold">Free Plan</TableHead>
                <TableHead className="w-1/3 text-center font-bold">Premium Plan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {featureComparison.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-left">{item.feature}</TableCell>
                  <TableCell className="text-center">{item.free}</TableCell>
                  <TableCell className="text-center">{item.premium}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#1E1F26] font-helvetica mb-8">Frequently Asked Questions about D'AI Vinci</h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="mb-4">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-[#FF6600]">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#6B7280]">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1E1F26] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to transform your strategy?</h2>
          <p className="text-xl mb-8">Start your free trial and take your business planning to the next level with D'AI Vinci.</p>
          <Button size="lg" onClick={() => loginWithRedirect({ appState: { returnTo: "/app" } })}>
            Start Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E1F26] text-white py-8 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} D'AI Vinci. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="#" className="text-[#FF6600] no-underline">Privacy Policy</a>
            <a href="#" className="text-[#FF6600] no-underline">Terms of Service</a>
            <a href="#" className="text-[#FF6600] no-underline">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
}