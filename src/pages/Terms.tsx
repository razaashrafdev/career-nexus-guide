import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AnimatedElement } from "@/components/AnimatedElement";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <Header variant="back" />

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <AnimatedElement delay={0}>
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Terms of Service
          </h1>
        </AnimatedElement>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg space-y-6">
          <AnimatedElement delay={0}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Introduction</h2>
          </AnimatedElement>
          <AnimatedElement delay={80}>
            <p className="text-gray-600">
              Welcome to CareerNexus. By accessing or using our website and services, you agree to comply with these Terms of Service. These terms govern your use of our platform, AI-powered career guidance tools, and any content provided through our services.
            </p>
          </AnimatedElement>

          <AnimatedElement delay={100}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Use of Services</h2>
          </AnimatedElement>
          <AnimatedElement delay={180}>
            <p className="text-gray-600">
              You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use the platform to submit false information, violate intellectual property rights, or engage in any activities that could harm CareerNexus or other users.
            </p>
          </AnimatedElement>

          <AnimatedElement delay={200}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Account Registration</h2>
          </AnimatedElement>
          <AnimatedElement delay={280}>
            <p className="text-gray-600">
              Certain features of the platform require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to provide accurate and up-to-date information when registering.
            </p>
          </AnimatedElement>

          <AnimatedElement delay={300}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Intellectual Property</h2>
          </AnimatedElement>
          <AnimatedElement delay={380}>
            <p className="text-gray-600">
              All content, software, AI models, and materials provided on CareerNexus are owned by or licensed to us and are protected by applicable intellectual property laws. You may not copy, reproduce, or distribute our materials without explicit permission.
            </p>
          </AnimatedElement>

          <AnimatedElement delay={400}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Limitations of Liability</h2>
          </AnimatedElement>
          <AnimatedElement delay={480}>
            <p className="text-gray-600">
              CareerNexus provides career guidance tools and AI recommendations for educational purposes. While we strive for accuracy, we do not guarantee specific outcomes or career results. Users acknowledge that the platform is a guidance tool and that CareerNexus is not responsible for decisions made based on our recommendations.
            </p>
          </AnimatedElement>

          <AnimatedElement delay={500}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Termination</h2>
          </AnimatedElement>
          <AnimatedElement delay={580}>
            <p className="text-gray-600">
              We may suspend or terminate your access to the platform at any time if you violate these Terms of Service or engage in conduct that we consider harmful or unlawful. Termination does not limit our right to take any other legal actions.
            </p>
          </AnimatedElement>

          <AnimatedElement delay={600}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Updates to Terms</h2>
          </AnimatedElement>
          <AnimatedElement delay={680}>
            <p className="text-gray-600">
              We may update these Terms of Service from time to time. Any changes will be posted on this page with the updated effective date. Continued use of our services constitutes acceptance of the revised terms.
            </p>
          </AnimatedElement>

          <AnimatedElement delay={700}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Contact Us
            </h2>
          </AnimatedElement>
          <AnimatedElement delay={780}>
            <p className="text-gray-600">
              If you have any questions or concerns about this Privacy Policy,
              please contact us at:
            </p>
          </AnimatedElement>
          <ul className="text-gray-600 space-y-2">
            <AnimatedElement delay={800}>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                <a
                  href="mailto:careernexus.team@gmail.com"
                  className="hover:text-purple-400 transition-colors break-all"
                >
                  careernexus.team@gmail.com
                </a>
              </li>
            </AnimatedElement>
            <AnimatedElement delay={880}>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <a
                  href="https://wa.me/923008974168"
                  className="hover:text-purple-400 transition-colors"
                >
                  +92 300 8974168
                </a>
              </li>
            </AnimatedElement>
            <AnimatedElement delay={960}>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>Karachi, Pakistan</span>
              </li>
            </AnimatedElement>
          </ul>

          <AnimatedElement delay={1000}>
            <p className="text-gray-600">
              Effective Date: January 1, 2026
            </p>
          </AnimatedElement>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Terms;
