
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              CareerCompass
            </Link>
            <nav className="flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">
                About
              </Link>
              <Link to="/login" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
                Sign In
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Have questions about your career journey? Need help with our platform? We're here to support you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">Send us your questions anytime</p>
                <a href="mailto:support@careercompass.com" className="text-purple-600 hover:text-purple-700 font-medium">
                  support@careercompass.com
                </a>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Speak with our career advisors</p>
                <a href="tel:+1-555-0123" className="text-purple-600 hover:text-purple-700 font-medium">
                  +1 (555) 012-3456
                </a>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Get instant help from our team</p>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg transition-all">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Form */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Send us a Message
                  </h2>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                          First Name
                        </Label>
                        <Input 
                          id="firstName" 
                          placeholder="Enter your first name" 
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                          Last Name
                        </Label>
                        <Input 
                          id="lastName" 
                          placeholder="Enter your last name" 
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address
                      </Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                        Subject
                      </Label>
                      <Input 
                        id="subject" 
                        placeholder="What is this regarding?" 
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                        Message
                      </Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us how we can help you..." 
                        rows={6}
                        className="mt-1"
                      />
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg transition-all">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">We're Here to Help</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Whether you have questions about our personality assessments, need guidance on your career path, 
                    or require technical support, our team of career experts is ready to assist you.
                  </p>
                </div>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Support Hours</h4>
                      <div className="space-y-1 text-gray-600">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                        <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Our Office</h4>
                      <div className="text-gray-600">
                        <p>123 Career Boulevard</p>
                        <p>Innovation District</p>
                        <p>San Francisco, CA 94105</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6">
                  <h4 className="font-semibold text-lg mb-2">Quick Response Guarantee</h4>
                  <p className="text-gray-700">
                    We typically respond to all inquiries within 24 hours during business days. 
                    For urgent matters, please call us directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="text-left p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <h3 className="font-semibold text-lg mb-3">How accurate are the personality assessments?</h3>
                <p className="text-gray-600">
                  Our assessments are based on scientifically validated models and have been tested with thousands of users. 
                  Results typically show 85-90% accuracy in career recommendations.
                </p>
              </Card>
              
              <Card className="text-left p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <h3 className="font-semibold text-lg mb-3">Is my personal data secure?</h3>
                <p className="text-gray-600">
                  Yes, we use enterprise-grade encryption and follow strict privacy protocols. 
                  Your data is never shared with third parties without your explicit consent.
                </p>
              </Card>
              
              <Card className="text-left p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <h3 className="font-semibold text-lg mb-3">Can I retake the assessment?</h3>
                <p className="text-gray-600">
                  Absolutely! You can retake assessments anytime from your dashboard. 
                  We recommend waiting at least 6 months between assessments for the most accurate results.
                </p>
              </Card>
              
              <Card className="text-left p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <h3 className="font-semibold text-lg mb-3">Do you offer career counseling sessions?</h3>
                <p className="text-gray-600">
                  Yes! In addition to our AI-powered recommendations, we offer one-on-one sessions with certified career counselors. 
                  Contact us to schedule a consultation.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 block">
                CareerCompass
              </Link>
              <p className="text-gray-400">
                Guiding students to their ideal careers through AI-powered insights and personalized recommendations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Personality Assessment</li>
                <li>Resume Analysis</li>
                <li>Career Matching</li>
                <li>Skills Development</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@careercompass.com</li>
                <li>+1 (555) 012-3456</li>
                <li>San Francisco, CA</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CareerCompass. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
