import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  TrendingUp, 
  Award, 
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import MobileNavbar from "@/components/MobileNavbar";

const Index = () => {
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const features = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Personality Assessment",
      description: "Discover your unique personality type and career preferences"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Career Matching",
      description: "Get matched with careers that align with your personality and skills"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Skills Analysis",
      description: "Identify your strengths and areas for development"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Learning Pathways",
      description: "Receive personalized learning recommendations for your career goals"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      image: "/placeholder.svg",
      quote: "CareerCompass helped me discover my passion for UX design. The personality test was incredibly insightful!",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Business Major",
      image: "/placeholder.svg", 
      quote: "The career recommendations were spot-on. I'm now pursuing a career in data analytics and loving it!",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Psychology Student",
      image: "/placeholder.svg",
      quote: "The AI career coach feature is amazing. It's like having a personal mentor available 24/7.",
      rating: 5
    }
  ];

  const stats = [
    { number: "50,000+", label: "Students Helped" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "200+", label: "Career Paths" },
    { number: "24/7", label: "AI Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            CareerCompass
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <MobileNavbar />
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Discover Your Perfect Career Path
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let AI-powered insights guide you to a career that matches your personality, skills, and aspirations. Start your journey to professional success today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/personality-test">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3 w-full sm:w-auto">
                Start Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Everything You Need to Find Your Dream Career
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform combines personality science, AI technology, and career expertise to guide your professional journey.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-100 rounded-3xl mx-4 my-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Success Stories That Inspire
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students who have transformed their careers with our AI-powered guidance and personalized insights.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">{testimonial.name}</h4>
                    <p className="text-purple-600 font-medium">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Badge variant="secondary" className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <Users className="w-5 h-5 mr-2" />
            Join 50,000+ Happy Students
          </Badge>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Take the first step towards your dream career. Our AI-powered assessment takes just 10 minutes.
          </p>
          <Link to="/personality-test">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4">
              Start Free Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
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

export default Index;
