
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, Ear, Hand, Brain, Keyboard, Mouse, Smartphone, Monitor } from "lucide-react";
import { Link } from "react-router-dom";

const Accessibility = () => {
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
            <Eye className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Accessibility Statement
          </h1>
          <p className="text-gray-600 text-lg">
            Our commitment to inclusive career guidance for everyone
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Commitment</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At CareerCompass, we believe that everyone deserves equal access to career guidance and professional development opportunities. We are committed to ensuring our platform is accessible to people with disabilities and complies with accessibility standards.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                We strive to meet or exceed the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards to ensure our platform is usable by everyone.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Accessibility Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Visual Accessibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>• High contrast color schemes</li>
                    <li>• Scalable text up to 200% zoom</li>
                    <li>• Alternative text for all images</li>
                    <li>• Clear visual hierarchy and layout</li>
                    <li>• Screen reader compatible</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                    <Keyboard className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Keyboard Navigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>• Full keyboard navigation support</li>
                    <li>• Logical tab order throughout</li>
                    <li>• Skip links for main content</li>
                    <li>• Visible focus indicators</li>
                    <li>• Custom keyboard shortcuts</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <Ear className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Audio & Hearing</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>• Captions for all video content</li>
                    <li>• Audio descriptions available</li>
                    <li>• Visual alerts and notifications</li>
                    <li>• No auto-playing audio</li>
                    <li>• Adjustable audio controls</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Cognitive Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>• Clear, simple language</li>
                    <li>• Consistent navigation patterns</li>
                    <li>• Generous time limits</li>
                    <li>• Progress indicators</li>
                    <li>• Error prevention and recovery</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Assistive Technology Support</h2>
            <p className="text-gray-600 mb-6">
              Our platform is designed to work seamlessly with various assistive technologies:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                <Monitor className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-purple-800 text-sm">Screen Readers</h4>
                <p className="text-purple-600 text-xs mt-1">JAWS, NVDA, VoiceOver</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <Keyboard className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-800 text-sm">Alternative Input</h4>
                <p className="text-blue-600 text-xs mt-1">Switch devices, voice control</p>
              </div>
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center">
                <Eye className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                <h4 className="font-semibold text-indigo-800 text-sm">Magnification</h4>
                <p className="text-indigo-600 text-xs mt-1">ZoomText, Windows Magnifier</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <Smartphone className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-green-800 text-sm">Mobile Support</h4>
                <p className="text-green-600 text-xs mt-1">iOS/Android accessibility</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Accessibility Standards Compliance</h2>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">WCAG 2.1 Level AA</h4>
                <p className="text-green-700 text-sm">We follow the Web Content Accessibility Guidelines 2.1 at Level AA compliance, ensuring our platform meets international accessibility standards.</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Section 508</h4>
                <p className="text-blue-700 text-sm">Our platform complies with Section 508 of the Rehabilitation Act, making it accessible for federal agencies and organizations.</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">ADA Compliance</h4>
                <p className="text-purple-700 text-sm">We align with the Americans with Disabilities Act (ADA) requirements to ensure equal access to our services.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Keyboard Shortcuts</h2>
            <p className="text-gray-600 mb-4">Use these keyboard shortcuts to navigate our platform more efficiently:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">General Navigation</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Skip to main content</span>
                    <code className="bg-gray-200 px-2 py-1 rounded text-xs">Alt + M</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Open main menu</span>
                    <code className="bg-gray-200 px-2 py-1 rounded text-xs">Alt + N</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Search</span>
                    <code className="bg-gray-200 px-2 py-1 rounded text-xs">Alt + S</code>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Assessment Tools</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next question</span>
                    <code className="bg-gray-200 px-2 py-1 rounded text-xs">Ctrl + →</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Previous question</span>
                    <code className="bg-gray-200 px-2 py-1 rounded text-xs">Ctrl + ←</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Submit answer</span>
                    <code className="bg-gray-200 px-2 py-1 rounded text-xs">Enter</code>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Testing & Monitoring</h2>
            <p className="text-gray-600 mb-4">
              We continuously test and monitor our platform's accessibility through:
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-600 text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Automated Testing</h4>
                  <p className="text-gray-600 text-sm">Regular automated accessibility scans using industry-standard tools</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Manual Testing</h4>
                  <p className="text-gray-600 text-sm">Human testing with assistive technologies and keyboard-only navigation</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-indigo-600 text-xs font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">User Feedback</h4>
                  <p className="text-gray-600 text-sm">Continuous feedback collection from users with disabilities</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Known Issues & Improvements</h2>
            <p className="text-gray-600 mb-4">
              We are actively working on the following accessibility improvements:
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <ul className="text-yellow-800 text-sm space-y-2">
                <li>• Enhanced mobile screen reader support for complex assessments</li>
                <li>• Additional keyboard shortcuts for advanced features</li>
                <li>• Improved color contrast in data visualization components</li>
                <li>• Voice navigation support for career exploration tools</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Feedback & Support</h2>
            <p className="text-gray-600 mb-4">
              We welcome your feedback on accessibility. If you encounter any barriers or have suggestions for improvement, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Accessibility Team</h4>
                <p className="text-gray-700 text-sm"><strong>Email:</strong> accessibility@careercompass.com</p>
                <p className="text-gray-700 text-sm"><strong>Phone:</strong> +1 (555) 012-3456</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Response Time</h4>
                <p className="text-gray-600 text-sm">We aim to respond to accessibility inquiries within 48 hours and address critical issues within 5 business days.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Third-Party Content</h2>
            <p className="text-gray-600 mb-4">
              While we strive to ensure all content on our platform is accessible, some third-party content may not meet our accessibility standards. We work with our partners to improve accessibility across all integrated services.
            </p>
          </section>

          <section className="border-t pt-6">
            <p className="text-sm text-gray-500">
              This accessibility statement was last updated on January 2, 2025. We review and update this statement regularly to reflect our ongoing accessibility improvements.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;
