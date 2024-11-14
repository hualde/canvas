import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const languages = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
]

const features = [
  { 
    icon: '🤖',
    title: 'Asistente de IA',
    description: 'Recibe recomendaciones y análisis en tiempo real que te ayudarán a fortalecer tu propuesta de valor con el apoyo de nuestro asistente de IA.'
  },
  {
    icon: '📄',
    title: 'Exportación a PDF',
    description: 'Descarga tus modelos de estrategia en formato PDF para compartirlos fácilmente con tu equipo y partes interesadas.'
  },
  {
    icon: '💡',
    title: 'Biblioteca de Ejemplos',
    description: 'Accede a ejemplos de Canvases estratégicos basados en empresas exitosas para inspirarte y guiar tus propias estrategias.'
  },
  {
    icon: '🎯',
    title: 'Múltiples Canvases',
    description: 'Crea y personaliza Business Model Canvas, Value Proposition, DAFO, PESTEL, y Empathy Map, con facilidad.'
  },
]

const testimonials = [
  {
    quote: "Esta app ha revolucionado cómo abordamos nuestra propuesta de valor. Es intuitiva y poderosa, una herramienta imprescindible para cualquier estratega.",
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    quote: "La perspectiva visual de esta herramienta nos ayudó a identificar puntos críticos en nuestra oferta que ni siquiera sabíamos que existían.",
    name: "Michael Chen",
    role: "Product Manager, InnovateCorp",
    image: "/placeholder.svg?height=100&width=100"
  },
]

const pricingPlans = [
  {
    name: "Plan Gratuito",
    price: "€0/mes",
    features: [
      "1 usuario",
      "3 proyectos",
      "Asistencia AI básica",
      "Herramientas de Canvas limitadas"
    ]
  },
  {
    name: "Plan Premium Mensual",
    price: "€9.99/mes",
    features: [
      "Usuarios ilimitados",
      "Proyectos ilimitados",
      "Asistencia AI avanzada",
      "Herramientas de Canvas completas",
      "Exportación a PDF",
      "Acceso a biblioteca de ejemplos",
      "Integración personalizada"
    ]
  },
  {
    name: "Plan Premium Anual",
    price: "€99.99/año",
    features: [
      "Todo lo incluido en el plan mensual",
      "Ahorro del 16% comparado con el plan mensual"
    ]
  }
]

const featureComparison = [
  { feature: "Número de Usuarios", free: "1", premium: "Ilimitados" },
  { feature: "Número de Proyectos", free: "3", premium: "Ilimitados" },
  { feature: "Asistencia AI", free: "Básica", premium: "Avanzada" },
  { feature: "Herramientas de Canvas", free: "Limitadas", premium: "Completas" },
  { feature: "Exportación a PDF", free: "❌", premium: "✅" },
  { feature: "Biblioteca de Ejemplos", free: "❌", premium: "✅" },
  { feature: "Integración Personalizada", free: "❌", premium: "✅" }
]

