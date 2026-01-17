import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <Header variant="back" />

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Terms of Service
        </h1>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Introduction</h2>
          <p className="text-gray-600">
            Welcome to CareerCompass. By accessing or using our website and services, you agree to comply with these Terms of Service. These terms govern your use of our platform, AI-powered career guidance tools, and any content provided through our services.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Use of Services</h2>
          <p className="text-gray-600">
            You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use the platform to submit false information, violate intellectual property rights, or engage in any activities that could harm CareerCompass or other users.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Account Registration</h2>
          <p className="text-gray-600">
            Certain features of the platform require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to provide accurate and up-to-date information when registering.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Intellectual Property</h2>
          <p className="text-gray-600">
            All content, software, AI models, and materials provided on CareerCompass are owned by or licensed to us and are protected by applicable intellectual property laws. You may not copy, reproduce, or distribute our materials without explicit permission.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Limitations of Liability</h2>
          <p className="text-gray-600">
            CareerCompass provides career guidance tools and AI recommendations for educational purposes. While we strive for accuracy, we do not guarantee specific outcomes or career results. Users acknowledge that the platform is a guidance tool and that CareerCompass is not responsible for decisions made based on our recommendations.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Termination</h2>
          <p className="text-gray-600">
            We may suspend or terminate your access to the platform at any time if you violate these Terms of Service or engage in conduct that we consider harmful or unlawful. Termination does not limit our right to take any other legal actions.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Updates to Terms</h2>
          <p className="text-gray-600">
            We may update these Terms of Service from time to time. Any changes will be posted on this page with the updated effective date. Continued use of our services constitutes acceptance of the revised terms.
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
              <span>Karachi, Pakistan</span>
            </li>
          </ul>

          <p className="text-gray-600">
            Effective Date: January 1, 2026
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Terms;
