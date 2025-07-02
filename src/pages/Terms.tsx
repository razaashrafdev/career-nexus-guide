
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              CareerCompass
            </Link>
            <Link to="/">
              <Button variant="ghost">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-gray-600 text-lg">
            Last updated: January 2, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Agreement to Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              By accessing and using CareerCompass ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-blue-800 text-sm">
                  These terms constitute a legally binding agreement between you and CareerCompass. Please read them carefully.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Use License</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-700 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Permitted Uses
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-7">
                  <li>Access and use the platform for personal career development</li>
                  <li>Take personality tests and career assessments</li>
                  <li>Receive AI-powered career recommendations</li>
                  <li>Upload and analyze your resume for career insights</li>
                  <li>Interact with our AI career counselor</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-red-700 flex items-center">
                  <XCircle className="h-5 w-5 mr-2" />
                  Prohibited Uses
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-7">
                  <li>Reverse engineer, decompile, or disassemble any part of our platform</li>
                  <li>Use the service for any unlawful purpose or to solicit unlawful conduct</li>
                  <li>Attempt to gain unauthorized access to our systems or data</li>
                  <li>Share your account credentials with others</li>
                  <li>Use automated systems to access or interact with our platform</li>
                  <li>Misrepresent your identity or provide false information</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">User Accounts</h2>
            <div className="space-y-4">
              <p className="text-gray-600">When you create an account with us, you must provide information that is accurate, complete, and current at all times.</p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Account Responsibilities</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• You are responsible for safeguarding your password</li>
                  <li>• You are responsible for all activities that occur under your account</li>
                  <li>• You must notify us immediately of any unauthorized use</li>
                  <li>• We reserve the right to refuse service or terminate accounts</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Privacy and Data</h2>
            <p className="text-gray-600 mb-4">
              Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy.
            </p>
            <Link to="/privacy" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
              Read our Privacy Policy
              <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
            </Link>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Service Availability</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                We strive to provide continuous service, but we cannot guarantee uninterrupted access to our platform.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">What We Provide</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• 99.9% uptime target</li>
                    <li>• 24/7 AI counselor availability</li>
                    <li>• Regular platform updates</li>
                    <li>• Data backup and security</li>
                  </ul>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-800 mb-2">Limitations</h4>
                  <ul className="text-amber-700 text-sm space-y-1">
                    <li>• Scheduled maintenance windows</li>
                    <li>• Force majeure events</li>
                    <li>• Third-party service dependencies</li>
                    <li>• Internet connectivity issues</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Intellectual Property</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                The service and its original content, features, and functionality are and will remain the exclusive property of CareerCompass and its licensors.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Our Property</h4>
                <ul className="text-purple-700 text-sm space-y-1">
                  <li>• AI algorithms and assessment methodologies</li>
                  <li>• Platform design and user interface</li>
                  <li>• Career matching algorithms</li>
                  <li>• Database of career information</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Your Content</h4>
                <p className="text-blue-700 text-sm">
                  You retain ownership of any content you submit to our platform, but grant us a license to use it for providing our services and improving our platform.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Disclaimers</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-800 mb-1">Career Guidance</h4>
                  <p className="text-red-700 text-sm">Our assessments and recommendations are for guidance purposes only and should not be considered as professional career counseling or guarantee of employment.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-800 mb-1">Service Accuracy</h4>
                  <p className="text-red-700 text-sm">While we strive for accuracy, we make no warranties about the completeness, reliability, or accuracy of our assessments or career information.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              In no event shall CareerCompass, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Termination</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Grounds for Termination</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Breach of these Terms of Service</li>
                  <li>• Fraudulent or illegal activity</li>
                  <li>• Violation of our community guidelines</li>
                  <li>• Non-payment of fees (for premium services)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-gray-700"><strong>Email:</strong> legal@careercompass.com</p>
              <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 012-3456</p>
              <p className="text-gray-700"><strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105</p>
            </div>
          </section>

          <section className="border-t pt-6">
            <p className="text-sm text-gray-500">
              By using our service, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
