import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AnimatedElement } from "@/components/AnimatedElement";
import { Badge } from "@/components/ui/badge";
import { getWhatsAppLink } from "@/config/api";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <Header variant="back" />

      {/* Hero Section */}
      <section className="py-20 relative bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
        <div className="relative container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <AnimatedElement delay={0}>
              <Badge className="mb-6 bg-white/20 hover:bg-white/20 text-white-700">
                Legal Information
              </Badge>
            </AnimatedElement>
            <AnimatedElement delay={80}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
                Terms of Service
              </h1>
            </AnimatedElement>
            <AnimatedElement delay={160}>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Please read these terms carefully before using our platform and services.
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg space-y-6">
            <AnimatedElement delay={0}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Introduction</h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <p className="text-gray-600">
                Welcome to Career Nexus. By accessing or using our website and services, you agree to comply with these Terms of Service. These terms govern your use of our platform, AI-powered career guidance tools, and any content provided through our services.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={0}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Use of Services</h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <p className="text-gray-600">
                You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use the platform to submit false information, violate intellectual property rights, or engage in any activities that could harm Career Nexus or other users.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={0}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Account Registration</h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <p className="text-gray-600">
                Certain features of the platform require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to provide accurate and up-to-date information when registering.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={0}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Intellectual Property</h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <p className="text-gray-600">
                All content, software, AI models, and materials provided on Career Nexus are owned by or licensed to us and are protected by applicable intellectual property laws. You may not copy, reproduce, or distribute our materials without explicit permission.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={0}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Limitations of Liability</h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <p className="text-gray-600">
                Career Nexus provides career guidance tools and AI recommendations for educational purposes. While we strive for accuracy, we do not guarantee specific outcomes or career results. Users acknowledge that the platform is a guidance tool and that Career Nexus is not responsible for decisions made based on our recommendations.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={0}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Termination</h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <p className="text-gray-600">
                We may suspend or terminate your access to the platform at any time if you violate these Terms of Service or engage in conduct that we consider harmful or unlawful. Termination does not limit our right to take any other legal actions.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={0}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Updates to Terms</h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <p className="text-gray-600">
                We may update these Terms of Service from time to time. Any changes will be posted on this page with the updated effective date. Continued use of our services constitutes acceptance of the revised terms.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={0}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Contact Us
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <p className="text-gray-600">
                If you have any questions or concerns about Terms and Services,
                please contact us at:
              </p>
            </AnimatedElement>
            <AnimatedElement delay={200}>
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
                    href={getWhatsAppLink()}
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
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <p className="text-gray-600">
                Effective Date: January 1, 2026
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Terms;
