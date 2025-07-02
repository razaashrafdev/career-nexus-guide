
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Lock, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
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
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg">
            Last updated: January 2, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-purple-600" />
              Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At CareerCompass, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, website, and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-700">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Name, email address, and contact information</li>
                  <li>Educational background and academic information</li>
                  <li>Career interests and professional goals</li>
                  <li>Resume and work experience data</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-700">Assessment Data</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Personality test responses and results</li>
                  <li>Skills assessments and competency evaluations</li>
                  <li>Career preference indicators</li>
                  <li>Learning style and work environment preferences</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-700">Technical Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Usage patterns and platform interactions</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <Lock className="h-6 w-6 mr-2 text-blue-600" />
              How We Use Your Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600">Provide personalized career recommendations and insights</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600">Analyze personality traits and match you with suitable career paths</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600">Improve our AI algorithms and assessment accuracy</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600">Communicate with you about your account and our services</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600">Ensure platform security and prevent fraudulent activities</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Information Sharing</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-800 font-medium">
                We do NOT sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </div>
            <p className="text-gray-600 mb-4">We may share your information only in the following limited circumstances:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations or court orders</li>
              <li>To protect our rights, property, or safety, or that of our users</li>
              <li>With service providers who assist in our operations (under strict confidentiality agreements)</li>
              <li>In connection with a business transfer or acquisition (with notice to you)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-green-600" />
              Data Security
            </h2>
            <p className="text-gray-600 mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Encryption</h4>
                <p className="text-purple-700 text-sm">All data is encrypted in transit and at rest using AES-256 encryption</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Access Controls</h4>
                <p className="text-blue-700 text-sm">Strict access controls and multi-factor authentication for all systems</p>
              </div>
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-800 mb-2">Regular Audits</h4>
                <p className="text-indigo-700 text-sm">Regular security audits and penetration testing by third-party experts</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Data Backup</h4>
                <p className="text-green-700 text-sm">Secure, encrypted backups with disaster recovery procedures</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <Eye className="h-6 w-6 mr-2 text-amber-600" />
              Your Rights
            </h2>
            <p className="text-gray-600 mb-4">You have the following rights regarding your personal information:</p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Access</h4>
                  <p className="text-gray-600 text-sm">Request a copy of your personal information we have collected</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Correction</h4>
                  <p className="text-gray-600 text-sm">Request correction of inaccurate or incomplete information</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 text-xs font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Deletion</h4>
                  <p className="text-gray-600 text-sm">Request deletion of your personal information (subject to legal requirements)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-xs font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Portability</h4>
                  <p className="text-gray-600 text-sm">Request transfer of your data to another service provider</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Cookies and Tracking</h2>
            <p className="text-gray-600 mb-4">
              We use cookies and similar technologies to enhance your experience and analyze platform usage. You can control cookie settings through your browser preferences.
            </p>
            <Link to="/cookie-policy" className="text-purple-600 hover:text-purple-700 font-medium">
              Learn more in our Cookie Policy →
            </Link>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-gray-700"><strong>Email:</strong> privacy@careercompass.com</p>
              <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 012-3456</p>
              <p className="text-gray-700"><strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105</p>
            </div>
          </section>

          <section className="border-t pt-6">
            <p className="text-sm text-gray-500">
              This Privacy Policy may be updated periodically. We will notify you of any material changes by email or through our platform. Your continued use of our services after such changes constitutes acceptance of the updated policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
