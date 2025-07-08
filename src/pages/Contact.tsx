import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    inquiry: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              CareerCompass
            </Link>
            <Link 
              to="/" 
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Clean Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about your career journey? We're here to help you succeed.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information - Simplified */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600 text-sm mt-1">We'll respond within 24 hours</p>
                    <a 
                      href="mailto:support@careercompass.com" 
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      support@careercompass.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600 text-sm mt-1">Monday - Friday, 9 AM - 6 PM EST</p>
                    <a 
                      href="tel:+1-555-0123" 
                      className="text-green-600 hover:text-green-700 transition-colors"
                    >
                      +1 (555) 012-3456
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Response Time</h3>
                    <p className="text-gray-600 text-sm mt-1">Typically within 24 hours</p>
                    <p className="text-purple-600">Fast & reliable support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Info - Minimal */}
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Office Location</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      123 Career Boulevard<br />
                      San Francisco, CA 94105<br />
                      United States
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form - Clean and Professional */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-8">
                {!isSubmitted ? (
                  <>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                      Send us a message
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                            First Name *
                          </Label>
                          <Input 
                            id="firstName" 
                            required
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                            Last Name *
                          </Label>
                          <Input 
                            id="lastName" 
                            required
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email Address *
                        </Label>
                        <Input 
                          id="email" 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="john@example.com"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="inquiry" className="text-sm font-medium text-gray-700">
                          Type of Inquiry
                        </Label>
                        <Select value={formData.inquiry} onValueChange={(value) => handleInputChange("inquiry", value)}>
                          <SelectTrigger className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Question</SelectItem>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="assessment">Assessment Help</SelectItem>
                            <SelectItem value="career">Career Guidance</SelectItem>
                            <SelectItem value="billing">Billing & Accounts</SelectItem>
                            <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                          Message *
                        </Label>
                        <Textarea 
                          id="message" 
                          required
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          rows={5}
                          className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Please describe how we can help you..."
                        />
                      </div>
                      
                      <div className="pt-4">
                        <Button 
                          type="submit"
                          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsSubmitted(false)}
                      className="border-gray-300"
                    >
                      Send Another Message
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Simple FAQ - Minimal */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            Common Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-2">How accurate are the assessments?</h3>
              <p className="text-gray-600 text-sm">
                Our assessments use scientifically validated models with 85-90% accuracy in career recommendations.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-2">Is my data secure?</h3>
              <p className="text-gray-600 text-sm">
                Yes, we use enterprise-grade encryption and strict privacy protocols to protect your information.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-2">Can I retake assessments?</h3>
              <p className="text-gray-600 text-sm">
                Absolutely! You can retake assessments anytime from your dashboard for updated results.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-2">Do you offer personal counseling?</h3>
              <p className="text-gray-600 text-sm">
                Yes, we offer one-on-one sessions with certified career counselors. Contact us to schedule.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;