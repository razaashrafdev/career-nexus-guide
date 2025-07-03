
import { ArrowLeft } from "lucide-react";
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
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
              <p>We collect information you provide when creating an account, taking assessments, and using our services. This includes your name, email, personality test responses, and resume data.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide personalized career recommendations</li>
                <li>Analyze your skills and personality traits</li>
                <li>Improve our AI algorithms and services</li>
                <li>Send relevant career opportunities and updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Protection</h2>
              <p>We use industry-standard encryption and security measures to protect your personal information. Your data is never shared with third parties without your explicit consent.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
              <p>You have the right to access, update, or delete your personal information at any time. Contact us at privacy@careercompass.com for any data-related requests.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at privacy@careercompass.com or through our website.</p>
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

export default Privacy;
