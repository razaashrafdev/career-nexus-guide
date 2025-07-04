
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Users, Target, Heart, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Award, BookOpen, TrendingUp, Star, Shield, Globe, Zap, Brain, Rocket, Upload } from "lucide-react";
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
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            About CareerCompass
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            Empowering students worldwide to discover their ideal career paths through AI-powered insights and personalized guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <Users className="h-5 w-5 text-purple-500 mr-2" />
              <span className="font-semibold">50,000+ Students</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <Award className="h-5 w-5 text-blue-500 mr-2" />
              <span className="font-semibold">94% Success Rate</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <Globe className="h-5 w-5 text-green-500 mr-2" />
              <span className="font-semibold">Global Platform</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-12 lg:p-16">
                  <Target className="h-16 w-16 text-purple-500 mb-6" />
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Our Mission</h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    To bridge the gap between student potential and career fulfillment by providing scientifically-backed, AI-powered career guidance that's accessible, accurate, and actionable.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Evidence-based assessment methods</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Personalized career recommendations</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Continuous support and guidance</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-12 lg:p-16 text-white">
                  <div className="h-full flex flex-col justify-center">
                    <Rocket className="h-16 w-16 mb-6 opacity-80" />
                    <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                    <p className="text-lg leading-relaxed opacity-90">
                      A world where every student discovers their true potential and finds a career path that brings them fulfillment, success, and happiness.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">How CareerCompass Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our simple 4-step process helps you discover your ideal career path through scientific assessment and AI-powered analysis.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                icon: BookOpen,
                title: "Take Assessment",
                description: "Complete our comprehensive personality test based on proven psychological frameworks",
                color: "purple"
              },
              {
                step: "02", 
                icon: Upload,
                title: "Upload Resume",
                description: "Upload your resume for AI-powered skills extraction and analysis",
                color: "blue"
              },
              {
                step: "03",
                icon: Brain,
                title: "Get AI Analysis",
                description: "Receive personalized career recommendations based on your unique profile",
                color: "green"
              },
              {
                step: "04",
                icon: TrendingUp,
                title: "Start Growing",
                description: "Access ongoing support and skill development recommendations",
                color: "orange"
              }
            ].map((item, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-${item.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className={`h-8 w-8 text-${item.color}-600`} />
                    </div>
                    <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-${item.color}-500 text-white text-sm font-bold flex items-center justify-center`}>
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Why Choose CareerCompass?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the power of AI-driven career guidance with features designed to unlock your true potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Scientifically Backed",
                description: "Our assessments are based on validated psychological research and continuously updated with latest industry trends"
              },
              {
                icon: Zap,
                title: "AI-Powered Analysis",
                description: "Advanced algorithms analyze your personality traits, skills, and interests to provide accurate career matches"
              },
              {
                icon: Heart,
                title: "Personalized Approach",
                description: "Every recommendation is tailored to your unique profile, ensuring relevant and actionable career guidance"
              },
              {
                icon: Users,
                title: "Trusted by Thousands",
                description: "Over 50,000 students have found their career path with our platform, with 94% reporting improved career clarity"
              },
              {
                icon: Target,
                title: "Comprehensive Assessment",
                description: "Multi-dimensional personality evaluation covering cognitive preferences, work styles, and values"
              },
              {
                icon: TrendingUp,
                title: "Continuous Support",
                description: "Access to career guidance, skill recommendations, and industry insights throughout your journey"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white overflow-hidden">
            <CardContent className="p-12 lg:p-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  See how CareerCompass is transforming lives and shaping the future of career guidance.
                </p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { number: "50,000+", label: "Students Helped", icon: Users },
                  { number: "94%", label: "Success Rate", icon: Award },
                  { number: "200+", label: "Career Paths", icon: Target },
                  { number: "24/7", label: "AI Support", icon: Zap }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="h-8 w-8 mx-auto mb-4 opacity-80" />
                    <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="text-purple-100 text-sm lg:text-base">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-12 lg:p-16">
              <Star className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                Ready to Discover Your Perfect Career?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of students who have already found their path to success. Start your journey with CareerCompass today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/personality-test">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 text-lg hover:shadow-lg transition-all duration-300">
                    Take Assessment Test
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" className="px-8 py-3 text-lg border-2 hover:bg-gray-50 transition-all duration-300">
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
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
              <div className="mt-6">
                <h5 className="text-sm font-semibold mb-2 text-white">Newsletter</h5>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="bg-gray-800 text-white px-3 py-2 rounded-md flex-1 border border-gray-700 focus:outline-none focus:border-purple-500 text-sm" 
                  />
                  <Button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm whitespace-nowrap">
                    Subscribe
                  </Button>
                </div>
              </div>
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
