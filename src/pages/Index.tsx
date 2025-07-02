
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, BookOpen, Star, CheckCircle, Target, Brain, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
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
      <section className="container mx-auto px-4 py-16 text-center">
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

      {/* Feature Cards */}
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
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
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
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
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
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
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

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              CareerCompass
            </div>
            <p className="text-gray-600 mb-6">
              Empowering students to discover their ideal career paths through AI-powered insights and personalized guidance.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-purple-600">Privacy Policy</a>
              <a href="#" className="hover:text-purple-600">Terms of Service</a>
              <a href="#" className="hover:text-purple-600">Contact Us</a>
              <a href="#" className="hover:text-purple-600">About</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
