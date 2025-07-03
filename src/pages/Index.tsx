import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, BookOpen, Star, CheckCircle, Target, Brain, TrendingUp, Award, Globe, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Building2, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
const Index = () => {
  return <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            CareerCompass
          </div>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center py-[64px]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Discover Your Perfect Career Path with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our advanced AI analyzes your personality, skills, and career goals to provide personalized career recommendations, skill gap analysis, and learning pathways tailored just for you.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/personality-test">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg group">
                Take Free Assessment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/resume-upload">
              <Button size="lg" variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg">
                Upload Resume
              </Button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50,000+</div>
              <div className="text-gray-600">Students Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">1,200+</div>
              <div className="text-gray-600">Career Paths</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 bg-white/50 backdrop-blur-sm rounded-3xl mx-4 mb-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">How CareerCompass Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">1. Take Assessment</h3>
            <p className="text-gray-600">Complete our comprehensive personality and skills assessment to understand your strengths and preferences.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">2. Get Matched</h3>
            <p className="text-gray-600">Our AI analyzes your profile and matches you with ideal career paths based on your unique combination of traits.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">3. Grow & Succeed</h3>
            <p className="text-gray-600">Receive personalized learning recommendations and career guidance to bridge skill gaps and achieve your goals.</p>
          </div>
        </div>
      </section>

      {/* Success Stories Section - Redesigned */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Success Stories That Inspire</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our AI-powered platform has transformed careers and helped students achieve their professional goals
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left side - Key metrics */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">89% Success Rate</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Students who complete our assessment and follow recommendations successfully transition to aligned careers within 8 months
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">47% Salary Increase</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Average income improvement reported by graduates who followed their personalized career paths
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Global Recognition</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Trusted by Fortune 500 companies and featured in universities across 50+ countries worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Statistics */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">94%</div>
              <div className="text-sm text-gray-600 font-medium">Job Satisfaction</div>
              <div className="text-xs text-gray-500 mt-1">Feel fulfilled in new careers</div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">5.2</div>
              <div className="text-sm text-gray-600 font-medium">Months Average</div>
              <div className="text-xs text-gray-500 mt-1">Assessment to job offer</div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">750+</div>
              <div className="text-sm text-gray-600 font-medium">Partner Companies</div>
              <div className="text-xs text-gray-500 mt-1">Actively hiring graduates</div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">99%</div>
              <div className="text-sm text-gray-600 font-medium">Recommend Us</div>
              <div className="text-xs text-gray-500 mt-1">Would use again</div>
            </div>
          </div>
        </div>

        {/* Featured testimonial */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="inline h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />)}
            </div>
            <blockquote className="text-xl leading-relaxed mb-6">
              "CareerCompass completely changed my perspective on career planning. The AI analysis was incredibly accurate, and within 6 months, I landed my dream job as a UX Designer. The personalized learning path made all the difference."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">
                E
              </div>
              <div>
                <p className="font-semibold">Emily Rodriguez</p>
                <p className="text-purple-200">Psychology Graduate → UX Designer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Powerful Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Powerful Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">Personality Analysis</CardTitle>
              <CardDescription>
                Advanced psychometric assessment analyzing 16 personality dimensions to identify your ideal work environment and career preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Big Five personality traits</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Work style preferences</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Team dynamics assessment</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">Smart Resume Analysis</CardTitle>
              <CardDescription>
                AI-powered resume parsing that extracts skills, experience, and achievements to provide detailed career insights and improvement suggestions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Skill extraction & ranking</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Gap analysis</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Resume optimization tips</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">AI Career Counselor</CardTitle>
              <CardDescription>
                24/7 personalized career guidance powered by advanced AI, providing tailored advice for career transitions, skill development, and job searching.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Instant career advice</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Learning path recommendations</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Interview preparation</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Students Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-gray-600 mb-4">
                "CareerCompass helped me discover my passion for UX design. The personality test was incredibly accurate, and I landed my dream internship at a tech startup!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  S
                </div>
                <div>
                  <p className="font-semibold">Sarah Chen</p>
                  <p className="text-sm text-gray-500">Computer Science Student</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-gray-600 mb-4">
                "The AI counselor gave me amazing step-by-step guidance on switching from marketing to data science. The skill gap analysis was spot-on!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  M
                </div>
                <div>
                  <p className="font-semibold">Marcus Johnson</p>
                  <p className="text-sm text-gray-500">Business Administration</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-gray-600 mb-4">
                "I was completely lost after graduation, but this platform opened my eyes to careers I never considered. Now I'm thriving as a product manager!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  A
                </div>
                <div>
                  <p className="font-semibold">Aisha Patel</p>
                  <p className="text-sm text-gray-500">Engineering Graduate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16 bg-white/50 backdrop-blur-sm rounded-3xl mx-4 mb-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-purple-700">How accurate is the personality assessment?</h3>
            <p className="text-gray-600">Our assessment is based on validated psychometric principles and has a 95% accuracy rate, validated by career counselors and HR professionals.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-purple-700">Is my data secure?</h3>
            <p className="text-gray-600">Absolutely. We use enterprise-grade encryption and never share your personal information with third parties. Your privacy is our top priority.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-purple-700">How long does the assessment take?</h3>
            <p className="text-gray-600">The personality test takes about 10-15 minutes, and resume analysis is instant. You'll get your results immediately after completion.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-purple-700">Can I retake the assessment?</h3>
            <p className="text-gray-600">Yes! You can retake the assessment anytime as you grow and your preferences change. We recommend retaking it every 6-12 months.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Discover Your Dream Career?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students who have already found their perfect career path. Start your journey today with our free assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/personality-test">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                Start Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="border-2 border-white hover:bg-white px-8 py-6 text-lg font-semibold text-purple-600">
                Create Account
              </Button>
            </Link>
          </div>
          <div className="mt-8 text-sm opacity-75">
            ✓ No credit card required  ✓ 5-minute setup  ✓ Instant results
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-1">
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
                  <Mail className="h-4 w-4 mr-2" />
                  <a href="mailto:support@careercompass.com" className="hover:text-purple-400 transition-colors">
                    support@careercompass.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href="tel:+1-555-0123" className="hover:text-purple-400 transition-colors">
                    +1 (555) 012-3456
                  </a>
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>San Francisco, CA</span>
                </li>
              </ul>
              <div className="mt-6">
                <h5 className="text-sm font-semibold mb-2 text-white">Newsletter</h5>
                <div className="flex">
                  <input type="email" placeholder="Your email" className="bg-gray-800 text-white px-3 py-2 rounded-l-md flex-1 border border-gray-700 focus:outline-none focus:border-purple-500" />
                  <Button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-r-md rounded-l-none">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 CareerCompass. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm text-gray-400">
                <Link to="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link>
                <Link to="/cookie-policy" className="hover:text-purple-400 transition-colors">Cookie Policy</Link>
                <Link to="/accessibility" className="hover:text-purple-400 transition-colors">Accessibility</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;
