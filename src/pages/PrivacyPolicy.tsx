import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicy() {
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
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-semibold mt-6">1. Introduction</h2>
          <p>Welcome to DAI Vinci ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.</p>

          <h2 className="text-2xl font-semibold mt-6">2. Information We Collect</h2>
          <p>We collect personal information that you provide to us, such as name, email address, and payment information. We also automatically collect certain information when you visit our website, including your IP address, browser type, and usage information through cookies and similar technologies.</p>

          <h2 className="text-2xl font-semibold mt-6">3. How We Use Your Information</h2>
          <p>We use your information to provide and improve our services, process payments, communicate with you, and comply with legal obligations. We may also use your information for marketing purposes, but you can opt out at any time.</p>

          <h2 className="text-2xl font-semibold mt-6">4. Information Sharing and Disclosure</h2>
          <p>We may share your information with third-party service providers that perform services for us. We may also disclose your information if required by law or to protect our rights or the rights of others.</p>

          <h2 className="text-2xl font-semibold mt-6">5. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>

          <h2 className="text-2xl font-semibold mt-6">6. Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. Please contact us to exercise these rights.</p>

          <h2 className="text-2xl font-semibold mt-6">7. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

          <h2 className="text-2xl font-semibold mt-6">8. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@daivinci.com.</p>
        </CardContent>
      </Card>
    </div>
  )
}