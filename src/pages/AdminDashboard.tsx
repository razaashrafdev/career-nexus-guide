
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, BookOpen, FileText, Target, TrendingUp, Award, ArrowRight, CheckCircle, AlertCircle, Upload, RefreshCw, Brain, BarChart3, Settings, LogOut, Home } from "lucide-react";
import { Link } from "react-router-dom";
import ResponsiveSidebar from "@/components/ResponsiveSidebar";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");

  // Mock user data - in real app this would come from backend
  const [userData, setUserData] = useState({
    name: "Admin User",
    email: "admin@example.com",
    assessmentCompleted: true,
    // Change this to test different states
    resumeUploaded: true,
    // Change this to test different states
    personalityType: "INTJ",
    careerScore: 85,
    recommendedCareers: ["Software Engineer", "Data Scientist"],
    skills: ["JavaScript", "Python", "Data Analysis"]
  });

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "users", label: "Manage Users", icon: User },
    { id: "assessments", label: "Assessments", icon: Brain },
    { id: "resumes", label: "Resumes", icon: FileText },
    { id: "careers", label: "Careers", icon: Target },
    { id: "skills", label: "Skills", icon: BookOpen },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const getGuidanceMessage = () => {
    return {
      type: "success",
      title: "Admin Dashboard Overview",
      message: "Welcome to the admin dashboard. Manage users, assessments, and platform settings.",
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
    };
  };

  const guidance = getGuidanceMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex">
      <ResponsiveSidebar>
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            CareerCompass Admin
          </Link>
        </div>

        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {sidebarItems.map(item => (
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
                  <span className="text-left">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
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
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your platform</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
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
                        <p className="text-purple-100 text-sm">User Engagement</p>
                        <p className="text-3xl font-bold">75%</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-100" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Assessment Completion</p>
                        <p className="text-3xl font-bold text-green-600">80%</p>
                      </div>
                      <Award className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">New Users</p>
                        <p className="text-3xl font-bold text-blue-600">450</p>
                      </div>
                      <User className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Resumes Uploaded</p>
                        <p className="text-3xl font-bold text-indigo-600">600</p>
                      </div>
                      <Upload className="h-8 w-8 text-indigo-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* User Progress Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>User Profile</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{userData.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{userData.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Personality Type:</span>
                      <Badge variant="secondary">{userData.personalityType}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5" />
                      <span>Career Score</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Overall Score</span>
                        <span className="font-medium">{userData.careerScore}%</span>
                      </div>
                      <Progress value={userData.careerScore} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm text-gray-600">Recommended Careers:</span>
                      <div className="flex flex-wrap gap-2">
                        {userData.recommendedCareers.map((career, index) => (
                          <Badge key={index} variant="outline">{career}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      {userData.assessmentCompleted ? (
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      ) : (
                        <AlertCircle className="h-8 w-8 text-yellow-500" />
                      )}
                      <div>
                        <h3 className="font-semibold">Personality Assessment</h3>
                        <p className="text-gray-600">
                          {userData.assessmentCompleted 
                            ? "Completed successfully" 
                            : "Not yet completed"}
                        </p>
                        {!userData.assessmentCompleted && (
                          <Button className="mt-2" size="sm">
                            Take Assessment
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      {userData.resumeUploaded ? (
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      ) : (
                        <AlertCircle className="h-8 w-8 text-yellow-500" />
                      )}
                      <div>
                        <h3 className="font-semibold">Resume Upload</h3>
                        <p className="text-gray-600">
                          {userData.resumeUploaded 
                            ? "Resume uploaded and analyzed" 
                            : "No resume uploaded yet"}
                        </p>
                        {!userData.resumeUploaded && (
                          <Button className="mt-2" size="sm" variant="outline">
                            Upload Resume
                            <Upload className="ml-2 h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Skills Overview */}
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Skills & Competencies</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userData.skills.map((skill, index) => (
                      <Badge key={index} className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button className="mt-4" variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Skills Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "users" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Manage Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p>User management content goes here.</p>
              </CardContent>
            </Card>
          )}

          {activeSection === "assessments" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Assessment management content goes here.</p>
              </CardContent>
            </Card>
          )}

          {activeSection === "resumes" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Resumes</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Resume management content goes here.</p>
              </CardContent>
            </Card>
          )}

          {activeSection === "careers" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Careers</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Career management content goes here.</p>
              </CardContent>
            </Card>
          )}

          {activeSection === "skills" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Skill management content goes here.</p>
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

export default AdminDashboard;