const faqs = [
  {
    question: "¿Qué es un Value Proposition Canvas?",
    answer: "Es una herramienta que ayuda a posicionar tu producto o servicio en torno a las necesidades y valores del cliente. Facilita el diseño de productos y servicios que tus clientes realmente quieren."
  },
  {
    question: "¿En qué se diferencia DAI Vinci de otras herramientas de planificación empresarial?",
    answer: "DAI Vinci da vida al Value Proposition Canvas y otros modelos estratégicos con características interactivas y análisis impulsado por IA, ofreciendo una experiencia más dinámica y fácil de usar."
  },
  {
    question: "¿Puedo usar DAI Vinci para múltiples proyectos?",
    answer: "Sí, dependiendo del plan que elijas, puedes gestionar varios proyectos dentro de la app, lo que te permite diseñar y comparar propuestas de valor para diferentes segmentos de clientes."
  },
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
            <img src="/placeholder.svg?height=40&width=40" alt="Logo" className="h-10 w-auto" />
            <span className="ml-2 text-2xl font-bold text-[#1E1F26] font-helvetica">DAI Vinci</span>
          </a>
          <nav className="flex items-center">
            <a href="#pricing" className="ml-6 text-[#1E1F26] no-underline font-medium">Precios</a>
            <a href="#faq" className="ml-6 text-[#1E1F26] no-underline font-medium">FAQ</a>
            <Button
              onClick={() => loginWithRedirect({ appState: { returnTo: "/app" } })}
              className="ml-6"
              variant="default"
            >
              {isLoading ? 'Cargando...' : (isAuthenticated ? 'Ir a la App' : 'Iniciar Sesión')}
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#F5F7FA] py-16 flex flex-col items-center text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-4 font-helvetica text-[#1E1F26]">
            Diseña Tu Propuesta de Valor con <span className="text-[#FF6600]">DAI Vinci</span>
          </h1>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl">
            DAI Vinci te ayuda a estructurar, visualizar y perfeccionar la estrategia de tu empresa de manera simple y efectiva. Utiliza herramientas de análisis como el Business Model Canvas, Value Proposition Canvas, DAFO, PESTEL, y más, para crear un enfoque sólido que impulse tu negocio.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => loginWithRedirect({ appState: { returnTo: "/app" } })}
              size="lg"
            >
              Empezar Ahora
            </Button>
            <Button
              onClick={() => window.scrollTo(0, document.body.scrollHeight)}
              variant="outline"
              size="lg"
            >
              Aprende Más
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 border-t border-b border-[#E6ECF2]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#1E1F26] font-helvetica">Características de DAI Vinci</h2>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl">
            Las poderosas herramientas de DAI Vinci están diseñadas para que estructures y optimices cada aspecto de tu estrategia empresarial. Desde la planificación hasta la presentación, cada función está pensada para que el proceso sea simple y efectivo.
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

      {/* Testimonials Section */}
      <section className="bg-[#F5F7FA] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#1E1F26] font-helvetica mb-4">Lo que nuestros usuarios dicen sobre DAI Vinci</h2>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
            Descubre cómo DAI Vinci ha transformado la estrategia de empresas en todo el mundo. La experiencia de nuestros usuarios habla de la simplicidad y efectividad que aporta la app a su planificación y ejecución empresarial.
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
          <h2 className="text-4xl font-bold text-[#1E1F26] font-helvetica mb-4">Planes de Suscripción de DAI Vinci</h2>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades y empieza a optimizar tu estrategia de negocio con DAI Vinci.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-[#FF6600]">{plan.name}</CardTitle>
                  <p className="text-2xl font-semibold text-[#1E1F26]">{plan.price}</p>
                </CardHeader>
                <CardContent>
                  <ul className="text-[#6B7280] list-none p-0 text-left mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="mb-2">✔ {feature}</li>
                    ))}
                  </ul>
                  <Button className="w-full">Elegir Plan</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Section */}
      <section className="bg-[#F5F7FA] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#1E1F26] font-helvetica mb-4">Comparativa de Características de Planes</h2>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
            Compara nuestras opciones de planes para encontrar el que mejor se ajuste a las necesidades de tu equipo y de tus proyectos empresariales.
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3 text-left">Característica</TableHead>
                <TableHead className="w-1/3 text-center">Plan Gratuito</TableHead>
                <TableHead className="w-1/3 text-center">Plan Premium</TableHead>
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
          <h2 className="text-4xl font-bold text-[#1E1F26] font-helvetica mb-8">Preguntas Frecuentes sobre DAI Vinci</h2>
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
          <h2 className="text-4xl font-bold mb-4">¿Listo para transformar tu estrategia?</h2>
          <p className="text-xl mb-8">Empieza tu prueba gratuita y lleva tu planificación empresarial al siguiente nivel con DAI Vinci.</p>
          <Button size="lg" onClick={() => loginWithRedirect({ appState: { returnTo: "/app" } })}>
            Comienza Ahora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E1F26] text-white py-8 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} DAI Vinci. Todos los derechos reservados.</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="#" className="text-[#FF6600] no-underline">Política de Privacidad</a>
            <a href="#" className="text-[#FF6600] no-underline">Términos de Servicio</a>
            <a href="#" className="text-[#FF6600] no-underline">Contáctanos</a>
          </div>
        </div>
      </footer>
    </div>
  )
}