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



const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

 const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock user data - in real app this would come from backend
  const [userData, setUserData] = useState({
    name: user?.fullName || "User",
    email: user?.email || "",
    assessmentCompleted: false,
    resumeUploaded: true,
    personalityType: "",
    careerScore: 0,
    recommendedCareers: [],
    skills: []
  });

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
          <Link to="/" className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            CareerCompass
          </Link>
        </div>

        <nav className="p-2 md:p-4 flex-1 overflow-y-auto">
          <ul className="space-y-1 md:space-y-2">
            {sidebarItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-2 md:space-x-3 px-2 md:px-3 py-2 rounded-lg transition-colors text-sm md:text-base ${
                    activeSection === item.id
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

        <div className="p-2 md:p-4 border-t border-gray-200">
          <Link to="/">
            <Button variant="outline" size="sm" className="w-full justify-start mb-2 text-xs md:text-sm">
              <Home className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              <span>Back to Home</span>
            </Button>
          </Link>
          <Button onClick={handleLogout} variant="outline" size="sm" className="w-full justify-start text-red-600 hover:text-red-700 text-xs md:text-sm">
            <LogOut className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            <span>Logout</span>
          </Button>
        </div>
      </ResponsiveSidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-3 md:p-6 ml-16 md:ml-0">
          <div className="flex justify-between items-center">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg md:text-2xl font-bold text-gray-800 truncate">Student Dashboard</h1>
              <p className="text-sm md:text-base text-gray-600 truncate">Welcome back, {userData.name}</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-3 md:p-6 ml-16 md:ml-0 overflow-x-hidden">
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
                        <p className="text-xl md:text-3xl font-bold text-green-600 truncate">{userData.careerScore}%</p>
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
                        <p className="text-xl md:text-3xl font-bold text-indigo-600 truncate">{userData.recommendedCareers.length}</p>
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

          {activeSection === "resume" && <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Resume Analysis</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                {userData.resumeUploaded ? <div className="space-y-4">
                    <p className="text-sm md:text-base">Resume uploaded and analyzed successfully!</p>
                    <Button variant="outline" className="text-sm md:text-base">
                      <Upload className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      Update Resume
                    </Button>
                  </div> : <div className="text-center py-6 md:py-8">
                    <FileText className="h-12 w-12 md:h-16 md:w-16 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-base md:text-lg font-semibold mb-2">Upload Your Resume</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-4">Upload your resume to get AI-powered analysis and career recommendations.</p>
                    <Link to="/resume-upload">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-sm md:text-base">
                        Upload Resume
                      </Button>
                    </Link>
                  </div>}
              </CardContent>
            </Card>}

          {activeSection === "careers" && <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Career Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="text-center py-6 md:py-8">
                  <Target className="h-12 w-12 md:h-16 md:w-16 text-green-500 mx-auto mb-4" />
                  <p className="text-sm md:text-base text-gray-600">Complete your assessment and upload your resume to see career recommendations.</p>
                </div>
              </CardContent>
            </Card>}

          {activeSection === "skills" && <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Skills Development</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="text-center py-6 md:py-8">
                  <BookOpen className="h-12 w-12 md:h-16 md:w-16 text-yellow-500 mx-auto mb-4" />
                  <p className="text-sm md:text-base text-gray-600">Skill recommendations will appear here after completing your assessment.</p>
                </div>
              </CardContent>
            </Card>}


          {activeSection === "ai-chat" && (
            <div className="space-y-4 md:space-y-6 max-w-full">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
                    <Brain className="h-4 w-4 md:h-5 md:w-5 text-purple-500" />
                    <span>AI Career Counselor</span>
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
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Account Settings</CardTitle>
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
        className={`text-sm ${
          message.includes("successfully")
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
