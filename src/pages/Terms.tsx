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
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By accessing or using CareerCompass, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use our services.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Description of Service</h2>
          <p className="text-gray-600">
            CareerCompass provides AI-powered career guidance, personality assessments, resume analysis, and related services to help students and professionals discover their ideal career paths.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. User Accounts</h2>
          <p className="text-gray-600">
            To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. User Content</h2>
          <p className="text-gray-600">
            You may be able to submit content to CareerCompass, such as resume information and assessment responses. You retain ownership of your content, but you grant us a license to use, modify, and display your content in connection with providing our services.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Acceptable Use</h2>
          <p className="text-gray-600">
            You agree not to use CareerCompass for any unlawful or prohibited purpose. You may not attempt to gain unauthorized access to our systems or interfere with the operation of our services.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Intellectual Property</h2>
          <p className="text-gray-600">
            CareerCompass and its content are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, modify, or distribute our content without our permission.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Disclaimer of Warranties</h2>
          <p className="text-gray-600">
            CareerCompass is provided "as is" without any warranties, express or implied. We do not guarantee the accuracy, completeness, or reliability of our services.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Limitation of Liability</h2>
          <p className="text-gray-600">
            In no event shall CareerCompass be liable for any damages arising out of your use of our services.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">9. Changes to Terms</h2>
          <p className="text-gray-600">
            We may modify these Terms at any time. Your continued use of CareerCompass after any changes constitutes your acceptance of the new Terms.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">10. Governing Law</h2>
          <p className="text-gray-600">
            These Terms shall be governed by the laws of the State of California.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Terms;
