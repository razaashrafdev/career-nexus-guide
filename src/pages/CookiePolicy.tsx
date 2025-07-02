
import { Button } from "@/components/ui/button";
import { ArrowLeft, Cookie, Settings, Shield, BarChart } from "lucide-react";
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
            <Cookie className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          <p className="text-gray-600 text-lg">
            Last updated: January 2, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">What Are Cookies?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                Cookies help us enhance your experience by remembering your preferences, analyzing how you use our platform, and providing personalized recommendations.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Types of Cookies We Use</h2>
            <div className="space-y-6">
              <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Essential Cookies</h3>
                    <p className="text-green-700 mb-3">These cookies are necessary for the website to function properly and cannot be disabled.</p>
                    <ul className="text-green-600 text-sm space-y-1">
                      <li>• Authentication and login status</li>
                      <li>• Security and fraud prevention</li>
                      <li>• Shopping cart functionality</li>
                      <li>• Form submission data</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-blue-200 rounded-lg p-6 bg-blue-50">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Functional Cookies</h3>
                    <p className="text-blue-700 mb-3">These cookies enable enhanced functionality and personalization.</p>
                    <ul className="text-blue-600 text-sm space-y-1">
                      <li>• Language and region preferences</li>
                      <li>• Theme and display settings</li>
                      <li>• Personalized content recommendations</li>
                      <li>• Assessment progress tracking</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-purple-200 rounded-lg p-6 bg-purple-50">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Analytics Cookies</h3>
                    <p className="text-purple-700 mb-3">These cookies help us understand how visitors interact with our website.</p>
                    <ul className="text-purple-600 text-sm space-y-1">
                      <li>• Page views and user journeys</li>
                      <li>• Feature usage statistics</li>
                      <li>• Performance monitoring</li>
                      <li>• Error tracking and debugging</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-orange-200 rounded-lg p-6 bg-orange-50">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Cookie className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-orange-800 mb-2">Marketing Cookies</h3>
                    <p className="text-orange-700 mb-3">These cookies are used to deliver relevant advertisements and track campaign effectiveness.</p>
                    <ul className="text-orange-600 text-sm space-y-1">
                      <li>• Targeted advertising</li>
                      <li>• Social media integration</li>
                      <li>• Campaign performance tracking</li>
                      <li>• Cross-platform user recognition</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Third-Party Cookies</h2>
            <p className="text-gray-600 mb-4">
              We may also use third-party services that set their own cookies. These include:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Google Analytics</h4>
                <p className="text-gray-600 text-sm mb-2">For website analytics and user behavior tracking</p>
                <a href="https://policies.google.com/privacy" className="text-purple-600 text-sm hover:underline" target="_blank" rel="noopener noreferrer">
                  Google Privacy Policy →
                </a>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Social Media Platforms</h4>
                <p className="text-gray-600 text-sm mb-2">For social login and content sharing features</p>
                <p className="text-gray-500 text-xs">Facebook, LinkedIn, Twitter</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Customer Support</h4>
                <p className="text-gray-600 text-sm mb-2">For live chat and help desk functionality</p>
                <p className="text-gray-500 text-xs">Intercom, Zendesk</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Email Marketing</h4>
                <p className="text-gray-600 text-sm mb-2">For newsletter and promotional email tracking</p>
                <p className="text-gray-500 text-xs">Mailchimp, SendGrid</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">How to Control Cookies</h2>
            <p className="text-gray-600 mb-6">
              You have several options for managing cookies:
            </p>
            
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Browser Settings</h4>
                <p className="text-green-700 text-sm mb-3">Most browsers allow you to control cookies through their settings:</p>
                <ul className="text-green-600 text-sm space-y-1">
                  <li>• Block all cookies</li>
                  <li>• Delete existing cookies</li>
                  <li>• Allow cookies from specific sites only</li>
                  <li>• Get notified when cookies are set</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Cookie Preference Center</h4>
                <p className="text-blue-700 text-sm mb-3">We provide a cookie preference center where you can:</p>
                <ul className="text-blue-600 text-sm space-y-1">
                  <li>• Choose which types of cookies to accept</li>
                  <li>• Update your preferences at any time</li>
                  <li>• Learn more about each cookie type</li>
                  <li>• Withdraw consent for non-essential cookies</li>
                </ul>
                <Button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2">
                  Manage Cookie Preferences
                </Button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Browser-Specific Instructions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm">Google Chrome</h5>
                  <p className="text-gray-600 text-xs">Settings → Privacy and Security → Cookies</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm">Mozilla Firefox</h5>
                  <p className="text-gray-600 text-xs">Preferences → Privacy & Security</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm">Safari</h5>
                  <p className="text-gray-600 text-xs">Preferences → Privacy → Cookies</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm">Microsoft Edge</h5>
                  <p className="text-gray-600 text-xs">Settings → Cookies and Permissions</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Impact of Disabling Cookies</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Please Note</h4>
              <p className="text-yellow-700 text-sm mb-3">
                Disabling certain cookies may impact your experience on our platform:
              </p>
              <ul className="text-yellow-600 text-sm space-y-1">
                <li>• You may need to log in repeatedly</li>
                <li>• Personalized recommendations may not work properly</li>
                <li>• Some features may become unavailable</li>
                <li>• Assessment progress may not be saved</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Changes to This Policy</h2>
            <p className="text-gray-600 mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-gray-700"><strong>Email:</strong> privacy@careercompass.com</p>
              <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 012-3456</p>
              <p className="text-gray-700"><strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
