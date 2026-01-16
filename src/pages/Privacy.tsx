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
      <Footer />
    </div>
  );
};

export default Privacy;
