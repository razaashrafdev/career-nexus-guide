
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  User,
  FileText,
  Brain,
  Target,
  BookOpen,
  MessageSquare,
  Settings,
  Download,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  LogOut,
  Upload,
  RotateCcw,
  ExternalLink,
  Menu,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "assistant", content: "Hello! I'm your AI career counselor. How can I help you today?" }
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: User },
    { id: "personality", label: "Personality Test", icon: Brain },
    { id: "resume", label: "Resume Analysis", icon: FileText },
    { id: "fitness", label: "Career Fitness", icon: TrendingUp },
    { id: "jobs", label: "Job Matches", icon: Target },
    { id: "skills", label: "Skill Gaps", icon: BookOpen },
    { id: "coach", label: "AI Coach", icon: MessageSquare },
    { id: "progress", label: "Progress", icon: Calendar },
    { id: "downloads", label: "Downloads", icon: Download },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setChatHistory([
      ...chatHistory,
      { role: "user", content: chatMessage },
      { 
        role: "assistant", 
        content: "Based on your INTJ personality type and current skills, I'd recommend focusing on technical roles that combine creativity with logic. Consider starting with a React course to bridge your skill gap, then work on building a portfolio project." 
      }
    ]);
    setChatMessage("");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome back, Alex!</h1>
              <p className="text-gray-600">{currentDate}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Personality Type</p>
                      <p className="text-2xl font-bold">INTJ</p>
                    </div>
                    <Brain className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">Career Fitness</p>
                      <p className="text-2xl font-bold text-blue-600">87%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">Resume Score</p>
                      <p className="text-2xl font-bold text-green-600">78/100</p>
                    </div>
                    <FileText className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button onClick={() => setActiveSection("personality")} className="justify-start h-12">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Retake Personality Test
                  </Button>
                  <Button onClick={() => setActiveSection("resume")} variant="outline" className="justify-start h-12">
                    <Upload className="h-4 w-4 mr-2" />
                    Update Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "personality":
        return (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>Personality Test Result</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-purple-600 mb-2">INTJ</h3>
                    <p className="text-gray-700 text-lg">The Architect</p>
                    <p className="text-gray-600 mt-2">You are creative and logical, best suited for Design + Tech roles</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Top 3 Suggested Careers</h4>
                  <div className="space-y-3">
                    {["UX/UI Designer", "Product Manager", "Data Analyst"].map((career, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{career}</span>
                        <Badge variant="secondary">{94 - index * 5}% match</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake Personality Test
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case "resume":
        return (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Resume Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-green-600 font-medium">Resume Uploaded: Yes</span>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Extracted Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "JavaScript", "HTML/CSS", "MS Office", "Project Management"].map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Resume Score</span>
                    <span className="text-2xl font-bold text-blue-600">78/100</span>
                  </div>
                  <Progress value={78} className="mb-2" />
                  <p className="text-sm text-gray-600">Good foundation, but could use improvement in technical skills section</p>
                </div>

                <Button className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Update Resume
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case "fitness":
        return (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Career Fitness Score</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">87%</div>
                  <p className="text-gray-600">Match with Data Scientist</p>
                  <Progress value={87} className="mt-4" />
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">What's Missing?</h4>
                  <p className="text-red-700">SQL skills not found in your profile</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Suggestion</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-green-700">Learn SQL - Complete SQL Bootcamp</span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Udemy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "jobs":
        return (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Suggested Jobs & Career Paths</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Junior Web Developer", match: 92, location: "Remote", company: "TechCorp" },
                    { title: "UX Designer", match: 88, location: "San Francisco", company: "DesignLab" },
                    { title: "Data Analyst", match: 82, location: "New York", company: "DataCo" }
                  ].map((job, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-lg">{job.title}</h4>
                          <p className="text-gray-600">{job.company} • {job.location}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">{job.match}% match</Badge>
                      </div>
                      <Button size="sm" className="mt-2">Apply Later</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Skill Gap Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-3">Skills You Have</h4>
                    <div className="space-y-2">
                      {["Python", "HTML/CSS", "Project Management"].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-3">Skills You Need</h4>
                    <div className="space-y-2">
                      {["React", "SQL", "Node.js"].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-red-500" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Learning Links</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span>React Complete Course - Coursera</span>
                      <Button size="sm">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <span>SQL Crash Course - YouTube</span>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Watch
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "coach":
        return (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>AI Career Coach</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
                  {chatHistory.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === "user" 
                          ? "bg-blue-600 text-white" 
                          : "bg-white border border-gray-200"
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Ask: 'Which field is best for me?' or 'Show me Data Analyst roadmap'"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>Send</Button>
                </div>
                
                <div className="mt-4 text-sm text-gray-600">
                  <p>💡 Try asking:</p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>"Which field is best for me?"</li>
                    <li>"How can I improve communication skills?"</li>
                    <li>"Show me Data Analyst roadmap"</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "progress":
        return (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Progress Tracker</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Personality Test Completed</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Resume Uploaded</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Career Score Pending</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">AI Coach Used: 3 times</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "downloads":
        return (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Downloads</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-medium">Resume File</p>
                        <p className="text-sm text-gray-600">alex_resume.pdf</p>
                      </div>
                    </div>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-purple-500" />
                      <div>
                        <p className="font-medium">Career Report</p>
                        <p className="text-sm text-gray-600">PDF Format</p>
                      </div>
                    </div>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="font-medium">Skills Report</p>
                        <p className="text-sm text-gray-600">Detailed analysis</p>
                      </div>
                    </div>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Account Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input defaultValue="Alex Student" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <Input defaultValue="alex@example.com" />
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button>Save Changes</Button>
                  <Button variant="outline">Reset Password</Button>
                </div>
                
                <div className="pt-6 border-t">
                  <Button variant="destructive" className="w-full">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-xl transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CareerCompass
              </Link>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
