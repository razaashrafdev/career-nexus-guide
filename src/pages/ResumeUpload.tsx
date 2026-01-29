import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, FileText, CheckCircle, Brain, Target, TrendingUp, Sparkles, Loader2 } from "lucide-react";
import { resumeService } from "@/services/resumeService";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AnimatedElement } from "@/components/AnimatedElement";
import { useAuth } from "@/contexts/AuthContext";


const ResumeUpload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();


  // ===============================
  // ON FILE CHANGE
  // ===============================
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setUploadedFile(e.target.files[0]);
    } else {
      setUploadedFile(null);
    }
  };

  // ===============================
  // ANALYZE / UPLOAD
  // ===============================
  const handleAnalyze = async () => {
  if (!uploadedFile) {
    toast({
      title: "No File Selected",
      description: "Please upload a resume file before analyzing.",
      variant: "destructive",
    });
    return;
  }

  setIsProcessing(true);

  try {
    const result = await resumeService.uploadResume(uploadedFile);

    if (!result.success) {
      toast({
        title: "Upload Failed",
        description: result.error?.message || "Something went wrong.",
        variant: "destructive",
      });
      return;
    }

    // ✅ CASE 1: USER LOGGED IN
    if (isAuthenticated) {
      const latest = await resumeService.getLatestResume();

      navigate("/dashboard", {
        state: {
          from: "resume",
          resumeData: latest.success?.data,
        },
      });
    }
    // ✅ CASE 2: GUEST USER
    else {
      navigate("/assessment"); 
      // ya jahan tum guest flow le jana chahte ho
    }

  } catch (error) {
    toast({
      title: "Error",
      description: "An unexpected error occurred.",
      variant: "destructive",
    });
  } finally {
    setIsProcessing(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header variant="back" />

      {/* Hero Section */}
      <section className="py-20 relative bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
        <div className="relative container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <AnimatedElement delay={0}>
              <Badge className="mb-6 bg-white/20 hover:bg-white/20 text-white-700">
                Resume Analysis
              </Badge>
            </AnimatedElement>
            <AnimatedElement delay={80}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
                Upload Your Resume
              </h1>
            </AnimatedElement>
            <AnimatedElement delay={160}>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Get personalized career recommendations, skill gap analysis, and job matching based on your resume. Our AI will analyze your experience and suggest the perfect career paths.
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <AnimatedElement delay={0}>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </AnimatedElement>
                <AnimatedElement delay={80}>
                  <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
                    Upload Your Resume
                  </CardTitle>
                </AnimatedElement>
                <AnimatedElement delay={160}>
                  <p className="text-gray-600 mt-2">
                    Supported formats: PDF, DOC, DOCX (Max 10MB)
                  </p>
                </AnimatedElement>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                {/* File Upload Area */}
                <AnimatedElement delay={0}>
                  <div className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${uploadedFile
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50/30'
                    }`}>
                    {uploadedFile ? (
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900 mb-1">
                            {uploadedFile.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setUploadedFile(null)}
                          className="mt-4"
                        >
                          Change File
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                            <FileText className="h-8 w-8 text-purple-600" />
                          </div>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900 mb-2">
                            Drag and drop your resume here
                          </p>
                          <p className="text-sm text-gray-600 mb-4">
                            or click to browse files
                          </p>
                        </div>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="cursor-pointer max-w-xs mx-auto"
                        />
                      </div>
                    )}
                  </div>
                </AnimatedElement>

                {/* Analyze Button */}
                <AnimatedElement delay={100}>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg transition-all h-12 text-lg"
                    onClick={handleAnalyze}
                    disabled={isProcessing || !uploadedFile}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Analyzing Resume...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Analyze Resume with AI
                      </>
                    )}
                  </Button>
                </AnimatedElement>

                {isProcessing && (
                  <AnimatedElement delay={200}>
                    <div className="text-center space-y-2 pt-4">
                      <p className="text-sm text-gray-600">
                        Our AI is analyzing your resume...
                      </p>
                      <div className="flex justify-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </AnimatedElement>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-6xl mx-auto">
            <AnimatedElement delay={0}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  What You'll Get
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Our AI-powered analysis provides comprehensive insights to guide your career journey.
                </p>
              </div>
            </AnimatedElement>
            <div className="grid md:grid-cols-3 gap-6">
              <AnimatedElement delay={0}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-white">AI-Powered Analysis</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    Advanced AI extracts skills, experience, and qualifications from your resume with precision.
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={100}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-white">Career Matching</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    Get matched with careers that align with your skills, experience, and personality.
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={200}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-white">Skills Development</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    Receive personalized recommendations for skills to develop and courses to take.
                  </p>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-6xl mx-auto">
            <AnimatedElement delay={0}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">
                  Why Upload Your Resume?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover the benefits of our comprehensive resume analysis.
                </p>
              </div>
            </AnimatedElement>
            <div className="grid md:grid-cols-2 gap-8">
              <AnimatedElement delay={0}>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Instant Analysis</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Get comprehensive insights about your resume in seconds, not hours.
                    </p>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={100}>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Skill Gap Identification</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Discover which skills you're missing and get recommendations to fill those gaps.
                    </p>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={200}>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Job Recommendations</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Receive personalized job recommendations based on your resume and career goals.
                    </p>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={300}>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Privacy Protected</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Your resume is securely processed and stored with enterprise-grade encryption.
                    </p>
                  </div>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ResumeUpload;
