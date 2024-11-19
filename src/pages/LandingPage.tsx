import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useTranslation } from 'react-i18next'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from 'next/image'


const features = [
  { 
    icon: '🤖',
    titleKey: 'features.aiAssistant.title',
    descriptionKey: 'features.aiAssistant.description'
  },
  {
    icon: '📄',
    titleKey: 'features.pdfExport.title',
    descriptionKey: 'features.pdfExport.description'
  },
  {
    icon: '💡',
    titleKey: 'features.exampleLibrary.title',
    descriptionKey: 'features.exampleLibrary.description'
  },
  {
    icon: '🎯',
    titleKey: 'features.multipleCanvases.title',
    descriptionKey: 'features.multipleCanvases.description'
  },
]

const testimonials = [
  {
    quoteKey: 'testimonials.sarah.quote',
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    image: "/images/sarah.png?height=100&width=100"
  },
  {
    quoteKey: 'testimonials.michael.quote',
    name: "Michael Chen",
    role: "Product Manager, InnovateCorp",
    image: "/images/cheng.png?height=100&width=160"
  },
]

const pricingPlans = [
  {
    nameKey: 'pricing.freePlan.name',
    priceKey: 'pricing.freePlan.price',
    featuresKey: 'pricing.freePlan.features'
  },
  {
    nameKey: 'pricing.monthlyPlan.name',
    priceKey: 'pricing.monthlyPlan.price',
    featuresKey: 'pricing.monthlyPlan.features'
  },
  {
    nameKey: 'pricing.annualPlan.name',
    priceKey: 'pricing.annualPlan.price',
    featuresKey: 'pricing.annualPlan.features'
  }
]

const featureComparison = [
  { featureKey: 'featureComparison.users', free: "1", premium: "Unlimited" },
  { featureKey: 'featureComparison.projects', free: "3", premium: "Unlimited" },
  { featureKey: 'featureComparison.aiAssistance', free: "No", premium: "Yes" },
  { featureKey: 'featureComparison.canvasTools', free: "Limited", premium: "Unlimited" },
  { featureKey: 'featureComparison.pdfExport', free: "❌", premium: "✅" },
  { featureKey: 'featureComparison.exampleLibrary', free: "❌", premium: "✅" }
]

const faqs = [
  {
    questionKey: 'faq.valueProposition.question',
    answerKey: 'faq.valueProposition.answer'
  },
  {
    questionKey: 'faq.difference.question',
    answerKey: 'faq.difference.answer'
  },
  {
    questionKey: 'faq.multipleProjects.question',
    answerKey: 'faq.multipleProjects.answer'
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
  const { t } = useTranslation()
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0()

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#F5F7FA] to-[#E6ECF2] text-[#1E1F26] font-sans">

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center no-underline">
            <div className="relative w-20 h-20">
              <Image
                src="/images/logo.png"
                alt="Logo"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
            <span className="ml-2 text-2xl font-bold text-[#1E1F26] font-helvetica"></span>
          </a>
          <nav className="flex items-center">
            <a href="#pricing" className="ml-6 text-[#1E1F26] no-underline font-medium">{t('header.pricing')}</a>
            <a href="#faq" className="ml-6 text-[#1E1F26] no-underline font-medium">{t('header.faq')}</a>
            <Button
              onClick={() => loginWithRedirect({ appState: { returnTo: "/dashboard" } })}
              className="ml-6"
              variant="default"
            >
              {isLoading ? t('header.loading') : (isAuthenticated ? t('header.goToApp') : t('header.login'))}
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#F5F7FA] py-16 flex flex-col items-center text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-4 font-helvetica text-[#1E1F26]">
            {t('hero.title')} <span className="text-[#FF6600]">D'AI Vinci</span>
          </h1>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl">
            {t('hero.description')}
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => loginWithRedirect({ appState: { returnTo: "/dashboard" } })}
              size="lg"
            >
              {t('hero.getStarted')}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 border-t border-b border-[#E6ECF2]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#1E1F26] font-helvetica">{t('features.title')}</h2>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl">
            {t('features.description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <span className="text-4xl mr-2">{feature.icon}</span>
                    <span className="text-xl font-semibold text-[#FF6600]">{t(feature.titleKey)}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#6B7280]">{t(feature.descriptionKey)}</p>
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
            {t('companies.title')}
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
          <h2 className="text-4xl font-bold text-[#1E1F26] font-helvetica mb-4">{t('testimonials.title')}</h2>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
            {t('testimonials.description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center p-6">
                  <p className="text-lg text-[#6B7280] mb-4 italic">"{t(testimonial.quoteKey)}"</p>
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
          <h2 className="text-4xl font-bold text-[#1E1F26] font-helvetica mb-4">{t('pricing.title')}</h2>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
            {t('pricing.description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className="flex flex-col min-h-[400px]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-[#FF6600]">{t(plan.nameKey)}</CardTitle>
                  <p className="text-2xl font-semibold text-[#1E1F26]">{t(plan.priceKey)}</p>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-grow">
                  <ul className="text-[#6B7280] list-none p-0 text-left mb-6">
                    {(t(plan.featuresKey, { returnObjects: true }) as string[]).map((feature, featureIndex) => (
                      <li key={featureIndex} className="mb-2">✔ {feature}</li>
                    ))}
                  </ul>
                  <Button className="w-full mt-auto">{t('pricing.choosePlan')}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Section */}
      <section className="bg-[#F5F7FA] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#1E1F26] font-helvetica mb-4">{t('featureComparison.title')}</h2>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
            {t('featureComparison.description')}
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3 text-left font-bold">{t('featureComparison.feature')}</TableHead>
                <TableHead className="w-1/3 text-center font-bold">{t('featureComparison.freePlan')}</TableHead>
                <TableHead className="w-1/3 text-center font-bold">{t('featureComparison.premiumPlan')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {featureComparison.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-left">{t(item.featureKey)}</TableCell>
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
          <h2 className="text-4xl font-bold text-[#1E1F26] font-helvetica mb-8">{t('faq.title')}</h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="mb-4">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-[#FF6600]">{t(faq.questionKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#6B7280]">{t(faq.answerKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1E1F26] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">{t('cta.title')}</h2>
          <p className="text-xl mb-8">{t('cta.description')}</p>
          <Button size="lg" onClick={() => loginWithRedirect({ appState: { returnTo: "/dashboard" } })}>
            {t('cta.startNow')}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E1F26] text-white py-8 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} D'AI Vinci. {t('footer.allRightsReserved')}</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="#" className="text-[#FF6600] no-underline">{t('footer.privacyPolicy')}</a>
            <a href="#" className="text-[#FF6600] no-underline">{t('footer.termsOfService')}</a>
            <a href="#" className="text-[#FF6600] no-underline">{t('footer.contactUs')}</a>
          </div>
        </div>
      </footer>
    </div>
  )
}