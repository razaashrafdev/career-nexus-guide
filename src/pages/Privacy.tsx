import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <Header variant="back" />

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
            At CareerNexus, your privacy is our top priority. We are committed to protecting your personal information and ensuring that your data is handled responsibly. When you use our website and services, we may collect information such as your name, email, academic details from assessments, or resume uploads. We also track how you interact with the platform to improve the quality and effectiveness of our career guidance services.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Information We Collect
          </h2>
          <p className="text-gray-600">
            The information we collect is used to provide personalized AI-powered career recommendations that align with your skills, personality, and aspirations. It also helps us enhance platform features and communicate important updates to you.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Data Security
          </h2>
          <p className="text-gray-600">
            All data is securely stored following industry-standard practices, and access is restricted to authorized personnel only. We take data protection seriously to ensure your information remains safe.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Sharing Information
          </h2>
          <p className="text-gray-600">
            We do not sell or share your personal information with third parties for marketing purposes. Any data shared with trusted partners is strictly used to deliver our services effectively and efficiently.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Your Rights
          </h2>
          <p className="text-gray-600">
          You have control over your personal information and can request access, correction, or deletion at any time. You may also opt out of communications from us whenever you wish.
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
                href="mailto:careernexus.team@gmail.com"
                className="hover:text-purple-400 transition-colors break-all"
              >
                careernexus.team@gmail.com
              </a>
            </li>
            <li className="flex items-center">
              <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
              <a
                href="https://wa.me/923008974168"
                className="hover:text-purple-400 transition-colors"
              >
                +92 300 8974168
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

export default Privacy;
