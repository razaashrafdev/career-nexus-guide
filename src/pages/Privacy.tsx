import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AnimatedElement } from "@/components/AnimatedElement";
import { Badge } from "@/components/ui/badge";
import { getWhatsAppLink } from "@/config/api";

const Privacy = () => {
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
                Privacy Policy
              </h1>
            </AnimatedElement>
            <AnimatedElement delay={160}>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Your privacy is our top priority. Learn how we protect and handle your personal information.
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
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Introduction
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <p className="text-gray-600">
                At Career Nexus, your privacy is our top priority. We are committed to protecting your personal information and ensuring that your data is handled responsibly. When you use our website and services, we may collect information such as your name, email, academic details from assessments, or resume uploads. We also track how you interact with the platform to improve the quality and effectiveness of our career guidance services.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={0}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Information We Collect
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <p className="text-gray-600">
                The information we collect is used to provide personalized AI-powered career recommendations that align with your skills, personality, and aspirations. It also helps us enhance platform features and communicate important updates to you.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={0}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Data Security
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <p className="text-gray-600">
                All data is securely stored following industry-standard practices, and access is restricted to authorized personnel only. We take data protection seriously to ensure your information remains safe.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={0}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Sharing Information
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <p className="text-gray-600">
                We do not sell or share your personal information with third parties for marketing purposes. Any data shared with trusted partners is strictly used to deliver our services effectively and efficiently.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={0}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Your Rights
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <p className="text-gray-600">
              You have control over your personal information and can request access, correction, or deletion at any time. You may also opt out of communications from us whenever you wish.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={0}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Changes to This Privacy Policy
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will notify
                you of any significant changes by posting the new policy on our
                website and updating the effective date.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={0}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Contact Us
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <p className="text-gray-600">
                If you have any questions or concerns about this Privacy Policy,
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

export default Privacy;
