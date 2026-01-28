import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AnimatedElement } from "@/components/AnimatedElement";
import { getWhatsAppLink } from "@/config/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    inquiry: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      // Reset form after showing toast
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        inquiry: "",
        message: ""
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
                Get in Touch
              </Badge>
            </AnimatedElement>
            <AnimatedElement delay={80}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
                We're Here to Help You
              </h1>
            </AnimatedElement>
            <AnimatedElement delay={160}>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Have questions about your career journey? Reach out to us and let's work together to unlock your potential.
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <AnimatedElement delay={0}>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 leading-tight">
                  Contact Information
                </h2>
              </AnimatedElement>
              <AnimatedElement delay={100}>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Get in touch with our team. We're here to answer your questions and help you on your career journey.
                </p>
              </AnimatedElement>

              <div className="space-y-6 mb-8">
                <AnimatedElement delay={0}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-lg">Email</h3>
                      <p className="text-gray-600 mb-2">We'll respond within 24 hours</p>
                      <a
                        href="mailto:careernexus.team@gmail.com"
                        className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                      >
                        careernexus.team@gmail.com
                      </a>
                    </div>
                  </div>
                </AnimatedElement>

                <AnimatedElement delay={100}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-lg">Phone</h3>
                      <p className="text-gray-600 mb-2">Monday - Friday, 9 AM - 6 PM EST</p>
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                      >
                        +92 300 8974168
                      </a>
                    </div>
                  </div>
                </AnimatedElement>

                <AnimatedElement delay={200}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-lg">Office Location</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Karachi, Pakistan
                      </p>
                    </div>
                  </div>
                </AnimatedElement>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <AnimatedElement delay={0}>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-white" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Send us a message
                      </h2>
                    </div>
                  </AnimatedElement>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <AnimatedElement delay={0}>
                          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-2 block">
                            First Name *
                          </Label>
                        </AnimatedElement>
                        <AnimatedElement delay={50}>
                          <Input
                            id="firstName"
                            required
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                            placeholder="John"
                          />
                        </AnimatedElement>
                      </div>
                      <div>
                        <AnimatedElement delay={100}>
                          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-2 block">
                            Last Name *
                          </Label>
                        </AnimatedElement>
                        <AnimatedElement delay={150}>
                          <Input
                            id="lastName"
                            required
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                            placeholder="Doe"
                          />
                        </AnimatedElement>
                      </div>
                    </div>

                    <div>
                      <AnimatedElement delay={200}>
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                          Email Address *
                        </Label>
                      </AnimatedElement>
                      <AnimatedElement delay={250}>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                          placeholder="john@example.com"
                        />
                      </AnimatedElement>
                    </div>

                    <div>
                      <AnimatedElement delay={300}>
                        <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 block">
                          Message *
                        </Label>
                      </AnimatedElement>
                      <AnimatedElement delay={350}>
                        <Textarea
                          id="message"
                          required
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          rows={5}
                          className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                          placeholder="Please describe how we can help you..."
                        />
                      </AnimatedElement>
                    </div>

                    <div className="pt-4">
                      <AnimatedElement delay={400}>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg transition-all text-white px-8 py-3 h-11"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </AnimatedElement>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-r from-gray-900 to-purple-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-6xl mx-auto">
            <AnimatedElement delay={0}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Find answers to common questions about our services and platform.
                </p>
              </div>
            </AnimatedElement>
            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedElement delay={0}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="font-semibold text-lg mb-3 text-white">How accurate are the assessments?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our assessments use scientifically validated models with 85-90% accuracy in career recommendations.
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={100}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="font-semibold text-lg mb-3 text-white">Is my data secure?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Yes, we use enterprise-grade encryption and strict privacy protocols to protect your information.
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={200}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="font-semibold text-lg mb-3 text-white">Can I retake assessments?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Absolutely! You can retake assessments anytime from your dashboard for updated results.
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={300}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="font-semibold text-lg mb-3 text-white">Do you offer personal counseling?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Yes, we offer one-on-one sessions with certified career counselors. Contact us to schedule.
                  </p>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;