import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsOfService() {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="mb-6 flex items-center text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-semibold mt-6">1. Acceptance of Terms</h2>
          <p>By accessing or using DAI Vinci's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>

          <h2 className="text-2xl font-semibold mt-6">2. Description of Service</h2>
          <p>DAI Vinci provides business modeling and strategy analysis tools. We reserve the right to modify, suspend, or discontinue any part of the service at any time.</p>

          <h2 className="text-2xl font-semibold mt-6">3. User Accounts</h2>
          <p>You may be required to create an account to use certain features of our service. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>

          <h2 className="text-2xl font-semibold mt-6">4. User Conduct</h2>
          <p>You agree not to use our service for any unlawful purpose or in any way that could damage, disable, overburden, or impair our servers or networks.</p>

          <h2 className="text-2xl font-semibold mt-6">5. Intellectual Property</h2>
          <p>All content and materials available on DAI Vinci's website and services are the property of DAI Vinci or its licensors and are protected by copyright, trademark, and other intellectual property laws.</p>

          <h2 className="text-2xl font-semibold mt-6">6. Payment and Subscription</h2>
          <p>If you choose a paid service, you agree to pay all fees associated with the service. We may change our fees at any time, but will provide you with advance notice of these changes.</p>

          <h2 className="text-2xl font-semibold mt-6">7. Termination</h2>
          <p>We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.</p>

          <h2 className="text-2xl font-semibold mt-6">8. Disclaimer of Warranties</h2>
          <p>Our services are provided "as is" without any warranties, expressed or implied. We do not guarantee that our services will be uninterrupted or error-free.</p>

          <h2 className="text-2xl font-semibold mt-6">9. Limitation of Liability</h2>
          <p>DAI Vinci shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>

          <h2 className="text-2xl font-semibold mt-6">10. Changes to Terms</h2>
          <p>We reserve the right to modify these Terms of Service at any time. We will notify users of any significant changes by posting a notice on our website.</p>

          <h2 className="text-2xl font-semibold mt-6">11. Governing Law</h2>
          <p>These Terms of Service shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>

          <h2 className="text-2xl font-semibold mt-6">12. Contact Information</h2>
          <p>If you have any questions about these Terms of Service, please contact us at legal@daivinci.com.</p>
        </CardContent>
      </Card>
    </div>
  )
}