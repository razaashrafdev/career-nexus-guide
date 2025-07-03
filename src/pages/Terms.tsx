
import { ArrowLeft } from "lucide-react";
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
              <div className="flex items-center text-purple-600 hover:text-purple-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </div>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Terms of Service</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceptance of Terms</h2>
              <p>By using CareerCompass, you agree to these terms of service. If you do not agree, please do not use our platform.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use of Service</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>You must be at least 16 years old to use our service</li>
                <li>Provide accurate information in assessments and profiles</li>
                <li>Use the platform only for legitimate career development purposes</li>
                <li>Do not share your account credentials with others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Intellectual Property</h2>
              <p>All content, including assessments, algorithms, and recommendations, is owned by CareerCompass. You may not reproduce or distribute our content without permission.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
              <p>CareerCompass provides career guidance but cannot guarantee employment outcomes. Use our recommendations as guidance, not absolute career decisions.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <p>For questions about these terms, contact us at legal@careercompass.com.</p>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              CareerCompass
            </div>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link>
              <Link to="/cookie-policy" className="hover:text-purple-400 transition-colors">Cookie Policy</Link>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              © 2025 CareerCompass. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Terms;
