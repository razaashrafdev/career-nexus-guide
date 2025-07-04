
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  BookOpen, 
  FileText, 
  Target, 
  TrendingUp, 
  Award,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Upload,
  RefreshCw,
  Brain,
  BarChart3,
  Settings,
  LogOut,
  Home
} from "lucide-react";
import { Link } from "react-router-dom";
import ResponsiveSidebar from "@/components/ResponsiveSidebar";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  
  // Mock user data - in real app this would come from backend
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    assessmentCompleted: false, // Change this to test different states
    resumeUploaded: true, // Change this to test different states
    personalityType: "",
    careerScore: 0,
    recommendedCareers: [],
    skills: []
  });

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "personality", label: "Personality Assessment", icon: Brain },
    { id: "resume", label: "Resume Analysis", icon: FileText },
    { id: "careers", label: "Career Recommendations", icon: Target },
    { id: "skills", label: "Skills Development", icon: BookOpen },
    { id: "progress", label: "Progress Tracking", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const getGuidanceMessage = () => {
    const { assessmentCompleted, resumeUploaded } = userData;
    
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
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            CareerCompass
          </Link>
        </div>

        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 mt-auto">
          <Link to="/">
            <Button variant="outline" size="sm" className="w-full justify-start mb-2">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="w-full justify-start text-red-600 hover:text-red-700">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </ResponsiveSidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header - Reduced padding */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 md:ml-0 ml-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Student Dashboard</h1>
              <p className="text-gray-600">Welcome back, {userData.name}</p>
            </div>
          </div>
        </header>

        {/* Content - Reduced top padding */}
        <div className="flex-1 p-4 md:ml-0 ml-16">
          {activeSection === "overview" && (
            <div className="space-y-6">
              {/* Guidance Message */}
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {guidance.icon}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{guidance.title}</h3>
                      <p className="text-gray-600 mb-4">{guidance.message}</p>
                      <div className="flex flex-wrap gap-3">
                        {!userData.assessmentCompleted && (
                          <Link to="/personality-test">
                            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                              <Brain className="h-4 w-4 mr-2" />
                              Take Assessment Test
                            </Button>
                          </Link>
                        )}
                        {userData.assessmentCompleted && (
                          <Link to="/personality-test">
                            <Button variant="outline">
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Retake Assessment Test
                            </Button>
                          </Link>
                        )}
                        {!userData.resumeUploaded && (
                          <Link to="/resume-upload">
                            <Button variant="outline">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Resume
                            </Button>
                          </Link>
                        )}
                        {userData.resumeUploaded && (
                          <Link to="/resume-upload">
                            <Button variant="outline">
                              <FileText className="h-4 w-4 mr-2" />
                              Update Resume
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Completion Rate</p>
                        <p className="text-3xl font-bold">
                          {userData.assessmentCompleted && userData.resumeUploaded ? "100%" : 
                           userData.assessmentCompleted || userData.resumeUploaded ? "50%" : "0%"}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-100" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Career Score</p>
                        <p className="text-3xl font-bold text-green-600">{userData.careerScore}%</p>
                      </div>
                      <Award className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Personality Type</p>
                        <p className="text-3xl font-bold text-blue-600">
                          {userData.personalityType || "N/A"}
                        </p>
                      </div>
                      <User className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Recommendations</p>
                        <p className="text-3xl font-bold text-indigo-600">{userData.recommendedCareers.length}</p>
                      </div>
                      <Target className="h-8 w-8 text-indigo-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Overview */}
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Personality Assessment</span>
                        <Badge variant={userData.assessmentCompleted ? "default" : "secondary"}>
                          {userData.assessmentCompleted ? "Completed" : "Pending"}
                        </Badge>
                      </div>
                      <Progress value={userData.assessmentCompleted ? 100 : 0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Resume Upload</span>
                        <Badge variant={userData.resumeUploaded ? "default" : "secondary"}>
                          {userData.resumeUploaded ? "Uploaded" : "Pending"}
                        </Badge>
                      </div>
                      <Progress value={userData.resumeUploaded ? 100 : 0} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Other sections remain the same but add content */}
          {activeSection === "personality" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Personality Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                {userData.assessmentCompleted ? (
                  <div className="space-y-4">
                    <p>Your personality type: <strong>{userData.personalityType}</strong></p>
                    <p>Assessment completed successfully!</p>
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Retake Assessment
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Brain className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Take Your Personality Assessment</h3>
                    <p className="text-gray-600 mb-4">Discover your personality type and get personalized career recommendations.</p>
                    <Link to="/personality-test">
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
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
              <CardHeader>
                <CardTitle>Resume Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                {userData.resumeUploaded ? (
                  <div className="space-y-4">
                    <p>Resume uploaded and analyzed successfully!</p>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Update Resume
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
                    <p className="text-gray-600 mb-4">Upload your resume to get AI-powered analysis and career recommendations.</p>
                    <Link to="/resume-upload">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                        Upload Resume
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Add other sections with similar pattern */}
          {activeSection === "careers" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Career Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Target className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-600">Complete your assessment and upload your resume to see career recommendations.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "skills" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Skills Development</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BookOpen className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <p className="text-gray-600">Skill recommendations will appear here after completing your assessment.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "progress" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-16 w-16 text-indigo-500 mx-auto mb-4" />
                  <p className="text-gray-600">Your progress tracking will be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "settings" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>Email Notifications</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>Privacy Settings</span>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
