
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CookiePolicy = () => {
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
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Cookie Policy</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Are Cookies</h2>
              <p>Cookies are small text files stored on your device when you visit our website. They help us provide a better user experience and analyze website usage.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Types of Cookies We Use</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Marketing Cookies:</strong> Show you relevant advertisements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Managing Cookies</h2>
              <p>You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality and your user experience.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Cookies</h2>
              <p>We may use third-party services like Google Analytics that set their own cookies. These services have their own privacy policies.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Updates</h2>
              <p>This Cookie Policy may be updated periodically. We encourage you to review it regularly for any changes.</p>
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

export default CookiePolicy;
