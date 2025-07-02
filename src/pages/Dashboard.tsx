
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Star, 
  TrendingUp, 
  BookOpen, 
  MessageSquare, 
  Send,
  ArrowLeft,
  User,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "assistant", content: "Hello! I'm your AI career counselor. How can I help you today?" }
  ]);

  // Mock data based on analysis
  const careerMatches = [
    {
      title: "UX/UI Designer",
      match: 94,
      description: "Design user experiences for digital products",
      skills: ["Design Thinking", "Prototyping", "User Research"],
      salary: "$65,000 - $95,000"
    },
    {
      title: "Product Manager",
      match: 87,
      description: "Lead product development and strategy",
      skills: ["Project Management", "Analytics", "Communication"],
      salary: "$75,000 - $120,000"
    },
    {
      title: "Data Analyst",
      match: 82,
      description: "Analyze data to drive business decisions",
      skills: ["SQL", "Python", "Data Visualization"],
      salary: "$55,000 - $85,000"
    }
  ];

  const skillGaps = [
    {
      skill: "Advanced Figma",
      importance: "High",
      courses: ["Figma Masterclass on Udemy", "Design Systems with Figma"]
    },
    {
      skill: "User Research Methods",
      importance: "Medium",
      courses: ["Google UX Certificate", "Nielsen Norman Group Courses"]
    },
    {
      skill: "JavaScript Basics",
      importance: "Medium",
      courses: ["freeCodeCamp", "JavaScript30 by Wes Bos"]
    }
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    setChatHistory([
      ...chatHistory,
      { role: "user", content: chatMessage },
      { 
        role: "assistant", 
        content: "Based on your profile, I'd recommend focusing on building a strong portfolio with 3-5 diverse projects. Start with the Figma course to strengthen your design skills, then work on a personal project that showcases your UX process from research to final design." 
      }
    ]);
    setChatMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              CareerCompass
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium">Alex Student</span>
              </div>
              <Link to="/">
                <Button variant="ghost">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Career Fitness Score */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Career Fitness Score</h2>
                <p className="text-purple-100">Based on your personality and skills analysis</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold">87</div>
                <div className="text-lg text-purple-100">out of 100</div>
              </div>
            </div>
            <Progress value={87} className="mt-4 bg-white/20" />
          </CardContent>
        </Card>

        <Tabs defaultValue="matches" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="matches" className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>Career Matches</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Skill Gaps</span>
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center space-x-2">
              <GraduationCap className="h-4 w-4" />
              <span>Learning Path</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>AI Counselor</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-6">
            <div className="grid gap-6">
              {careerMatches.map((career, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{career.title}</h3>
                        <p className="text-gray-600">{career.description}</p>
                        <p className="text-sm font-semibold text-green-600 mt-1">{career.salary}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">{career.match}%</div>
                        <div className="text-sm text-gray-500">match</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {career.skills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-purple-100 text-purple-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        View Job Opportunities
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid gap-4">
              {skillGaps.map((gap, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{gap.skill}</h3>
                        <Badge variant={gap.importance === "High" ? "destructive" : "secondary"} className="mt-1">
                          {gap.importance} Priority
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">Recommended Courses:</p>
                      <ul className="space-y-1">
                        {gap.courses.map((course, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <BookOpen className="h-3 w-3 mr-2 text-purple-500" />
                            {course}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Your Personalized Learning Path</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <div>
                      <h4 className="font-semibold">Master Design Fundamentals</h4>
                      <p className="text-sm text-gray-600">Complete Figma Masterclass (4 weeks)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <div>
                      <h4 className="font-semibold">Build Portfolio Projects</h4>
                      <p className="text-sm text-gray-600">Create 3 diverse UX case studies (6 weeks)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-lg">
                    <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <div>
                      <h4 className="font-semibold">Learn User Research</h4>
                      <p className="text-sm text-gray-600">Google UX Certificate Program (3 months)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>AI Career Counselor</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
                  {chatHistory.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === "user" 
                          ? "bg-purple-600 text-white" 
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
                    placeholder="Ask me about your career path..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} className="bg-gradient-to-r from-purple-600 to-blue-600">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
