
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Users, Award, TrendingUp, CheckCircle, Star, ArrowRight, BookOpen, Target, BarChart3, MessageCircle, Shield, Zap, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AnimatedElement } from "@/components/AnimatedElement";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-20 text-center relative bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement delay={0}>
              <Badge className="mb-6 bg-white/20 hover:bg-white/20 text-white-700">
                AI-Powered Career Guidance
              </Badge>
            </AnimatedElement>
            <AnimatedElement delay={80}>
              <h1 className="text-5xl md:text-6xl font-bold text-white bg-clip-text text-transparent mb-6">
                Find Your Perfect Career Path
              </h1>
            </AnimatedElement>
            <AnimatedElement delay={160}>
              <p className="text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
                Discover careers that match your personality, skills, and aspirations with our AI-powered assessment platform designed specifically for students.
              </p>
            </AnimatedElement>
            <AnimatedElement delay={240}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/personality-test">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg transition-all px-8 py-3 text-lg">
                    <Brain className="mr-2 h-5 w-5" />
                    Take Assessment Test
                  </Button>
                </Link>
                <Link to="/resume-upload">
                  <Button size="lg" variant="outline" className="text-black hover:bg-purple-50 px-8 py-3 text-lg">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Resume
                  </Button>
                </Link>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <AnimatedElement delay={0}>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">
                  <AnimatedCounter value={100} suffix="+" />
                </div>
                <div className="text-gray-600">Students Guided</div>
              </div>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">
                  <AnimatedCounter value={99} suffix="%" />
                </div>
                <div className="text-gray-600">Accuracy Rate</div>
              </div>
            </AnimatedElement>
            <AnimatedElement delay={200}>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">
                  <AnimatedCounter value={100} suffix="+" />
                </div>
                <div className="text-gray-600">Career Paths</div>
              </div>
            </AnimatedElement>
            <AnimatedElement delay={300}>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-gray-600">AI Support</div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Why Choose Career Nexus?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our comprehensive platform combines cutting-edge AI with proven career guidance methodologies
              </p>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <AnimatedElement delay={0}>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                </AnimatedElement>
                <AnimatedElement delay={80}>
                  <h3 className="text-xl font-semibold mb-3">AI-Powered Assessment</h3>
                </AnimatedElement>
                <AnimatedElement delay={160}>
                  <p className="text-gray-600">
                    Advanced personality profiling using scientifically validated assessments to understand your unique traits and preferences.
                  </p>
                </AnimatedElement>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <AnimatedElement delay={100}>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                </AnimatedElement>
                <AnimatedElement delay={180}>
                  <h3 className="text-xl font-semibold mb-3">Personalized Matching</h3>
                </AnimatedElement>
                <AnimatedElement delay={260}>
                  <p className="text-gray-600">
                    Get matched with careers that align with your personality, skills, and interests using our sophisticated algorithm.
                  </p>
                </AnimatedElement>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <AnimatedElement delay={200}>
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                </AnimatedElement>
                <AnimatedElement delay={280}>
                  <h3 className="text-xl font-semibold mb-3">Skills Development</h3>
                </AnimatedElement>
                <AnimatedElement delay={360}>
                  <p className="text-gray-600">
                    Receive personalized recommendations for courses, certifications, and skill development pathways.
                  </p>
                </AnimatedElement>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 text-center relative bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
        <div className="container">
          <AnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white bg-clip-text text-transparent mb-4">
                How It Works
              </h2>
              <p className="text-xl text-white/80">Simple steps to discover your ideal career path</p>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-4 gap-8">
            <AnimatedElement delay={0}>
              <div className="text-center group bg-white/10 rounded-xl p-5 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Take Assessment</h3>
                <p className="text-white/70">Complete our comprehensive personality and skills assessment</p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <div className="text-center group bg-white/10 rounded-xl p-5 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Upload Resume</h3>
                <p className="text-white/70">Share your resume (PDF) for AI-powered skills analysis</p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="text-center group bg-white/10 rounded-xl p-5 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Get Matches</h3>
                <p className="text-white/70">Receive personalized career recommendations</p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="text-center group bg-white/10 rounded-xl p-5 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2">Plan Your Path</h3>
                <p className="text-white/70">Get guidance on skills development and next steps</p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                What Students Say
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <AnimatedElement delay={0}>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </AnimatedElement>
                <AnimatedElement delay={80}>
                  <p className="text-gray-600 mb-4">
                    "Career Nexus helped me discover my passion for UX design. The assessment was incredibly accurate and the recommendations were spot-on!"
                  </p>
                </AnimatedElement>
                <AnimatedElement delay={160}>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      S
                    </div>
                    <div>
                      <div className="font-semibold">Sarah Johnson</div>
                      <div className="text-sm text-gray-500">Computer Science Student</div>
                    </div>
                  </div>
                </AnimatedElement>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <AnimatedElement delay={100}>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </AnimatedElement>
                <AnimatedElement delay={180}>
                  <p className="text-gray-600 mb-4">
                    "I was confused about my career path, but this platform gave me clarity. Now I'm pursuing data science with confidence!"
                  </p>
                </AnimatedElement>
                <AnimatedElement delay={260}>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      M
                    </div>
                    <div>
                      <div className="font-semibold">Michael Chen</div>
                      <div className="text-sm text-gray-500">Business Student</div>
                    </div>
                  </div>
                </AnimatedElement>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <AnimatedElement delay={200}>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </AnimatedElement>
                <AnimatedElement delay={280}>
                  <p className="text-gray-600 mb-4">
                    "The AI counselor feature is amazing! It's like having a career advisor available 24/7. Highly recommended!"
                  </p>
                </AnimatedElement>
                <AnimatedElement delay={360}>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      E
                    </div>
                    <div>
                      <div className="font-semibold">Emily Rodriguez</div>
                      <div className="text-sm text-gray-500">Psychology Student</div>
                    </div>
                  </div>
                </AnimatedElement>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center relative bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <AnimatedElement delay={0}>
            <h2 className="text-4xl font-bold mb-4">Ready to Discover Your Future?</h2>
          </AnimatedElement>
          <AnimatedElement delay={100}>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students who have found their ideal career paths with Career Nexus.
            </p>
          </AnimatedElement>
          <AnimatedElement delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
              <Link to="/personality-test">
                <Button size="lg" variant="outline" className=" bg-transparent border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg">
                  Take Assessment Test
                </Button>
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
