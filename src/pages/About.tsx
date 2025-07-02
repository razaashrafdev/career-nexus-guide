
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, Heart, Target, Globe, Award, Lightbulb, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            About CareerCompass
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize career guidance and help every student discover their true potential through the power of AI and personalized insights.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At CareerCompass, we believe that everyone deserves access to world-class career guidance. Too many talented individuals struggle to find their path simply because they lack access to personalized counseling and insights about their strengths.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our AI-powered platform bridges this gap by providing sophisticated personality analysis, skill assessment, and career matching that was previously only available to a privileged few. We're democratizing career discovery for students worldwide.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-2">50,000+</div>
                  <div className="text-sm text-gray-600">Students Helped</div>
                </CardContent>
              </Card>
              <Card className="text-center border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-sm text-gray-600">Countries Served</div>
                </CardContent>
              </Card>
              <Card className="text-center border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-indigo-600 mb-2">95%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </CardContent>
              </Card>
              <Card className="text-center border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-2">89%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Empathy First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">We understand the anxiety and confusion that comes with career decisions. Every feature we build is designed with genuine care for our users' emotional journey.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">We leverage cutting-edge AI and machine learning to provide insights that weren't possible before, constantly pushing the boundaries of career guidance.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Privacy & Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Your personal data and career aspirations are sacred to us. We employ bank-level security and never share your information with third parties.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-16 bg-white/50 backdrop-blur-sm rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              CareerCompass was born from a simple observation: too many brilliant students were making career decisions based on limited information or societal expectations rather than their true strengths and passions.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Our founders, having experienced the confusion of career choice firsthand, assembled a team of psychologists, career counselors, data scientists, and educators to create a solution that could scale personalized career guidance to millions of students worldwide.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Today, we're proud to have helped over 50,000 students discover careers they love, with a 95% accuracy rate in our personality assessments and an 89% success rate in career transitions.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              But we're just getting started. Our vision is a world where every student has access to personalized, AI-powered career guidance that helps them unlock their full potential and build fulfilling professional lives.
            </p>
          </div>
        </section>

        {/* Team Preview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                  AS
                </div>
                <h3 className="text-xl font-bold mb-2">Dr. Alex Smith</h3>
                <p className="text-purple-600 font-medium mb-3">CEO & Co-Founder</p>
                <p className="text-gray-600 text-sm">Former Stanford career counselor with 15+ years helping students discover their paths.</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                  MJ
                </div>
                <h3 className="text-xl font-bold mb-2">Maria Johnson</h3>
                <p className="text-blue-600 font-medium mb-3">CTO & Co-Founder</p>
                <p className="text-gray-600 text-sm">AI researcher from MIT specializing in personality analysis and predictive modeling.</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                  DL
                </div>
                <h3 className="text-xl font-bold mb-2">Dr. David Lee</h3>
                <p className="text-indigo-600 font-medium mb-3">Chief Psychology Officer</p>
                <p className="text-gray-600 text-sm">Licensed psychologist and expert in career development and psychometric testing.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join the thousands of students who have already discovered their perfect career path with CareerCompass.
            </p>
            <Link to="/personality-test">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Take Free Assessment
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
