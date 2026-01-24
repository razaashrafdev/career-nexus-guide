import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { authService } from "@/services/authService";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { User, BookOpen, FileText, Target, TrendingUp, Award, ArrowRight, CheckCircle, AlertCircle, Upload, RefreshCw, Brain, BarChart3, Settings, LogOut, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ResponsiveSidebar from "@/components/ResponsiveSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { XCircle, Lightbulb } from "lucide-react";
import { Download } from "lucide-react";

// Dashboard.tsx ke upar imports ke baad
interface ResumeAnalysis {
  matchPercentage?: number;
  experience?: string;
  matchedSkills?: string[];
  missingSkills?: string[];
  suggestions?: string[];
  jobVacancies?: { [careerName: string]: JobVacancy[] };
  tutorials?: {
    [skillName: string]: string[];   // <-- ADD THIS
  };
}

interface ResumeData {
  uploadedAt?: string;
  fileURL?: string;
  parsedSkills?: string; // comma-separated string
  analysis?: ResumeAnalysis;
}

interface JobVacancy {
  title: string;
  company: string;
  location: string;
  url: string;
  postedAt: string;
}

interface CareerUIModel {
  careerName: string;
  jobs: JobVacancy[];
}




const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  console.log(useAuth());

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data - in real app this would come from backend
  const [userData, setUserData] = useState({

    name: user.fullName || "User",
    email: user.email || "",
    assessmentCompleted: false,
    resumeUploaded: true,
    personalityType: "",
    careerScore: 0,
    recommendedCareers: [],
    skills: []
  });
  const [resumeData, setResumeData] = useState<ResumeData>({});
  const [careers, setCareers] = useState<CareerUIModel[]>([]);



  useEffect(() => {
    if (location.state?.from === "resume") {
      const data = location.state;

      setUserData((prev) => ({
        ...prev,
        resumeUploaded: true,
        recommendedCareers: data.analysis?.careerRecommendation || [],
        careerScore: data.analysis?.careerCount || 0,
      }));
    }
  }, [location.state]);


  // FETCH LATEST RESUME FROM BACKEND
  useEffect(() => {
    const fetchLatestResume = async () => {
      try {
        const response = await fetch("http://career-nexus.runasp.net/api/Resume/latest", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("career_nexus_token")}`
          }
        });

        if (response.status === 404) {
          return; // no resume found
        }

        const data = await response.json();

        setResumeData({
          fileURL: data.fileURL,
          parsedSkills: data.parsedSkills,
          analysis: data.analysis,
          uploadedAt: data.uploadedAt
        });

        setUserData(prev => ({
          ...prev,
          resumeUploaded: true,
          // personalityType: data.analysis?.experience || "",
          careerScore: data.analysis?.matchPercentage || 0,
          recommendedCareers: data.analysis?.careerRecommendation || [],
          skills: data.analysis?.matchedSkills || []
        }));

      } catch (error) {
        console.log("Error fetching resume:", error);
      }
    };

    fetchLatestResume();
  }, []);
  // Convert backend jobVacancies object → array for UI

  // // FETCH LATEST RESUME FROM BACKEND
  // useEffect(() => {
  //   const fetchLatestResume = async () => {
  //     try {
  //       const response = await fetch("http://localhost:7270/api/Resume/latest", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("career_nexus_token")}`
  //         }
  //       });

  //       if (response.status === 404) {
  //         return;
  //       }

  //       const data = await response.json();

  //       setResumeData({
  //         fileURL: data.fileURL,
  //         parsedSkills: data.parsedSkills,
  //         analysis: data.analysis,
  //         uploadedAt: data.uploadedAt
  //       });

  //       setUserData(prev => ({
  //         ...prev,
  //         resumeUploaded: true,
  //         careerScore: data.analysis?.matchPercentage || 0,
  //         recommendedCareers: data.analysis?.careerRecommendation || [],
  //         skills: data.analysis?.matchedSkills || []
  //       }));

  //     } catch (error) {
  //       console.log("Error fetching resume:", error);
  //     }
  //   };

  //   fetchLatestResume();
  // }, []);

  // ⭐⭐ ADD THIS useEffect RIGHT HERE (3rd position)
  useEffect(() => {
    if (!resumeData.analysis?.jobVacancies) return;

    const jobVacancyObject = resumeData.analysis.jobVacancies;

    const transformedCareers: CareerUIModel[] = Object.keys(jobVacancyObject).map(careerName => ({
      careerName,
      jobs: jobVacancyObject[careerName] ?? []
    }));

    setCareers(transformedCareers);

  }, [resumeData]);



  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match!");
      return;
    }

    setIsLoading(true);
    setMessage("");

    const result = await authService.changePassword(oldPassword, newPassword);

    setIsLoading(false);

    if (result.error) {
      setMessage(result.error.message);
    } else {
      setMessage("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };


  const sidebarItems = [{
    id: "overview",
    label: "Overview",
    icon: Home
  }, {
    id: "personality",
    label: "Personality Assessment",
    icon: Brain
  }, {
    id: "resume",
    label: "Resume Analysis",
    icon: FileText
  }, {
    id: "careers",
    label: "Career Recommendations",
    icon: Target
  }, {
    id: "skills",
    label: "Skills Development",
    icon: BookOpen
  }, {
    id: "ai-chat",
    label: "AI Chat Counselor",
    icon: Brain
  }, {
    id: "settings",
    label: "Settings",
    icon: Settings
  }];

  const getGuidanceMessage = () => {
    const {
      assessmentCompleted,
      resumeUploaded
    } = userData;
    if (assessmentCompleted && resumeUploaded) {
      return {
        type: "success",
        title: "Great! You're all set!",
        message: "You've completed both your personality assessment and uploaded your resume. Explore your career recommendations below.",
        icon: <CheckCircle className="h-6 w-6 text-green-500" />
      };
    } else if (assessmentCompleted && !resumeUploaded) {
      return {
        type: "info",
        title: "Upload your resume for better counselling",
        message: "You've completed your personality assessment. Now upload your resume to get personalized career recommendations based on your skills and experience.",
        icon: <Upload className="h-6 w-6 text-blue-500" />
      };
    } else if (!assessmentCompleted && resumeUploaded) {
      return {
        type: "info",
        title: "Take the personality assessment for better counselling",
        message: "Great! You've uploaded your resume. Now take our personality assessment to get more accurate career recommendations.",
        icon: <Brain className="h-6 w-6 text-purple-500" />
      };
    } else {
      return {
        type: "warning",
        title: "Get started with your career journey!",
        message: "Complete your personality assessment and upload your resume to unlock personalized career guidance.",
        icon: <AlertCircle className="h-6 w-6 text-orange-500" />
      };
    }
  };

  const guidance = getGuidanceMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex">
      <ResponsiveSidebar>
        <div className="p-4 md:p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <img src="/header-icon.png" alt="Career Nexus Logo" className="h-8 w-auto md:h-10 md:w-auto" />
          </Link>
        </div>

        <nav className="p-2 md:p-4 flex-1 overflow-y-auto">
          <ul className="space-y-1 md:space-y-2">
            {sidebarItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-2 md:space-x-3 px-2 md:px-3 py-2 rounded-lg transition-colors text-sm md:text-base ${activeSection === item.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <item.icon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <span className="text-left truncate">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-2 md:p-4 border-t border-gray-200 mt-auto">
          <Button onClick={handleLogout} variant="outline" size="sm" className="w-full justify-start text-red-600 hover:text-red-700 text-xs md:text-sm">
            <LogOut className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            <span>Logout</span>
          </Button>
        </div>
      </ResponsiveSidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        {/* Header */}
        <header className="fixed top-0 right-0 left-0 md:left-64 bg-white backdrop-blur-sm border-b border-gray-200 py-2 px-3 md:py-[14px] md:px-6 z-40">
          <div className="flex justify-between items-center">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg md:text-2xl font-bold text-gray-800 truncate">User Dashboard</h1>
              <p className="text-sm md:text-base text-gray-600 truncate">Welcome back {userData.name}</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-3 md:p-6 ml-16 md:ml-0 overflow-x-hidden mt-[76px] md:mt-[98px]">
          {activeSection === "overview" && <div className="space-y-4 md:space-y-6 max-w-full">
            {/* Guidance Message */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="flex-shrink-0">
                    {guidance.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-semibold mb-2">{guidance.title}</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-4">{guidance.message}</p>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-3">
                      {!userData.assessmentCompleted && <Link to="/personality-test">
                        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 w-full sm:w-auto text-sm md:text-base">
                          <Brain className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                          Take Assessment Test
                        </Button>
                      </Link>}
                      {userData.assessmentCompleted && <Link to="/personality-test">
                        <Button variant="outline" className="w-full sm:w-auto text-sm md:text-base">
                          <RefreshCw className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                          Retake Assessment Test
                        </Button>
                      </Link>}
                      {!userData.resumeUploaded && <Link to="/resume-upload">
                        <Button variant="outline" className="w-full sm:w-auto text-sm md:text-base">
                          <Upload className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                          Upload Resume
                        </Button>
                      </Link>}
                      {userData.resumeUploaded && <Link to="/resume-upload">
                        <Button variant="outline" className="w-full sm:w-auto text-sm md:text-base">
                          <FileText className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                          Update Resume
                        </Button>
                      </Link>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-purple-100 text-xs md:text-sm">Completion Rate</p>
                      <p className="text-xl md:text-3xl font-bold truncate">
                        {userData.assessmentCompleted && userData.resumeUploaded ? "100%" : userData.assessmentCompleted || userData.resumeUploaded ? "50%" : "0%"}
                      </p>
                    </div>
                    <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-purple-100 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-600 text-xs md:text-sm">Career Score</p>
                      <p className="text-xl md:text-3xl font-bold text-green-600 truncate">
                        {userData.careerScore || 0}%
                      </p>

                    </div>
                    <Award className="h-6 w-6 md:h-8 md:w-8 text-green-500 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-600 text-xs md:text-sm">Personality Type</p>
                      <p className="text-xl md:text-3xl font-bold text-blue-600 truncate">
                        {userData.personalityType || "N/A"}
                      </p>
                    </div>
                    <User className="h-6 w-6 md:h-8 md:w-8 text-blue-500 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-600 text-xs md:text-sm">Recommendations</p>
                      <p className="text-xl md:text-3xl font-bold text-indigo-600 truncate">{userData.recommendedCareers?.length || 0}</p>
                    </div>
                    <Target className="h-6 w-6 md:h-8 md:w-8 text-indigo-500 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Overview */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs md:text-sm font-medium">Personality Assessment</span>
                      <Badge variant={userData.assessmentCompleted ? "default" : "secondary"} className="text-xs">
                        {userData.assessmentCompleted ? "Completed" : "Pending"}
                      </Badge>
                    </div>
                    <Progress value={userData.assessmentCompleted ? 100 : 0} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs md:text-sm font-medium">Resume Upload</span>
                      <Badge variant={userData.resumeUploaded ? "default" : "secondary"} className="text-xs">
                        {userData.resumeUploaded ? "Uploaded" : "Pending"}
                      </Badge>
                    </div>
                    <Progress value={userData.resumeUploaded ? 100 : 0} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>}

          {/* Other sections remain the same but add responsive padding and text sizes */}
          {activeSection === "personality" && <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Personality Assessment</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              {userData.assessmentCompleted ? <div className="space-y-4">
                <p className="text-sm md:text-base">Your personality type: <strong>{userData.personalityType}</strong></p>
                <p className="text-sm md:text-base">Assessment completed successfully!</p>
                <Button variant="outline" className="text-sm md:text-base">
                  <RefreshCw className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  Retake Assessment
                </Button>
              </div> : <div className="text-center py-6 md:py-8">
                <Brain className="h-12 w-12 md:h-16 md:w-16 text-purple-500 mx-auto mb-4" />
                <h3 className="text-base md:text-lg font-semibold mb-2">Take Your Personality Assessment</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">Discover your personality type and get personalized career recommendations.</p>
                <Link to="/personality-test">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-sm md:text-base">
                    Start Assessment
                  </Button>
                </Link>
              </div>}
            </CardContent>
          </Card>}

          {activeSection === "resume" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base md:text-lg text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 md:h-6 md:w-6" />
                    Resume Analysis
                  </CardTitle>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {resumeData.uploadedAt
                        ? `Uploaded ${new Date(resumeData.uploadedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}`
                        : "Resume uploaded"}
                    </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-4 md:p-6">
                {userData.resumeUploaded ? (
                  <div className="space-y-6">
                    {/* Skills Section - Combined */}
                    {(resumeData.analysis?.matchedSkills?.length > 0 || resumeData.parsedSkills || resumeData.analysis?.missingSkills?.length > 0) && (
                      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 rounded-t-xl px-6 py-4">
                          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2.5">
                            <BarChart3 className="h-5 w-5 text-blue-600" />
                            Skills Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-7">
                          {/* Matched Skills */}
                          {/* {resumeData.analysis?.matchedSkills && resumeData.analysis.matchedSkills.length > 0 && (
                            <div className="flex justify-between p-4 items-center rounded-lg border-l-4 shadow-sm hover:shadow-md transition-all duration-300 border-green-300 pb-4">
                              <div className="flex justify-center items-center gap-2.5 mb-4">
                                <h4 className="text-base font-semibold">
                                  Matched Skills
                                </h4>
                              </div>
                              <div className="flex flex-wrap gap-2.5 pl-5">
                                {resumeData.analysis.matchedSkills.map((skill: string, index: number) => (
                                  <Badge
                                    key={index}
                                    className="bg-green-100 text-green-800 hover:bg-green-200 px-3.5 py-2 text-sm font-medium border border-green-300 rounded-md transition-colors"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )} */}

                          {/* All Parsed Skills */}
                          {resumeData.parsedSkills && (
                            <div className="flex justify-between p-4 items-center rounded-lg border-l-4 shadow-sm hover:shadow-md transition-all duration-300 border-blue-300 pb-4">
                              <div className="flex items-center gap-2.5 mb-4">
                                <h4 className="pt-2 text-base font-semibold">
                                  All Extracted Skills
                                </h4>
                              </div>
                              <div className="flex flex-wrap gap-2.5 pl-5">
                                {resumeData.parsedSkills.split(",").map((skill, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-blue-50 text-gray-500 hover:bg-blue-100 px-3.5 py-2 text-sm border border-blue-200 rounded-md transition-colors"
                                  >
                                    {skill.trim()}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Missing Skills */}
                          {resumeData.analysis?.missingSkills && resumeData.analysis.missingSkills.length > 0 && (
                            <div className="p-4 items-center rounded-lg border-l-4 shadow-sm hover:shadow-md transition-all duration-300 border-orange-300 pb-4">
                              <div className="flex items-center gap-2.5 mb-3">
                                <XCircle className="h-4.5 w-4.5 text-orange-600" />
                                <h4 className="text-base font-semibold text-orange-700">
                                  Missing Skills
                                </h4>
                              </div>
                              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                Consider adding these skills to improve your career match score:
                              </p>
                              <div className="flex flex-wrap gap-2.5">
                                {resumeData.analysis.missingSkills.map((skill: string, index: number) => (
                                  <Badge
                                    key={index}
                                    className="bg-orange-100 text-orange-800 hover:bg-orange-200 px-3.5 py-2 text-sm font-medium border border-orange-300 rounded-md transition-colors"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </div>
                    )}

                    {/* Suggestions */}
                    {resumeData.analysis?.suggestions && resumeData.analysis.suggestions.length > 0 && (
                      <div className="bg-white border border-green-200 rounded-xl shadow-sm">
                        <CardHeader className="bg-gradient-to-r from-green-50 to-amber-50 border-b border-green-200 rounded-t-xl px-6 py-4">
                          <CardTitle className="text-lg font-semibold flex items-center gap-2.5">
                            <Lightbulb className="h-5 w-5" />
                            AI-Powered Suggestions
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <ul className="space-y-4">
                            {resumeData.analysis.suggestions.map((suggestion: string, index: number) => (
                              <li key={index} className="flex items-start gap-3.5">
                                <div className="mt-0.5 p-2 bg-green-100 rounded-full flex-shrink-0">
                                  <Lightbulb className="h-3.5 w-3.5 text-blue-600" />
                                </div>
                                <p className="text-base text-gray-700 flex-1 leading-relaxed pt-0.5">
                                  {suggestion}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-1">
                      {resumeData.fileURL && (
                        <a 
                          href={resumeData.fileURL} 
                          download 
                          className="flex-1"
                        >
                          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-sm md:text-base h-12 font-medium shadow-sm hover:shadow-md transition-all duration-200">
                            <Download className="h-4 w-4 mr-2" />
                            Download Resume
                          </Button>
                        </a>
                      )}
                      <Link to="/resume-upload" className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-700 text-sm md:text-base h-12 font-medium shadow-sm hover:shadow-md transition-all duration-200">
                          <Upload className="h-4 w-4 mr-2" />
                          Update Resume
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  // No Resume Uploaded
                  <div className="text-center py-8 md:py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6">
                      <FileText className="h-10 w-10 md:h-12 md:w-12 text-blue-600" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Upload Your Resume</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-6 max-w-md mx-auto">
                      Upload your resume to get AI-powered analysis, personalized career recommendations, and skill insights.
                    </p>
                    <Link to="/resume-upload">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm md:text-base px-8 py-6 h-auto">
                        <Upload className="h-5 w-5 mr-2" />
                        Upload Resume
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          )}


          {activeSection === "careers" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base md:text-lg text-white flex items-center gap-2">
                    <Target className="h-5 w-5 md:h-6 md:w-6" />
                    Career Recommendations
                  </CardTitle>
                  {careers.length > 0 && (
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {careers.length} {careers.length === 1 ? 'Career' : 'Careers'}
                      </Badge>
                    )}
                </div>
              </CardHeader>

              <CardContent className="p-4 md:p-6">
                {careers.length === 0 ? (
                  <div className="text-center py-8 md:py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6">
                      <Target className="h-10 w-10 md:h-12 md:w-12 text-blue-600" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">No Career Recommendations</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-6 max-w-md mx-auto">
                      Upload your resume to see AI-powered career recommendations based on your skills and experience.
                    </p>
                    <Link to="/resume-upload">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm md:text-base px-8 py-6 h-auto">
                        <Upload className="h-5 w-5 mr-2" />
                        Upload Resume
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {careers.map((career, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 rounded-t-xl px-6 py-4">
                          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2.5">
                            <Target className="h-5 w-5 text-blue-600" />
                            {career.careerName}
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 ml-auto">
                              {career.jobs.length} {career.jobs.length === 1 ? 'Job' : 'Jobs'}
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            {career.jobs.map((job, j) => (
                              <div key={j} className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-semibold text-gray-900 mb-2">{job.title}</h3>
                                    <div className="space-y-1">
                                      <p className="text-sm text-gray-600 flex items-center gap-2">
                                        <span className="font-medium">Company:</span> {job.company}
                                      </p>
                                      <p className="text-sm text-gray-600 flex items-center gap-2">
                                        <span className="font-medium">Location:</span> {job.location}
                                      </p>
                                      {job.postedAt && (
                                        <p className="text-xs text-gray-500">
                                          Posted: {new Date(job.postedAt).toLocaleDateString()}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <a
                                    href={job.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md flex-shrink-0"
                                  >
                                    <ArrowRight className="h-4 w-4" />
                                    Apply Now
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}



          {activeSection === "skills" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base md:text-lg text-white flex items-center gap-2">
                    <BookOpen className="h-5 w-5 md:h-6 md:w-6" />
                    Skills Development
                  </CardTitle>
                  {resumeData.analysis?.missingSkills?.length > 0 && (
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {resumeData.analysis.missingSkills.length} {resumeData.analysis.missingSkills.length === 1 ? 'Skill' : 'Skills'} to Develop
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4 md:p-6">
                <div className="space-y-6">
                  {/* Missing Skills */}
                  {resumeData.analysis?.missingSkills && resumeData.analysis.missingSkills.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 rounded-t-xl px-6 py-4">
                        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2.5">
                          <XCircle className="h-5 w-5 text-orange-600" />
                          Missing Skills
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                          Focus on developing these skills to improve your career match score:
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          {resumeData.analysis.missingSkills.map((skill: string, index: number) => (
                            <Badge
                              key={index}
                              className="bg-orange-100 text-orange-800 hover:bg-orange-200 px-3.5 py-2 text-sm font-medium border border-orange-300 rounded-md transition-colors"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  )}

                  {/* Tutorials Section */}
                  {resumeData.analysis?.tutorials && Object.keys(resumeData.analysis.tutorials).length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 rounded-t-xl px-6 py-4">
                        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2.5">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                          Tutorials to Improve Your Skills
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 ml-auto">
                            {Object.keys(resumeData.analysis.tutorials).length} {Object.keys(resumeData.analysis.tutorials).length === 1 ? 'Skill' : 'Skills'}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {Object.keys(resumeData.analysis.tutorials).map((skillName: string, i: number) => (
                            <div
                              key={i}
                              className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
                            >
                              <div className="flex items-center gap-2.5 mb-3">
                                <FileText className="h-4.5 w-4.5 text-blue-600" />
                                <h4 className="text-base font-semibold text-gray-900">
                                  {skillName}
                                </h4>
                                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 ml-auto">
                                  {resumeData.analysis.tutorials[skillName].length} {resumeData.analysis.tutorials[skillName].length === 1 ? 'Tutorial' : 'Tutorials'}
                                </Badge>
                              </div>
                              <ul className="space-y-2.5">
                                {resumeData.analysis.tutorials[skillName].map((url: string, j: number) => (
                                  <li key={j} className="flex items-start gap-2.5">
                                    <span className="text-gray-400 mt-1.5">•</span>
                                    <a
                                      href={url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="pt-2 text-sm text-blue-700 hover:text-blue-900 hover:underline transition-all flex-1 break-all"
                                    >
                                      {url}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  )}

                  {/* Empty State */}
                  {(!resumeData.analysis?.missingSkills || resumeData.analysis.missingSkills.length === 0) &&
                    (!resumeData.analysis?.tutorials || Object.keys(resumeData.analysis.tutorials).length === 0) && (
                      <div className="text-center py-8 md:py-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6">
                          <BookOpen className="h-10 w-10 md:h-12 md:w-12 text-blue-600" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">No Skills Development Data</h3>
                        <p className="text-sm md:text-base text-gray-600 mb-6 max-w-md mx-auto">
                          Upload your resume to get personalized skill development recommendations and tutorials.
                        </p>
                        <Link to="/resume-upload">
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm md:text-base px-8 py-6 h-auto">
                            <Upload className="h-5 w-5 mr-2" />
                            Upload Resume
                          </Button>
                        </Link>
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>
          )}



          {activeSection === "ai-chat" && (
            <div className="space-y-4 md:space-y-6 max-w-full">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2 text-base md:text-lg text-white">
                    <Brain className="h-5 w-5 md:h-6 md:w-6" />
                    <span>AI Chat Counselor</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 md:p-4 rounded-lg">
                      <h3 className="font-semibold text-base md:text-lg mb-2">Ask Your Career Questions</h3>
                      <p className="text-xs md:text-sm text-gray-600 mb-4">
                        Get personalized career advice powered by AI. Ask about career paths, skills development,
                        job market trends, or any career-related questions you have.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 bg-white min-h-48 md:min-h-64 max-h-64 md:max-h-96 overflow-y-auto">
                        <div className="text-center text-gray-500 py-6 md:py-8">
                          <Brain className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-3 text-purple-400" />
                          <p className="text-sm md:text-base">Start a conversation with your AI Career Counselor</p>
                          <p className="text-xs md:text-sm">Ask questions about careers, skills, or job opportunities</p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Input
                          placeholder="Type your career question here..."
                          className="flex-1 text-sm md:text-base min-w-0"
                        />
                        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-sm md:text-base px-3 md:px-4 flex-shrink-0">
                          Send
                        </Button>
                      </div>

                      <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="text-xs md:text-sm">
                          "What career suits my personality?"
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs md:text-sm">
                          "How can I improve my skills?"
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs md:text-sm">
                          "What's the job market like?"
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "settings" && <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2 text-base md:text-lg text-white">
                <Settings className="h-5 w-5 md:h-6 md:w-6" />
                <span>Account Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-6">
                {/* Profile Information */}
                <div className="space-y-4">
                  <h3 className="text-sm md:text-base font-semibold">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs md:text-sm font-medium text-gray-700">Full Name</label>
                      <Input value={userData.name} className="mt-1 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs md:text-sm font-medium text-gray-700">Email</label>
                      <Input value={userData.email} className="mt-1 text-sm" />
                    </div>
                  </div>
                </div>

                {/* Password Change */}
                {/* Password Change */}
                <div className="space-y-4">
                  <h3 className="text-sm md:text-base font-semibold">Change Password</h3>
                  <form onSubmit={handleChangePassword} className="space-y-3">
                    <div>
                      <label className="text-xs md:text-sm font-medium text-gray-700">Current Password</label>
                      {/* 🔹 Controlled input */}
                      <Input
                        type="password"
                        placeholder="Enter current password"
                        className="mt-1 text-sm"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs md:text-sm font-medium text-gray-700">New Password</label>
                      {/* 🔹 Controlled input */}
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        className="mt-1 text-sm"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs md:text-sm font-medium text-gray-700">Confirm New Password</label>
                      {/* 🔹 Controlled input */}
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        className="mt-1 text-sm"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>

                    {/* 🔹 Message display */}
                    {message && (
                      <p
                        className={`text-sm ${message.includes("successfully")
                          ? "text-green-600"
                          : "text-red-600"
                          }`}
                      >
                        {message}
                      </p>
                    )}

                    {/* 🔹 Submit button */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-sm w-full"
                    >
                      {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </div>

              </div>
            </CardContent>
          </Card>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
