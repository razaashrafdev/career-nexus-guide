
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Clock, 
  Target, 
  FileText, 
  TrendingUp, 
  MessageSquare, 
  Calendar, 
  Download, 
  Settings, 
  LogOut,
  ChevronRight,
  Star,
  BookOpen,
  Award,
  Send,
  RefreshCw,
  Upload,
  Eye,
  Edit,
  CheckCircle,
  AlertCircle,
  Brain,
  Briefcase
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { type: "ai", message: "Hello! I'm your AI Career Coach. How can I help you today?" }
  ]);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [showAssessmentPrompt, setShowAssessmentPrompt] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    email: "alex@email.com",
    personalityType: "INTJ",
    personalitySummary: "You are analytical and strategic, perfect for Data Science + Tech Leadership roles",
    resumeUploaded: true,
    resumeScore: 78,
    careerFitnessScore: 65,
    skillsHave: ["Python", "JavaScript", "HTML", "CSS", "Git"],
    skillsNeed: ["React", "SQL", "Machine Learning", "Docker"],
    topCareers: [
      { title: "Data Scientist", match: 89, description: "Perfect match for your analytical skills" },
      { title: "Software Engineer", match: 85, description: "Great fit for your technical background" },
      { title: "Product Manager", match: 78, description: "Good match for strategic thinking" }
    ],
    suggestedJobs: [
      { title: "Junior Data Scientist", company: "TechCorp", location: "Remote", match: 89, salary: "$75,000" },
      { title: "Frontend Developer", company: "StartupInc", location: "San Francisco", match: 85, salary: "$80,000" },
      { title: "Business Analyst", company: "ConsultingCo", location: "New York", match: 78, salary: "$70,000" }
    ]
  };

  // Check if user came from assessment test or resume upload
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const from = urlParams.get('from');
    
    if (from === 'assessment' && !userData.resumeUploaded) {
      setShowResumePrompt(true);
    } else if (from === 'resume' && !userData.personalityType) {
      setShowAssessmentPrompt(true);
    }
  }, [location, userData.resumeUploaded, userData.personalityType]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    setChatHistory(prev => [...prev, { type: "user", message: chatMessage }]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your INTJ personality, I'd recommend focusing on roles that allow strategic thinking and independent work. Data Science is an excellent match!",
        "To improve your career fitness score, I suggest learning SQL and React. These are highly demanded skills in your target field.",
        "Your analytical skills are strong! Consider exploring Machine Learning courses to boost your Data Science prospects.",
        "For communication skills improvement, try joining professional networks or taking public speaking courses like Toastmasters."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatHistory(prev => [...prev, { type: "ai", message: randomResponse }]);
    }, 1000);
    
    setChatMessage("");
  };

  const handleRetakeTest = () => {
    toast({
      title: "Redirecting to Assessment",
      description: "Taking you to the personality test...",
    });
    navigate("/personality-test");
  };

  const handleUpdateResume = () => {
    toast({
      title: "Redirecting to Resume Upload",
      description: "Taking you to update your resume...",
    });
    navigate("/resume-upload");
  };

  const handleDownloadResume = () => {
    toast({
      title: "Download Started",
      description: "Your resume is being downloaded...",
    });
  };

  const handleDownloadReport = () => {
    toast({
      title: "Generating Report",
      description: "Your career report is being generated...",
    });
  };

  const handleApplyJob = (jobTitle: string) => {
    toast({
      title: "Application Started",
      description: `Redirecting to apply for ${jobTitle}...`,
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const sidebarItems = [
    { id: "overview", label: "Dashboard Overview", icon: Target },
    { id: "resume", label: "Resume Analysis", icon: FileText },
    { id: "career-score", label: "Career Fitness", icon: TrendingUp },
    { id: "jobs", label: "Job Recommendations", icon: Briefcase },
    { id: "skills", label: "Skill Development", icon: BookOpen },
    { id: "coach", label: "AI Career Coach", icon: MessageSquare },
    { id: "progress", label: "Progress Tracker", icon: Calendar },
    { id: "downloads", label: "Downloads", icon: Download },
    { id: "settings", label: "Account Settings", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white/90 backdrop-blur-sm shadow-lg border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            CareerCompass
          </Link>
          <div className="flex items-center mt-4 space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
              {userData.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-700">{userData.name}</p>
              <p className="text-sm text-gray-500">{userData.email}</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
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
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start text-red-600 hover:text-red-700"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome back, {userData.name.split(' ')[0]}!</h1>
              <p className="text-gray-600 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Conditional Prompts */}
          {showResumePrompt && (
            <Card className="border-0 shadow-lg bg-blue-50 border-blue-200 mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Upload className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-blue-800">Complete Your Profile</h3>
                      <p className="text-blue-600">Upload your resume for better career counselling and personalized recommendations</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleUpdateResume} className="bg-blue-600 hover:bg-blue-700">
                      Upload Resume
                    </Button>
                    <Button variant="outline" onClick={() => setShowResumePrompt(false)}>
                      Later
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {showAssessmentPrompt && (
            <Card className="border-0 shadow-lg bg-purple-50 border-purple-200 mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Brain className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-semibold text-purple-800">Take Assessment Test</h3>
                      <p className="text-purple-600">Complete your personality assessment for better career counselling and matching</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleRetakeTest} className="bg-purple-600 hover:bg-purple-700">
                      Take Assessment
                    </Button>
                    <Button variant="outline" onClick={() => setShowAssessmentPrompt(false)}>
                      Later
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dynamic Content Based on Active Section */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Personality Type</p>
                        <p className="text-2xl font-bold">{userData.personalityType}</p>
                      </div>
                      <Brain className="h-8 w-8 text-purple-100" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Resume Score</p>
                        <p className="text-2xl font-bold text-green-600">{userData.resumeScore}/100</p>
                      </div>
                      <FileText className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Career Fitness</p>
                        <p className="text-2xl font-bold text-blue-600">{userData.careerFitnessScore}%</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button onClick={handleRetakeTest} className="bg-gradient-to-r from-purple-500 to-blue-500 h-12">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Retake Assessment Test
                    </Button>
                    <Button onClick={handleUpdateResume} variant="outline" className="h-12">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload/Update Resume
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Top Career Matches */}
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Top 3 Career Matches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.topCareers.map((career, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold">{career.title}</h3>
                          <p className="text-sm text-gray-600">{career.description}</p>
                        </div>
                        <div className="text-center">
                          <Badge variant="default" className="bg-green-500">{career.match}% Match</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "personality" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  Personality Test Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                  <div className="text-4xl font-bold text-purple-600 mb-2">{userData.personalityType}</div>
                  <p className="text-gray-700">{userData.personalitySummary}</p>
                </div>
                <div className="flex justify-center">
                  <Button onClick={handleRetakeTest} className="bg-gradient-to-r from-purple-500 to-blue-500">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retake Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "resume" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Resume Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">Resume Status</p>
                    <p className="text-sm text-gray-600">
                      {userData.resumeUploaded ? "✅ Resume uploaded" : "❌ No resume uploaded"}
                    </p>
                  </div>
                  <Badge variant={userData.resumeUploaded ? "default" : "secondary"}>
                    Score: {userData.resumeScore}/100
                  </Badge>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Extracted Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {userData.skillsHave.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={handleUpdateResume} variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Update Resume
                  </Button>
                  <Button onClick={handleDownloadResume}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "career-score" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Career Fitness Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{userData.careerFitnessScore}%</div>
                  <p className="text-gray-600 mb-4">Match with Data Scientist</p>
                  <Progress value={userData.careerFitnessScore} className="w-full max-w-md mx-auto" />
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    What's Missing?
                  </h4>
                  <p className="text-red-700">SQL and Machine Learning skills not found in your profile</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Suggestion
                  </h4>
                  <p className="text-green-700 mb-2">Learn SQL and Machine Learning to boost your score to 85%+</p>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Find Learning Resources
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "jobs" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Recommended Jobs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.suggestedJobs.map((job, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                        <p className="text-sm font-medium text-green-600">{job.salary}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="default" className="bg-blue-500">{job.match}% Match</Badge>
                        <Button 
                          size="sm" 
                          onClick={() => handleApplyJob(job.title)}
                          className="bg-gradient-to-r from-purple-500 to-blue-500"
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "skills" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Skill Development
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 text-green-600">Skills You Have:</h4>
                  <div className="flex flex-wrap gap-2">
                    {userData.skillsHave.map((skill, index) => (
                      <Badge key={index} variant="default" className="bg-green-500">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-orange-600">Skills You Need:</h4>
                  <div className="flex flex-wrap gap-2">
                    {userData.skillsNeed.map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-orange-500 text-orange-600">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Learning Resources:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h5 className="font-semibold mb-2">React Course</h5>
                      <p className="text-sm text-gray-600 mb-2">Complete React Developer Course - Coursera</p>
                      <Button size="sm" variant="outline">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Start Learning
                      </Button>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h5 className="font-semibold mb-2">SQL Crash Course</h5>
                      <p className="text-sm text-gray-600 mb-2">SQL for Data Science - YouTube</p>
                      <Button size="sm" variant="outline">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Watch Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "coach" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  AI Career Coach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    {chatHistory.map((chat, index) => (
                      <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          chat.type === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white border border-gray-200'
                        }`}>
                          {chat.message}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask me anything about your career..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "progress" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Progress Tracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <span>Personality test completed</span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <span>Resume uploaded</span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-500" />
                    <span>Career score improvement pending</span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-blue-500" />
                    <span>AI Coach used: 3 times</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "downloads" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="h-5 w-5 mr-2" />
                  Downloads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Resume File</h4>
                    <p className="text-sm text-gray-600 mb-4">Download your uploaded resume</p>
                    <Button onClick={handleDownloadResume} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Resume
                    </Button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Career Report</h4>
                    <p className="text-sm text-gray-600 mb-4">Comprehensive career analysis report (PDF)</p>
                    <Button onClick={handleDownloadReport} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "settings" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input defaultValue={userData.name} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <Input defaultValue={userData.email} />
                  </div>
                  <div className="flex space-x-4">
                    <Button>Save Changes</Button>
                    <Button variant="outline">Change Password</Button>
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
