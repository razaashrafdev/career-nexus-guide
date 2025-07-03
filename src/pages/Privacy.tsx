import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
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
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Introduction
          </h2>
          <p className="text-gray-600">
            Your privacy is important to us. This Privacy Policy explains how
            CareerCompass ("we," "us," or "our") collects, uses, and protects
            your personal information when you use our website and services.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Information We Collect
          </h2>
          <p className="text-gray-600">
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email address,
              contact information, and demographic data.
            </li>
            <li>
              <strong>Assessment Data:</strong> Responses and results from
              personality and skills assessments.
            </li>
            <li>
              <strong>Resume Information:</strong> Data extracted from uploaded
              resumes, including skills, experience, and education.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our
              website and services, including pages visited, features used, and
              time spent on the site.
            </li>
            <li>
              <strong>Device Information:</strong> IP address, browser type,
              operating system, and device identifiers.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            How We Use Your Information
          </h2>
          <p className="text-gray-600">
            We use your information for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              To provide and personalize our services, including career
              recommendations and skill gap analysis.
            </li>
            <li>
              To analyze and improve our website and services.
            </li>
            <li>
              To communicate with you about updates, promotions, and other
              relevant information.
            </li>
            <li>
              To respond to your inquiries and provide customer support.
            </li>
            <li>
              To ensure the security and integrity of our website and services.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Data Sharing and Disclosure
          </h2>
          <p className="text-gray-600">
            We may share your information with:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              <strong>Service Providers:</strong> Third-party vendors who assist
              us in providing our services, such as hosting, analytics, and
              customer support.
            </li>
            <li>
              <strong>Business Partners:</strong> Universities and companies
              that partner with us to offer career opportunities and resources.
            </li>
            <li>
              <strong>Legal Authorities:</strong> When required by law or to
              protect our rights and interests.
            </li>
          </ul>
          <p className="text-gray-600">
            We will not sell your personal information to third parties.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Data Security
          </h2>
          <p className="text-gray-600">
            We implement industry-standard security measures to protect your
            personal information from unauthorized access, use, or disclosure.
            These measures include encryption, firewalls, and regular security
            assessments.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Your Rights
          </h2>
          <p className="text-gray-600">
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              <strong>Access:</strong> You can request access to the personal
              information we hold about you.
            </li>
            <li>
              <strong>Correction:</strong> You can request that we correct any
              inaccurate or incomplete information.
            </li>
            <li>
              <strong>Deletion:</strong> You can request that we delete your
              personal information, subject to certain exceptions.
            </li>
            <li>
              <strong>Opt-Out:</strong> You can opt-out of receiving
              promotional communications from us.
            </li>
          </ul>
          <p className="text-gray-600">
            To exercise these rights, please contact us at
            support@careercompass.com.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Changes to This Privacy Policy
          </h2>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. We will notify
            you of any significant changes by posting the new policy on our
            website and updating the effective date.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Contact Us
          </h2>
          <p className="text-gray-600">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li className="flex items-center">
              <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
              <a
                href="mailto:support@careercompass.com"
                className="hover:text-purple-400 transition-colors break-all"
              >
                support@careercompass.com
              </a>
            </li>
            <li className="flex items-center">
              <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
              <a
                href="tel:+1-555-0123"
                className="hover:text-purple-400 transition-colors"
              >
                +1 (555) 012-3456
              </a>
            </li>
            <li className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>San Francisco, CA</span>
            </li>
          </ul>

          <p className="text-gray-600">
            Effective Date: January 1, 2025
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                CareerCompass
              </div>
              <p className="text-gray-400 mb-6">
                Empowering students worldwide to discover their ideal career paths through AI-powered insights and personalized guidance.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/personality-test" className="hover:text-purple-400 transition-colors">Personality Test</Link></li>
                <li><Link to="/resume-upload" className="hover:text-purple-400 transition-colors">Resume Analysis</Link></li>
                <li><Link to="/dashboard" className="hover:text-purple-400 transition-colors">Career Dashboard</Link></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">AI Counselor</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Job Matching</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                  <a href="mailto:support@careercompass.com" className="hover:text-purple-400 transition-colors break-all">
                    support@careercompass.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                  <a href="tel:+1-555-0123" className="hover:text-purple-400 transition-colors">
                    +1 (555) 012-3456
                  </a>
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>San Francisco, CA</span>
                </li>
              </ul>
              <div className="mt-6">
                <h5 className="text-sm font-semibold mb-2 text-white">Newsletter</h5>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="bg-gray-800 text-white px-3 py-2 rounded-md flex-1 border border-gray-700 focus:outline-none focus:border-purple-500 text-sm" 
                  />
                  <Button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm whitespace-nowrap">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm text-center md:text-left">
                © 2025 CareerCompass. All rights reserved.
              </div>
              <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 text-sm text-gray-400">
                <Link to="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link>
                <Link to="/cookie-policy" className="hover:text-purple-400 transition-colors">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;
