import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { authService } from "@/services/authService";
import { useState } from "react";

import { TOKEN_KEY, API_ENDPOINTS } from "@/config/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { User, BookOpen, FileText, Target, TrendingUp, Award, ArrowRight, CheckCircle, AlertCircle, Upload, RefreshCw, Brain, BarChart3, Settings, LogOut, Home, Eye, MessageSquare, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ResponsiveSidebar from "@/components/ResponsiveSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { XCircle, Lightbulb } from "lucide-react";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DashboardAIChat } from "@/components/DashboardAIChat";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";


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
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Password visibility state
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });

  // Feedback form state (frontend-only; wire to your API when ready)
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"suggestion" | "error">("suggestion");
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [GetFeedbackList, GetMyFeedbackList] = useState<any[]>([]);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [myFeedbackList, setMyFeedbackList] = useState<{ message: string; type: "suggestion" | "error"; submittedAt: string }[]>([

  const [deleteFeedbackIndex, setDeleteFeedbackIndex] = useState<number | null>(null);


  // Mock user data - in real app this would come from backend
  const [userData, setUserData] = useState({
    name: user.fullName || "User",
    email: user.email || "",
    assessmentCompleted: false,
    resumeUploaded: true,
    personalityType: "",
    personalityDescription: "",
    careerScore: 0,
    resumeMatchScore: null as number | null,
    assessmentCareerScore: null as number | null,
    recommendedCareers: [] as string[],
    skills: [] as string[],
  });
  // Career Score = average of resume + assessment when both exist; else whichever is available
  const displayCareerScore = (() => {
    const r = userData.resumeMatchScore ?? null;
    const a = userData.assessmentCareerScore ?? null;
    if (r != null && a != null) return Math.round((r + a) / 2);
    return r ?? a ?? 0;
  })();
  const [resumeData, setResumeData] = useState<ResumeData>({});
  const [careers, setCareers] = useState<CareerUIModel[]>([]);



  useEffect(() => {
    if (location.state?.from === "resume") {
      const data = location.state;
      const resumeScore = data.analysis?.matchPercentage ?? data.analysis?.careerCount ?? null;
      setUserData((prev) => ({
        ...prev,
        resumeUploaded: true,
        recommendedCareers: data.analysis?.careerRecommendation || [],
        resumeMatchScore: resumeScore != null ? Number(resumeScore) : prev.resumeMatchScore,
      }));
    }
  }, [location.state]);


  // FETCH LATEST RESUME FROM BACKEND
  useEffect(() => {
    const fetchLatestResume = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.GET_LATEST_RESUME, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
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
          resumeMatchScore: data.analysis?.matchPercentage ?? prev.resumeMatchScore,
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



  const handleLogout = (closeSidebar: () => void) => {
    closeSidebar();
    logout();
    navigate("/login");
  };
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirm password do not match!",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    const result = await authService.changePassword(oldPassword, newPassword);

    setIsLoading(false);

    if (result.error) {
      toast({
        title: "Password Change Failed",
        description: result.error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Password Changed Successfully",
        description: "Your password has been updated successfully.",
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };
const fetchMyFeedback = async () => {      // <-- add this after state
  try {
    setLoadingFeedback(true);

    const token = localStorage.getItem("token");
    const res = await fetch(API_ENDPOINTS.GET_FEEDBACK_BYUSERID, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Fetching:", API_ENDPOINTS.GET_FEEDBACK_BYUSERID);
console.log("Token:", token);
    const result = await res.json();
    if (result.isSuccess) {
      const mapped = result.data.map((item: any) => ({
        id: item.id,
        message: item.message,
        type: item.feedbackType,
        submittedAt: item.submittedAt,
      }));
      setMyFeedbackList(mapped);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoadingFeedback(false);
  }
};
useEffect(() => {
  if (activeSection === "feedback") fetchMyFeedback();
}, [activeSection]);
  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = feedbackMessage?.trim();
    if (!trimmed) {
      toast({
        title: "Message required",
        description: "Please enter your feedback before submitting.",
        variant: "destructive",
      });
      return;
    }
    const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
    if (wordCount > 50) {
      toast({
        title: "Word limit exceeded",
        description: "Feedback must be 50 words or less.",
        variant: "destructive",
      });
      return;
    }
    setFeedbackSubmitting(true);
    const result = await authService.submitFeedback(trimmed, feedbackType);
    if (result.error) {
      toast({
        title: "Submission failed",
        description: result.error.message,
        variant: "destructive",
      });
      setFeedbackSubmitting(false);
      return;
    }
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback. We will review it shortly.",
    });
    setMyFeedbackList((prev) => [
      ...prev,
      { message: trimmed, type: feedbackType, submittedAt: new Date().toISOString() },
    ]);
    setFeedbackMessage("");
    setFeedbackMessage("")
    await fetchMyFeedback(); 
    setFeedbackType("suggestion");
    setFeedbackSubmitting(false);
  };

  useEffect(() => {
    const fetchPersonalityResult = async () => {
      try {
        const response = await fetch(
          API_ENDPOINTS.GET_USER_RESULT,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("career_nexus_token")}`,
            },
          }
        );

        if (!response.ok) return;

        const result = await response.json();

        if (result.isSuccess && result.data) {
          setUserData(prev => ({
            ...prev,
            assessmentCompleted: result.data.isCompleted,
            personalityType: result.data.personalityType,
            personalityDescription: result.data.description,
            assessmentCareerScore: result.data.careerScore ?? prev.assessmentCareerScore,
          }));
        }
      } catch (error) {
        console.log("Personality result error:", error);
      }
    };

    fetchPersonalityResult();
  }, []);

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
    id: "feedback",
    label: "Feedback",
    icon: MessageSquare
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
        icon: <CheckCircle className="h-6 w-6 text-white" />
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
    <div className="min-h-[100dvh] bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex overflow-x-hidden w-full">
      <ResponsiveSidebar>
        {({ closeSidebar }) => (
          <>
            <div className="p-4 md:p-6 border-b border-gray-200">
              <Link to="/" className="flex items-center" onClick={closeSidebar}>
                <img src="/header-icon.png" alt="Career Nexus Logo" className="h-8 w-auto md:h-10 md:w-auto" />
              </Link>
            </div>

            <nav className="p-2 md:p-4 flex-1 overflow-y-auto">
              <ul className="space-y-1 md:space-y-2">
                {sidebarItems.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveSection(item.id);
                        closeSidebar();
                      }}
                      className={`w-full flex items-center space-x-2 md:space-x-3 px-2 md:px-3 py-2 rounded-lg transition-colors text-sm md:text-base ${activeSection === item.id
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      <item.icon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                      <span className="text-left truncate min-w-0">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-2 md:p-4 border-t border-gray-200 mt-auto">
              <Button onClick={() => handleLogout(closeSidebar)} variant="outline" size="sm" className="w-full justify-start text-red-600 hover:text-red-700 text-xs md:text-sm">
                <LogOut className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span>Logout</span>
              </Button>
            </div>
          </>
        )}
      </ResponsiveSidebar>

      {/* Main Content - lg:ml-64 matches ResponsiveSidebar (visible from lg) */}
      <div className="flex-1 flex flex-col min-h-screen w-full min-w-0 lg:ml-64">
        {/* Header - pr-14 leaves space for mobile menu button */}
        <header className="fixed top-0 right-0 left-0 lg:left-64 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-3 pl-4 pr-14 sm:pl-5 sm:pr-16 lg:py-4 lg:px-6 lg:pr-6 z-40">
          <div className="flex justify-between items-center gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 truncate">User Dashboard</h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 truncate">Welcome back, {userData.name}</p>
            </div>
          </div>
        </header>

        {/* Content - mt accounts for fixed header height on mobile/desktop */}
        <div className="flex-1 w-full min-w-0 p-3 sm:p-4 md:p-5 lg:p-6 overflow-x-hidden mt-[72px] sm:mt-[76px] lg:mt-[82px]">
          {activeSection === "overview" && <div className="space-y-5 md:space-y-7 max-w-full">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Completion Rate Card */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 text-white overflow-hidden relative group hover:shadow-2xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
                <CardContent className="p-4 sm:p-5 md:p-7 relative z-10">
                  <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-purple-100 text-xs md:text-sm font-medium mb-1 sm:mb-2 uppercase tracking-wide">Completion Rate</p>
                      <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 truncate">
                        {userData.assessmentCompleted && userData.resumeUploaded ? "100%" : userData.assessmentCompleted || userData.resumeUploaded ? "50%" : "0%"}
                      </p>
                      <p className="text-purple-100 text-xs font-light">Profile Progress</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 sm:p-3 group-hover:bg-white/30 transition-colors flex-shrink-0">
                      <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                    </div>
                  </div>
                  {(userData.assessmentCompleted || userData.resumeUploaded) && (
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/20">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-purple-100">On Track</span>
                        <span className="font-semibold">
                          {userData.assessmentCompleted && userData.resumeUploaded ? "Complete" : "In Progress"}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Career Score Card - average of resume + assessment */}
              <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-4 sm:p-5 md:p-7">
                  <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-500 text-xs md:text-sm font-medium mb-1 sm:mb-2 uppercase tracking-wide">Career Score</p>
                      <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-1 truncate">{displayCareerScore}%</p>
                      <p className="text-gray-400 text-xs font-light break-words">Match Compatibility (Resume + Assessment avg)</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-2 sm:p-3 group-hover:bg-blue-100 transition-colors flex-shrink-0">
                      <Award className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-blue-600" />
                    </div>
                  </div>
                  {displayCareerScore > 0 && (
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-gray-500">Match Quality</span>
                        <span className="text-blue-600 font-semibold">
                          {displayCareerScore >= 80 ? "Excellent" : displayCareerScore >= 60 ? "Good" : "Fair"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${displayCareerScore}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Personality Type Card */}
              <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-4 sm:p-5 md:p-7">
                  <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-500 text-xs md:text-sm font-medium mb-1 sm:mb-2 uppercase tracking-wide">Personality Type</p>
                      <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-1 truncate">
                        {userData.personalityType || "N/A"}
                      </p>
                      <p className="text-gray-400 text-xs font-light">Assessment Result</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-2 sm:p-3 group-hover:bg-blue-100 transition-colors flex-shrink-0">
                      <Brain className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-blue-600" />
                    </div>
                  </div>
                  {userData.assessmentCompleted && (
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Status</span>
                        <span className="text-blue-600 font-semibold">Completed</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recommendations Card */}
              <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-4 sm:p-5 md:p-7">
                  <div className="flex items-start justify-between mb-3 sm:mb-4 gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="text-gray-500 text-xs md:text-sm font-medium mb-1 sm:mb-2 uppercase tracking-wide">Recommendations</p>
                      <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-1 truncate">{userData.recommendedCareers?.length || 0}</p>
                      <p className="text-gray-400 text-xs font-light">Career Matches</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-2 sm:p-3 group-hover:bg-blue-100 transition-colors flex-shrink-0">
                      <Target className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-blue-600" />
                    </div>
                  </div>
                  {userData.resumeUploaded && (
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-gray-500">Based on Resume</span>
                        <span className="text-blue-600 font-semibold">
                          {userData.recommendedCareers?.length > 0 ? "Available" : "Pending"}
                        </span>
                      </div>
                      {userData.recommendedCareers?.length > 0 && (
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-blue-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((userData.recommendedCareers.length / 10) * 100, 100)}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Guidance Message & Progress Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7">
              {/* Guidance Message */}
              <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardHeader className="border-b border-gray-100 pb-3 sm:pb-4 px-4 sm:px-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <div className="h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">{guidance.icon}</div>
                    </div>
                    <CardTitle className="text-sm sm:text-base md:text-lg font-semibold">{guidance.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-5 md:p-7">
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">{guidance.message}</p>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-3">
                    {!userData.assessmentCompleted && <Link to="/personality-test" className="w-full sm:w-auto">
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 w-full sm:w-auto text-xs sm:text-sm md:text-base">
                        <Brain className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Take Assessment Test
                      </Button>
                    </Link>}
                    {userData.assessmentCompleted && <Link to="/personality-test" className="w-full sm:w-auto">
                      <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm md:text-base">
                        <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Retake Assessment Test
                      </Button>
                    </Link>}
                    {!userData.resumeUploaded && <Link to="/resume-upload" className="w-full sm:w-auto">
                      <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm md:text-base">
                        <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Upload Resume
                      </Button>
                    </Link>}
                    {userData.resumeUploaded && <Link to="/resume-upload" className="w-full sm:w-auto">
                      <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm md:text-base">
                        <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Update Resume
                      </Button>
                    </Link>}
                  </div>
                </CardContent>
              </Card>

              {/* Progress Overview */}
              <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardHeader className="border-b border-gray-100 pb-3 sm:pb-4 px-4 sm:px-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg flex-shrink-0">
                      <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <CardTitle className="text-sm sm:text-base md:text-lg font-semibold">Your Progress</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-5 md:p-7">
                  <div className="space-y-4 sm:space-y-5">
                    <div>
                      <div className="flex flex-row items-center justify-between gap-2 mb-2 sm:mb-3">
                        <span className="text-xs sm:text-sm font-medium text-gray-700">Personality Assessment</span>
                        <Badge variant={userData.assessmentCompleted ? "default" : "secondary"} className="bg-transparent border border-blue-600 text-black text-xs w-fit hover:bg-white shrink-0">
                          {userData.assessmentCompleted ? "Completed" : "Pending"}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 sm:h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${userData.assessmentCompleted ? "bg-blue-600" : "bg-gray-300"}`}
                          style={{ width: `${userData.assessmentCompleted ? 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-row items-center justify-between gap-2 mb-2 sm:mb-3">
                        <span className="text-xs sm:text-sm font-medium text-gray-700">Resume Upload</span>
                        <Badge variant={userData.resumeUploaded ? "default" : "secondary"} className="bg-transparent border border-blue-600 text-black text-xs w-fit hover:bg-white shrink-0">
                          {userData.resumeUploaded ? "Uploaded" : "Pending"}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 sm:h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${userData.resumeUploaded ? "bg-blue-600" : "bg-gray-300"}`}
                          style={{ width: `${userData.resumeUploaded ? 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>}

          {/* Other sections remain the same but add responsive padding and text sizes */}

          {activeSection === "personality" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg py-3 px-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2 text-base md:text-lg font-semibold text-white gap-2">
                    <Brain className="h-5 w-5 md:h-6 md:w-6" />
                    Personality Assessment
                  </CardTitle>
                  {userData.assessmentCompleted && (
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      Completed
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4 md:p-6">
                {userData.assessmentCompleted ? (
                  <div className="space-y-6">
                    {/* Personality Type Section */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 rounded-t-xl px-4 sm:px-6 py-4">
                        <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2.5">
                          <Brain className="h-5 w-5 text-purple-600 flex-shrink-0" />
                          <span className="break-words">Your Personality Type</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-6 shadow-md">
                          <p className="text-sm uppercase tracking-wide text-purple-200 mb-2">
                            Assessment Result
                          </p>
                          <h2 className="text-3xl md:text-4xl font-bold">
                            {userData.personalityType}
                          </h2>
                        </div>
                      </CardContent>
                    </div>

                    {/* Personality Insights Section */}
                    {userData.personalityDescription && (
                      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 rounded-t-xl px-4 sm:px-6 py-4">
                          <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2.5">
                            <BarChart3 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                            Personality Insights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6">
                          <p className="text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                            {userData.personalityDescription}
                          </p>
                        </CardContent>
                      </div>
                    )}

                    {/* Career Score Section - average of resume + assessment */}
                    {displayCareerScore > 0 && (
                      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-green-200 rounded-t-xl px-4 sm:px-6 py-4">
                          <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2.5 flex-wrap">
                            <Award className="h-5 w-5 text-blue-600 flex-shrink-0" />
                            Career Match Score
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6">
                          <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-xs sm:text-sm text-gray-600 mb-2 break-words">Your career compatibility score (average of resume + assessment)</p>
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                                  <Progress value={displayCareerScore} className="flex-1 h-3" />
                                  <span className="text-2xl font-bold text-blue-600">{displayCareerScore}%</span>
                                </div>
                              </div>
                            </div>

                            {/* Explanation */}
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                Your Career Match Score is calculated by analyzing how well your personality traits, skills, and experience align with recommended career paths. We compare your assessment results and resume against career requirements to determine your compatibility percentage.
                              </p>
                              <ul className="text-sm text-gray-600 space-y-1.5 ml-4 list-disc">
                                <li>Personality traits from your assessment</li>
                                <li>Skills and experience from your resume</li>
                                <li>Career requirements and job market trends</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-1">
                      <Link to="/personality-test" className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-sm md:text-base h-12 font-medium shadow-sm hover:shadow-md transition-all duration-200">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Retake Assessment
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  // No Assessment Completed
                  <div className="text-center py-8 md:py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-6">
                      <Brain className="h-10 w-10 md:h-12 md:w-12 text-purple-600" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Take Your Personality Assessment</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-6 max-w-md mx-auto">
                      Discover your personality type and get AI-powered career guidance based on your unique traits and preferences.
                    </p>
                    <Link to="/personality-test">
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-sm md:text-base px-8 py-6 h-auto">
                        <Brain className="h-5 w-5 mr-2" />
                        Start Assessment
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          )}


          {activeSection === "resume" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg py-3 px-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2 text-base md:text-lg font-semibold text-white gap-2">
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
                      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 rounded-t-xl px-4 sm:px-6 py-4">
                          <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2.5 flex-wrap">
                            <BarChart3 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                            Skills Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 space-y-6 sm:space-y-7">
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
                            <div className="p-4 items-center rounded-lg border-l-4 shadow-sm hover:shadow-md transition-all duration-300 border-blue-300 pb-4">
                              <div className="flex items-center gap-2.5 mb-4">
                                <FileText className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
                                <h4 className="text-base font-semibold">
                                  Extracted Skills
                                </h4>
                              </div>
                              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                These skills are taken from resume using exact keyword matches:
                              </p>
                              <div className="flex flex-wrap gap-2.5">
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
                      <div className="bg-white border border-green-200 rounded-xl shadow-sm overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-green-50 to-amber-50 border-b border-green-200 rounded-t-xl px-4 sm:px-6 py-4">
                          <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2.5 flex-wrap">
                            <Lightbulb className="h-5 w-5 flex-shrink-0" />
                            AI-Powered Suggestions
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6">
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
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg py-3 px-4">
                <div className="flex flex-row items-center justify-between gap-3 sm:gap-4">
                  <CardTitle className="flex items-center space-x-2 text-base md:text-lg font-semibold text-white gap-2">
                    <Target className="h-5 w-5 md:h-6 md:w-6" />
                    Career Recommendations
                  </CardTitle>
                  {careers.length > 0 && (
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs sm:text-sm whitespace-nowrap">
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
                      <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 rounded-t-xl px-4 sm:px-6 py-4">
                          <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 flex flex-wrap items-center gap-2 sm:gap-2.5">
                            <Target className="h-5 w-5 text-blue-600 flex-shrink-0" />
                            <span className="break-words">{career.careerName}</span>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 ml-auto shrink-0">
                              {career.jobs.length} {career.jobs.length === 1 ? 'Job' : 'Jobs'}
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6">
                          <div className="space-y-4">
                            {career.jobs.map((job, j) => (
                              <div key={j} className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                  <div className="flex-1 min-w-0 w-full sm:w-auto">
                                    <h3 className="text-base font-semibold text-gray-900 mb-2 break-words">{job.title}</h3>
                                    <div className="space-y-1">
                                      <p className="text-sm text-gray-600 flex flex-wrap items-center gap-2">
                                        <span className="font-medium">Company:</span> <span className="break-words">{job.company}</span>
                                      </p>
                                      <p className="text-sm text-gray-600 flex flex-wrap items-center gap-2">
                                        <span className="font-medium">Location:</span> <span className="break-words">{job.location}</span>
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
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md flex-shrink-0 w-full sm:w-auto"
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
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg py-3 px-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2 text-base md:text-lg font-semibold text-white gap-2">
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
                    <div className="p-4 items-center rounded-lg border-l-4 shadow-sm hover:shadow-md transition-all duration-300 border-orange-300 pb-2">
                      <div className="flex items-center gap-2.5 mb-3 ">
                        <XCircle className="h-4.5 w-4.5 text-orange-600" />
                        <h4 className="text-base font-semibold text-orange-700">
                          Missing Skills
                        </h4>
                      </div>

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
                    </div>
                  )}

                  {/* Tutorials Section */}
                  {resumeData.analysis?.tutorials && Object.keys(resumeData.analysis.tutorials).length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 rounded-t-xl px-4 sm:px-6 py-4">
                        <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 flex flex-wrap items-center gap-2 sm:gap-2.5">
                          <BookOpen className="h-5 w-5 text-blue-600 flex-shrink-0" />
                          <span className="break-words">Tutorials to Improve Your Skills</span>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 sm:ml-auto shrink-0">
                            {Object.keys(resumeData.analysis.tutorials).length} {Object.keys(resumeData.analysis.tutorials).length === 1 ? 'Skill' : 'Skills'}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6">
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
                                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 ml-auto hidden md:inline-flex">
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
            <DashboardAIChat
              user={user}
              userData={{ ...userData, careerScore: displayCareerScore }}
              resumeData={resumeData}
              careers={careers}
            />
          )}

          {activeSection === "feedback" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm w-full max-w-full overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg py-3 px-3 sm:py-3 sm:px-4 md:py-4 md:px-5">
                <CardTitle className="flex items-center space-x-2 text-sm sm:text-base md:text-lg font-semibold text-white gap-2">
                  <MessageSquare className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 flex-shrink-0" />
                  <span className="break-words">Feedback</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <form onSubmit={handleFeedbackSubmit} className="space-y-3 sm:space-y-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="feedback-type" className="text-xs sm:text-sm">Type</Label>
                    <select
                      id="feedback-type"
                      value={feedbackType}
                      onChange={(e) => setFeedbackType(e.target.value as "suggestion" | "error")}
                      className="w-full min-h-[44px] sm:min-h-0 rounded-md border border-gray-300 bg-white px-3 py-2.5 sm:py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 touch-manipulation"
                    >
                      <option value="suggestion">Suggestion</option>
                      <option value="error">Report an error</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="feedback-message" className="text-xs sm:text-sm">Your feedback</Label>
                    <Textarea
                      id="feedback-message"
                      placeholder={
                        feedbackType === "error"
                          ? "Describe the error you encountered..."
                          : "Share your suggestion or idea..."
                      }
                      value={feedbackMessage}
                      onChange={(e) => {
                        const v = e.target.value;
                        const words = v.trim().split(/\s+/).filter(Boolean);
                        if (words.length > 50) {
                          setFeedbackMessage(words.slice(0, 50).join(" "));
                        } else {
                          setFeedbackMessage(v);
                        }
                      }}
                      rows={5}
                      className="resize-none text-sm min-h-[120px] sm:min-h-[100px] w-full max-w-full"
                      required
                    />
                    <p className="text-right text-xs text-gray-500">
                      Max 50 words {feedbackMessage.trim() ? `(${feedbackMessage.trim().split(/\s+/).filter(Boolean).length}/50)` : ""}
                    </p>
                  </div>
                  <Button
                    type="submit"
                    disabled={feedbackSubmitting || !feedbackMessage.trim() || feedbackMessage.trim().split(/\s+/).filter(Boolean).length > 50}
                    className="w-full sm:w-auto min-h-[44px] sm:min-h-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 touch-manipulation"
                  >
                    {feedbackSubmitting ? "Submitting..." : "Submit feedback"}
                  </Button>
                </form>
               {loadingFeedback && <p className="text-sm text-gray-500 mt-4">Loading feedback...</p>}
                {myFeedbackList.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Your submitted feedback</h3>
                    <div className="space-y-3 max-h-[320px] overflow-y-auto">

                      {myFeedbackList.slice().reverse().map((item, index) => (
                        <div key={`${item.submittedAt}-${index}`} className="relative rounded-xl border-2 border-gray-200 bg-white overflow-visible">
                          {/* Top-right: date + badge (badge extends beyond corner) */}
                          <div className="SubmitFeedbackflex justify-between mb-3 border p-3 rounded-lg">

                            <span
                              className={`rounded-lg px-3 py-1 text-white text-xs font-medium whitespace-nowrap shadow ${item.type === "error" ? "bg-red-600" : "bg-blue-600"}`}
                            >
                              {item.type === "error" ? "Error" : "Suggestion"}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-gray-600 text-xs shrink-0">
                                {new Date(item.submittedAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                              </span>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="p-1.5 h-auto text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                                onClick={() => setDeleteFeedbackIndex(originalIndex)}
                                title="Delete feedback"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {/* Para: prominent rounded box in center/lower area */}
                          <div className="mx-3 rounded-xl border border-gray-200 bg-gray-50/80 p-3 min-h-[50px]">
                            <p className="text-gray-700 text-sm whitespace-pre-wrap break-words text-left">
                              {item.message}
                            </p>
                          </div>
                          <div className="h-[1px] mt-3 mb-3 bg-gray-200 w-full"></div>
                        </div>
                      ); })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeSection === "settings" && <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg py-3 px-4">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center space-x-2 text-base md:text-lg font-semibold text-white gap-2">
                  <Settings className="h-5 w-5 md:h-6 md:w-6" />
                  <span>Account Settings</span>
                </CardTitle>
              </div>
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
                      <div className="relative mt-1">
                        <Input
                          type={showPasswords.old ? "text" : "password"}
                          placeholder="Enter current password"
                          className="text-sm pr-10 [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({ ...showPasswords, old: !showPasswords.old })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs md:text-sm font-medium text-gray-700">New Password</label>
                      {/* 🔹 Controlled input */}
                      <div className="relative mt-1">
                        <Input
                          type={showPasswords.new ? "text" : "password"}
                          placeholder="Enter new password"
                          className="text-sm pr-10 [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs md:text-sm font-medium text-gray-700">Confirm New Password</label>
                      {/* 🔹 Controlled input */}
                      <div className="relative mt-1">
                        <Input
                          type={showPasswords.confirm ? "text" : "password"}
                          placeholder="Confirm new password"
                          className="text-sm pr-10 [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

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

      <AlertDialog open={deleteFeedbackIndex !== null} onOpenChange={(open) => !open && setDeleteFeedbackIndex(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete feedback?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove this feedback from your list. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                if (deleteFeedbackIndex !== null) {
                  setMyFeedbackList(prev => prev.filter((_, i) => i !== deleteFeedbackIndex));
                  setDeleteFeedbackIndex(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
