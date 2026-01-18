
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Brain, Target, Users, Award, CheckCircle, Star, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Upload, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <Header variant="back" />

      {/* Hero Section */}
      <section className="py-20 relative bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
        <div className="relative container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 hover:bg-white/20 text-white-700">
              About CareerNexus
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-5xl mx-auto">
              Smart Career Powered by AI
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Empowering students to explore careers that truly align with their personality, skills, and future aspirations through AI innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
                Helping Students Achieve Their Dreams with AI
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                At CareerNexus, with a vision to deliver innovative, high-quality digital solutions, we have grown into a leading company specializing in career guidance, personality assessment, and AI-powered job matching.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center bg-white/80 rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
                  <div className="text-sm text-gray-600 font-medium">Students Helped</div>
                </div>
                <div className="text-center bg-white/80 rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
                  <div className="text-sm text-gray-600 font-medium">Success Rate</div>
                </div>
                <div className="text-center bg-white/80 rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
                  <div className="text-sm text-gray-600 font-medium">Career Paths</div>
                </div>
                <div className="text-center bg-white/80 rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600 font-medium">AI Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="bg-gradient-to-r from-gray-900 to-purple-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative bg-gradient-to-br from-[#1f1b33] to-[#33275a] rounded-2xl p-10 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center group bg-white/10 rounded-xl p-5 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-center flex-shrink-0">
                    <Brain className="h-8 w-8 text-purple-300 mb-3" />
                  </div>
                  <h4 className="text-white font-semibold">AI Assessment</h4>
                  <p className="text-sm text-gray-300 mt-1">Smart personality evaluation</p>
                </div>
                <div className="text-center group bg-white/10 rounded-xl p-5 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-center flex-shrink-0">
                    <Upload className="h-8 w-8 text-blue-300 mb-3" />
                  </div>
                  <h4 className="text-white font-semibold">Resume Analysis</h4>
                  <p className="text-sm text-gray-300 mt-1">Skill & strength detection</p>
                </div>
                <div className="text-center group bg-white/10 rounded-xl p-5 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-center flex-shrink-0">
                    <Target className="h-8 w-8 text-green-300 mb-3" />
                  </div>
                  <h4 className="text-white font-semibold">Career Matching</h4>
                  <p className="text-sm text-gray-300 mt-1">Best role suggestions</p>
                </div>
                <div className="text-center group bg-white/10 rounded-xl p-5 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-center flex-shrink-0">
                    <Award className="h-8 w-8 text-yellow-300 mb-3" />
                  </div>
                  <h4 className="text-white font-semibold">Guidance</h4>
                  <p className="text-sm text-gray-300 mt-1">Personalized mentoring</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Our journey of growth and innovation
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                Since our inception, CareerNexus has focused on building innovative AI-driven career guidance solutions, combining personality assessment and skill analysis to support students in an evolving job market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 leading-tight">
                Why choose CareerNexus?
              </h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Expertise</h3>
                    <p className="text-gray-600 leading-relaxed">Our team has extensive experience and expertise in career guidance, psychology, and AI technology.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Innovation</h3>
                    <p className="text-gray-600 leading-relaxed">We leverage the latest technologies to create innovative solutions that give our students a competitive edge.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">End-to-End Solutions</h3>
                    <p className="text-gray-600 leading-relaxed">From assessment to execution, we provide comprehensive solutions tailored to our students' unique requirements.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <Brain className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                  <div className="text-sm font-medium text-gray-900">AI Assessment</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <Upload className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                  <div className="text-sm font-medium text-gray-900">Resume Analysis</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <Target className="h-10 w-10 text-green-600 mx-auto mb-3" />
                  <div className="text-sm font-medium text-gray-900">Career Matching</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <TrendingUp className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                  <div className="text-sm font-medium text-gray-900">Progress Tracking</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gradient-to-r from-gray-900 to-purple-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl text-purple-300 mb-6 font-serif">"</div>
            <blockquote className="text-2xl md:text-3xl font-light mb-8 leading-relaxed italic">
              CareerNexus helped us elevate our counseling approach by combining AI-powered assessments with personalized career guidance. The platform significantly improved how students understand their strengths and make confident career decisions.”
            </blockquote>
            <div className="text-purple-300 text-sm font-medium uppercase tracking-wider">
              GURU CHATGPT
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
              Ready to take your career to the next level?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are discovering their ideal career paths with CareerNexus, guided by AI-driven insights and personalized recommendations.
            </p>
            <Link to="/personality-test">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 text-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300">
                Take Assessment Test →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
