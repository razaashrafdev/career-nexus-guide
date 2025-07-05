
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Users, Award, TrendingUp, CheckCircle, Star, ArrowRight, BookOpen, Target, BarChart3, MessageCircle, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              CareerCompass
            </Link>
            <nav className="flex space-x-4">
              <Link to="/login" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
                Sign In
              </Link>
              <Link to="/signup" className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-all">
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-purple-200">
              AI-Powered Career Guidance
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Find Your Perfect Career Path
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Discover careers that match your personality, skills, and aspirations with our AI-powered assessment platform designed specifically for students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/personality-test">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg transition-all px-8 py-3 text-lg">
                  <Brain className="mr-2 h-5 w-5" />
                  Take Assessment Test
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">10,000+</div>
              <div className="text-gray-600">Students Guided</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">95%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-indigo-600">500+</div>
              <div className="text-gray-600">Career Paths</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">24/7</div>
              <div className="text-gray-600">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Why Choose CareerCompass?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform combines cutting-edge AI with proven career guidance methodologies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Assessment</h3>
                <p className="text-gray-600">
                  Advanced personality profiling using scientifically validated assessments to understand your unique traits and preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Personalized Matching</h3>
                <p className="text-gray-600">
                  Get matched with careers that align with your personality, skills, and interests using our sophisticated algorithm.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Skills Development</h3>
                <p className="text-gray-600">
                  Receive personalized recommendations for courses, certifications, and skill development pathways.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">Simple steps to discover your ideal career path</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Take Assessment</h3>
              <p className="text-gray-600">Complete our comprehensive personality and skills assessment</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload Resume</h3>
              <p className="text-gray-600">Share your resume for AI-powered skills analysis</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Matches</h3>
              <p className="text-gray-600">Receive personalized career recommendations</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Plan Your Path</h3>
              <p className="text-gray-600">Get guidance on skills development and next steps</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              What Students Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "CareerCompass helped me discover my passion for UX design. The assessment was incredibly accurate and the recommendations were spot-on!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    S
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-gray-500">Computer Science Student</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "I was confused about my career path, but this platform gave me clarity. Now I'm pursuing data science with confidence!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    M
                  </div>
                  <div>
                    <div className="font-semibold">Michael Chen</div>
                    <div className="text-sm text-gray-500">Business Student</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The AI counselor feature is amazing! It's like having a career advisor available 24/7. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    E
                  </div>
                  <div>
                    <div className="font-semibold">Emily Rodriguez</div>
                    <div className="text-sm text-gray-500">Psychology Student</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Discover Your Future?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who have found their ideal career paths with CareerCompass
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/personality-test">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
                Try Demo Assessment
              </Button>
            </Link>
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
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
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

export default Index;
