
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Users, Target, Heart, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Award, BookOpen, TrendingUp, Star, Shield, Globe, Zap, Brain, Rocket, Upload, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const About = () => {
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl">
            <p className="text-purple-300 text-sm font-medium mb-4">About CareerCompass</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discovering Your Perfect Career Path Through AI Innovation
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              Empowering students worldwide to unlock their true potential and find careers that align with their personality, skills, and aspirations using cutting-edge artificial intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                We are helping students achieve their dreams through cutting-edge AI technology
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At CareerCompass, we are passionate about technology and innovation. We believe every student deserves a career that brings fulfillment and success. With a vision to deliver innovative, high-quality digital solutions, we have grown into a leading software development company specializing in career guidance, personality assessment, and AI-powered job matching.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
                  <div className="text-sm text-gray-600">Students Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">94%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">200+</div>
                  <div className="text-sm text-gray-600">Career Paths</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">AI Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="bg-gradient-to-r from-gray-900 to-purple-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <Brain className="h-16 w-16 text-purple-300 mb-6" />
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-purple-200">AI-Powered Assessment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-200">Resume Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-green-200">Career Matching</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-yellow-200">Personalized Guidance</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-purple-300 text-sm font-medium mb-4">5+ Years of Innovation</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our journey of growth and innovation
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Since our inception, CareerCompass has been on a journey of growth and innovation. With over 5 years of experience in the tech industry, we have successfully delivered comprehensive career guidance solutions, including personality tests, resume analysis, and AI-powered job matching. Our ability to adapt to the evolving needs of our clients and the industry has been key to our success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
                Why choose CareerCompass for your career journey?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Expertise</h3>
                    <p className="text-gray-600">Our team has extensive experience and expertise in career guidance, psychology, and AI technology.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
                    <p className="text-gray-600">We leverage the latest technologies to create innovative solutions that give our students a competitive edge.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Student-Centric Approach</h3>
                    <p className="text-gray-600">We prioritize our students' needs and work closely with them to deliver solutions that drive success.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Proven Track Record</h3>
                    <p className="text-gray-600">Our portfolio of successful projects and satisfied clients speaks to our commitment to excellence.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">End-to-End Solutions</h3>
                    <p className="text-gray-600">From assessment to execution, we provide comprehensive solutions tailored to our students' unique requirements.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/personality-test">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 text-lg">
                    START YOUR JOURNEY
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 text-center">
                  <Brain className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <div className="text-sm font-medium text-gray-900">AI Assessment</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center">
                  <Upload className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-sm font-medium text-gray-900">Resume Analysis</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center">
                  <Target className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <div className="text-sm font-medium text-gray-900">Career Matching</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                  <div className="text-sm font-medium text-gray-900">Progress Tracking</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gradient-to-r from-gray-900 to-purple-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl text-purple-300 mb-6">"</div>
            <blockquote className="text-2xl md:text-3xl font-light mb-8 leading-relaxed">
              CareerCompass developed our stunning career guidance platform that boosted our student success rate by 94% within the first three months. Their AI-powered assessment and personalized recommendations have significantly increased our students' career satisfaction.
            </blockquote>
            <div className="text-purple-300 text-sm font-medium">
              JANE ANDERSON<br />
              CAREER COUNSELOR
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Trusted technologies for exceptional performance
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            We leverage cutting-edge technologies to deliver reliable, scalable, and innovative career guidance solutions.
          </p>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-8 items-center opacity-60">
            <div className="flex justify-center">
              <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-semibold text-sm">React</div>
            </div>
            <div className="flex justify-center">
              <div className="bg-green-100 text-green-600 px-4 py-2 rounded-lg font-semibold text-sm">Node.js</div>
            </div>
            <div className="flex justify-center">
              <div className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg font-semibold text-sm">AI/ML</div>
            </div>
            <div className="flex justify-center">
              <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg font-semibold text-sm">AWS</div>
            </div>
            <div className="flex justify-center">
              <div className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-lg font-semibold text-sm">PostgreSQL</div>
            </div>
            <div className="flex justify-center">
              <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-semibold text-sm">Python</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Ready to take your career to the next level?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have discovered their perfect career path with CareerCompass.
          </p>
          <Link to="/personality-test">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 text-lg rounded-full hover:shadow-lg transition-all duration-300">
              LET'S WORK TOGETHER →
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
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

export default About;
