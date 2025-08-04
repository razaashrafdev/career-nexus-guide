import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, BookOpen, FileText, Target, TrendingUp, Award, ArrowRight, CheckCircle, AlertCircle, Upload, RefreshCw, Brain, BarChart3, Settings, LogOut, Home, Search, Eye, Trash2, Edit, Download, Plus, Key } from "lucide-react";
import { Link } from "react-router-dom";
import ResponsiveSidebar from "@/components/ResponsiveSidebar";
import { ViewUserModal } from "@/components/modals/ViewUserModal";
import { ViewAssessmentModal } from "@/components/modals/ViewAssessmentModal";
import { EditCareerModal } from "@/components/modals/EditCareerModal";
import { EditSkillModal } from "@/components/modals/EditSkillModal";
import { AddUserModal } from "@/components/modals/AddUserModal";
import { AddSkillModal } from "@/components/modals/AddSkillModal";
import { AddCareerModal } from "@/components/modals/AddCareerModal";
import { useToast } from "@/hooks/use-toast";
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [apiSettings, setApiSettings] = useState({
    indeedApiKey: "",
    chatgptApiKey: "",
    deepseekApiKey: "",
    activeAiModel: "chatgpt"
  });

  // Modal states
  const [viewUserModal, setViewUserModal] = useState({
    isOpen: false,
    user: null as any
  });
  const [viewAssessmentModal, setViewAssessmentModal] = useState({
    isOpen: false,
    assessment: null as any
  });
  const [editCareerModal, setEditCareerModal] = useState({
    isOpen: false,
    career: null as any
  });
  const [editSkillModal, setEditSkillModal] = useState({
    isOpen: false,
    skill: null as any
  });
  const [addUserModal, setAddUserModal] = useState(false);
  const [addSkillModal, setAddSkillModal] = useState(false);
  const [addCareerModal, setAddCareerModal] = useState(false);
  const {
    toast
  } = useToast();

  // Mock data for different sections
  const [mockUsers, setMockUsers] = useState([{
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    joined: "2024-01-15",
    assessmentCompleted: true,
    resumeUploaded: true
  }, {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Active",
    joined: "2024-01-20",
    assessmentCompleted: true,
    resumeUploaded: false
  }, {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    status: "Inactive",
    joined: "2024-02-01",
    assessmentCompleted: false,
    resumeUploaded: true
  }, {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    status: "Active",
    joined: "2024-02-10",
    assessmentCompleted: true,
    resumeUploaded: true
  }]);
  const [mockAssessments, setMockAssessments] = useState([{
    id: 1,
    userName: "John Doe",
    personalityType: "INTJ",
    completedDate: "2024-01-16",
    score: 85
  }, {
    id: 2,
    userName: "Jane Smith",
    personalityType: "ENFP",
    completedDate: "2024-01-22",
    score: 92
  }, {
    id: 3,
    userName: "Sarah Wilson",
    personalityType: "ISFJ",
    completedDate: "2024-02-12",
    score: 78
  }]);
  const mockResumes = [{
    id: 1,
    userName: "John Doe",
    fileName: "john_resume.pdf",
    status: "Analyzed",
    uploadDate: "2024-01-16",
    skills: ["JavaScript", "React", "Node.js"]
  }, {
    id: 2,
    userName: "Mike Johnson",
    fileName: "mike_resume.pdf",
    status: "Pending",
    uploadDate: "2024-02-02",
    skills: []
  }, {
    id: 3,
    userName: "Sarah Wilson",
    fileName: "sarah_resume.pdf",
    status: "Analyzed",
    uploadDate: "2024-02-12",
    skills: ["Python", "Data Analysis", "Machine Learning"]
  }];
  const [mockCareers, setMockCareers] = useState([{
    id: 1,
    name: "Software Engineer",
    description: "Develop and maintain software applications",
    requiredTraits: ["INTJ", "INTP"],
    skills: ["Programming", "Problem Solving"]
  }, {
    id: 2,
    name: "Data Scientist",
    description: "Analyze data to extract business insights",
    requiredTraits: ["INTJ", "ISTJ"],
    skills: ["Statistics", "Python", "Machine Learning"]
  }, {
    id: 3,
    name: "UX Designer",
    description: "Design user interfaces and experiences",
    requiredTraits: ["ENFP", "INFP"],
    skills: ["Design", "User Research", "Prototyping"]
  }]);
  const [mockSkills, setMockSkills] = useState([{
    id: 1,
    name: "JavaScript",
    category: "Technical",
    linkedCareers: ["Software Engineer", "Web Developer"]
  }, {
    id: 2,
    name: "Communication",
    category: "Soft Skills",
    linkedCareers: ["Project Manager", "Sales"]
  }, {
    id: 3,
    name: "Data Analysis",
    category: "Technical",
    linkedCareers: ["Data Scientist", "Business Analyst"]
  }, {
    id: 4,
    name: "Leadership",
    category: "Soft Skills",
    linkedCareers: ["Manager", "Team Lead"]
  }]);
  const sidebarItems = [{
    id: "overview",
    label: "Overview",
    icon: Home
  }, {
    id: "users",
    label: "Manage Users",
    icon: User
  }, {
    id: "assessments",
    label: "Assessments",
    icon: Brain
  }, {
    id: "resumes",
    label: "Resumes",
    icon: FileText
  }, {
    id: "careers",
    label: "Careers",
    icon: Target
  }, {
    id: "skills",
    label: "Skills",
    icon: BookOpen
  }, {
    id: "settings",
    label: "Settings",
    icon: Settings
  }];
  const filteredUsers = mockUsers.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleUserStatusToggle = (userId: number, newStatus: boolean) => {
    setMockUsers(prevUsers => prevUsers.map(user => user.id === userId ? {
      ...user,
      status: newStatus ? "Active" : "Inactive"
    } : user));
  };
  const handleViewUser = (userId: number) => {
    const user = mockUsers.find(u => u.id === userId);
    setViewUserModal({
      isOpen: true,
      user
    });
  };
  const handleViewAssessment = (assessmentId: number) => {
    const assessment = mockAssessments.find(a => a.id === assessmentId);
    setViewAssessmentModal({
      isOpen: true,
      assessment
    });
  };
  const handleEditCareer = (careerId: number) => {
    const career = mockCareers.find(c => c.id === careerId);
    setEditCareerModal({
      isOpen: true,
      career
    });
  };
  const handleEditSkill = (skillId: number) => {
    const skill = mockSkills.find(s => s.id === skillId);
    setEditSkillModal({
      isOpen: true,
      skill
    });
  };
  const handleAddUser = (userData: any) => {
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      joined: new Date().toISOString().split('T')[0],
      assessmentCompleted: false,
      resumeUploaded: false
    };
    setMockUsers(prev => [...prev, newUser]);
    toast({
      title: "User Added",
      description: `${userData.name} has been successfully added to the system.`
    });
  };
  const handleAddSkill = (skillData: any) => {
    const newSkill = {
      id: mockSkills.length + 1,
      ...skillData,
      linkedCareers: []
    };
    setMockSkills(prev => [...prev, newSkill]);
    toast({
      title: "Skill Added",
      description: `${skillData.name} has been successfully added to the skills database.`
    });
  };
  const handleAddCareer = (careerData: any) => {
    const newCareer = {
      id: mockCareers.length + 1,
      ...careerData
    };
    setMockCareers(prev => [...prev, newCareer]);
    toast({
      title: "Career Added",
      description: `${careerData.name} has been successfully added to the careers database.`
    });
  };
  const handleSaveCareer = (updatedCareer: any) => {
    setMockCareers(prev => prev.map(career => career.id === updatedCareer.id ? updatedCareer : career));
    toast({
      title: "Career Updated",
      description: `${updatedCareer.name} has been successfully updated.`
    });
  };
  const handleSaveSkill = (updatedSkill: any) => {
    setMockSkills(prev => prev.map(skill => skill.id === updatedSkill.id ? updatedSkill : skill));
    toast({
      title: "Skill Updated",
      description: `${updatedSkill.name} has been successfully updated.`
    });
  };
  return <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex">
      <ResponsiveSidebar>
        <div className="p-4 md:p-6 border-b border-gray-200">
          <Link to="/" className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            CareerCompass Admin
          </Link>
        </div>

        <nav className="p-2 md:p-4 flex-1 overflow-y-auto">
          <ul className="space-y-1 md:space-y-2">
            {sidebarItems.map(item => <li key={item.id}>
                <button onClick={() => setActiveSection(item.id)} className={`w-full flex items-center space-x-2 md:space-x-3 px-2 md:px-3 py-2 rounded-lg transition-colors text-sm md:text-base ${activeSection === item.id ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <item.icon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <span className="text-left truncate md:block hidden">{item.label}</span>
                </button>
              </li>)}
          </ul>
        </nav>

        <div className="p-2 md:p-4 border-t border-gray-200">
          <Link to="/">
            <Button variant="outline" size="sm" className="w-full justify-start mb-2 text-xs md:text-sm">
              <Home className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Back to Home</span>
              <span className="md:hidden">Home</span>
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="w-full justify-start text-red-600 hover:text-red-700 text-xs md:text-sm">
            <LogOut className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            <span className="hidden md:inline">Logout</span>
            <span className="md:hidden">Exit</span>
          </Button>
        </div>
      </ResponsiveSidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-3 md:p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-sm md:text-base text-gray-600">Manage your platform</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-3 md:p-6">
          {activeSection === "overview" && <div className="space-y-4 md:space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-xs md:text-sm">Total Users</p>
                        <p className="text-xl md:text-3xl font-bold">1,247</p>
                      </div>
                      <User className="h-6 w-6 md:h-8 md:w-8 text-purple-100" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-xs md:text-sm">Assessments Completed</p>
                        <p className="text-xl md:text-3xl font-bold text-green-600">892</p>
                      </div>
                      <Brain className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-xs md:text-sm">Resumes Uploaded</p>
                        <p className="text-xl md:text-3xl font-bold text-blue-600">634</p>
                      </div>
                      <Upload className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-xs md:text-sm">Career Matches</p>
                        <p className="text-xl md:text-3xl font-bold text-indigo-600">1,456</p>
                      </div>
                      <Target className="h-6 w-6 md:h-8 md:w-8 text-indigo-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity & Trends */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-base md:text-lg">Most Recommended Careers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm md:text-base">Software Engineer</span>
                        <Badge className="text-xs">234 matches</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm md:text-base">Data Scientist</span>
                        <Badge className="text-xs">189 matches</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm md:text-base">UX Designer</span>
                        <Badge className="text-xs">156 matches</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm md:text-base">Business Analyst</span>
                        <Badge className="text-xs">142 matches</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-base md:text-lg">Top Skills Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm md:text-base">JavaScript</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={85} className="w-12 md:w-20 h-2" />
                          <span className="text-xs md:text-sm">85%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm md:text-base">Python</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={72} className="w-12 md:w-20 h-2" />
                          <span className="text-xs md:text-sm">72%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm md:text-base">Communication</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={68} className="w-12 md:w-20 h-2" />
                          <span className="text-xs md:text-sm">68%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>}

          {activeSection === "users" && <div className="space-y-4 md:space-y-6">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle className="text-base md:text-lg">Manage Users</CardTitle>
                    <div className="flex items-center space-x-4 w-full sm:w-auto">
                      
                      <div className="relative flex-1 sm:flex-none">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input placeholder="Search users..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-full sm:w-64 text-sm" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 md:p-3 text-xs md:text-sm">Name</th>
                          <th className="text-left p-2 md:p-3 text-xs md:text-sm">Email</th>
                          <th className="text-left p-2 md:p-3 text-xs md:text-sm">Status</th>
                          <th className="text-left p-2 md:p-3 text-xs md:text-sm">Joined</th>
                          <th className="text-left p-2 md:p-3 text-xs md:text-sm">Assessment</th>
                          <th className="text-left p-2 md:p-3 text-xs md:text-sm">Resume</th>
                          <th className="text-left p-2 md:p-3 text-xs md:text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map(user => <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="p-2 md:p-3 font-medium text-xs md:text-sm">{user.name}</td>
                            <td className="p-2 md:p-3 text-gray-600 text-xs md:text-sm">{user.email}</td>
                             <td className="p-2 md:p-3">
                               <div className="flex items-center space-x-2">
                                 <Switch checked={user.status === "Active"} onCheckedChange={checked => handleUserStatusToggle(user.id, checked)} className="data-[state=checked]:bg-green-600" />
                                 <span className="text-xs text-gray-600">
                                   {user.status === "Active" ? "Active" : "Inactive"}
                                 </span>
                               </div>
                             </td>
                            <td className="p-2 md:p-3 text-gray-600 text-xs md:text-sm">{user.joined}</td>
                            <td className="p-2 md:p-3">
                              {user.assessmentCompleted ? <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500" /> : <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />}
                            </td>
                            <td className="p-2 md:p-3">
                              {user.resumeUploaded ? <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500" /> : <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />}
                            </td>
                            <td className="p-2 md:p-3">
                               <div className="flex space-x-1 md:space-x-2">
                                 <Button size="sm" variant="outline" className="p-1 md:p-2" onClick={() => handleViewUser(user.id)}>
                                   <Eye className="h-3 w-3 md:h-4 md:w-4" />
                                 </Button>
                                <Button size="sm" variant="outline" className="text-red-600 p-1 md:p-2">
                                  <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>}

          {activeSection === "assessments" && <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Assessment Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">User</th>
                          <th className="text-left p-3">Personality Type</th>
                          <th className="text-left p-3">Score</th>
                          <th className="text-left p-3">Completed Date</th>
                          <th className="text-left p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockAssessments.map(assessment => <tr key={assessment.id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{assessment.userName}</td>
                            <td className="p-3">
                              <Badge variant="outline">{assessment.personalityType}</Badge>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <Progress value={assessment.score} className="w-16 h-2" />
                                <span className="text-sm">{assessment.score}%</span>
                              </div>
                            </td>
                            <td className="p-3 text-gray-600">{assessment.completedDate}</td>
                            <td className="p-3">
                              <Button size="sm" variant="outline" onClick={() => handleViewAssessment(assessment.id)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>}

          {activeSection === "resumes" && <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Resume Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">User</th>
                          <th className="text-left p-3">File Name</th>
                          <th className="text-left p-3">Status</th>
                          <th className="text-left p-3">Upload Date</th>
                          <th className="text-left p-3">Extracted Skills</th>
                          <th className="text-left p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockResumes.map(resume => <tr key={resume.id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{resume.userName}</td>
                            <td className="p-3 text-gray-600">{resume.fileName}</td>
                            <td className="p-3">
                              <Badge variant={resume.status === "Analyzed" ? "default" : "secondary"}>
                                {resume.status}
                              </Badge>
                            </td>
                            <td className="p-3 text-gray-600">{resume.uploadDate}</td>
                            <td className="p-3">
                              <div className="flex flex-wrap gap-1">
                                {resume.skills.slice(0, 3).map((skill, index) => <Badge key={index} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>)}
                                {resume.skills.length > 3 && <Badge variant="outline" className="text-xs">
                                    +{resume.skills.length - 3}
                                  </Badge>}
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <RefreshCw className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>}

          {activeSection === "careers" && <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Career Management</CardTitle>
                    <Button onClick={() => setAddCareerModal(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Career
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {mockCareers.map(career => <Card key={career.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{career.name}</h3>
                            <p className="text-gray-600 mb-3">{career.description}</p>
                            <div className="space-y-2">
                              <div>
                                <span className="text-sm font-medium">Required Traits: </span>
                                {career.requiredTraits.map((trait, index) => <Badge key={index} variant="outline" className="mr-1">
                                    {trait}
                                  </Badge>)}
                              </div>
                              <div>
                                <span className="text-sm font-medium">Skills: </span>
                                {career.skills.map((skill, index) => <Badge key={index} variant="secondary" className="mr-1">
                                    {skill}
                                  </Badge>)}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditCareer(career.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>)}
                  </div>
                </CardContent>
              </Card>
            </div>}

          {activeSection === "skills" && <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Skills Management</CardTitle>
                    <Button onClick={() => setAddSkillModal(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Skill
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Skill Name</th>
                          <th className="text-left p-3">Category</th>
                          <th className="text-left p-3">Linked Careers</th>
                          <th className="text-left p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockSkills.map(skill => <tr key={skill.id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{skill.name}</td>
                            <td className="p-3">
                              <Badge variant={skill.category === "Technical" ? "default" : "secondary"}>
                                {skill.category}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <div className="flex flex-wrap gap-1">
                                {skill.linkedCareers.map((career, index) => <Badge key={index} variant="outline" className="text-xs">
                                    {career}
                                  </Badge>)}
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" onClick={() => handleEditSkill(skill.id)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>}

          {activeSection === "settings" && <div className="space-y-4 md:space-y-6">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
                    <Key className="h-4 w-4 md:h-5 md:w-5" />
                    <span>API Keys Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
                  <div className="grid gap-4">
                    <div>
                      <label className="text-xs md:text-sm font-medium mb-2 block">Indeed API Key</label>
                      <Input type="password" placeholder="Enter Indeed API key for job matching" value={apiSettings.indeedApiKey} onChange={e => setApiSettings({
                    ...apiSettings,
                    indeedApiKey: e.target.value
                  })} className="text-sm" />
                    </div>
                    <div>
                      <label className="text-xs md:text-sm font-medium mb-2 block">ChatGPT API Key</label>
                      <Input type="password" placeholder="Enter OpenAI API key for ChatGPT" value={apiSettings.chatgptApiKey} onChange={e => setApiSettings({
                    ...apiSettings,
                    chatgptApiKey: e.target.value
                  })} className="text-sm" />
                    </div>
                    <div>
                      <label className="text-xs md:text-sm font-medium mb-2 block">DeepSeek API Key</label>
                      <Input type="password" placeholder="Enter DeepSeek API key" value={apiSettings.deepseekApiKey} onChange={e => setApiSettings({
                    ...apiSettings,
                    deepseekApiKey: e.target.value
                  })} className="text-sm" />
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <label className="text-xs md:text-sm font-medium mb-2 block">Active AI Model for Chat Counselor</label>
                    <Select value={apiSettings.activeAiModel} onValueChange={value => setApiSettings({
                  ...apiSettings,
                  activeAiModel: value
                })}>
                      <SelectTrigger className="w-full text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chatgpt">ChatGPT</SelectItem>
                        <SelectItem value="deepseek">DeepSeek</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full text-sm md:text-base">
                    Save API Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">Platform Settings</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-sm md:text-base">Email Notifications</span>
                        <p className="text-xs md:text-sm text-gray-600">Send email updates to users</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-sm md:text-base">Assessment Questions</span>
                        <p className="text-xs md:text-sm text-gray-600">Number of questions in personality test</p>
                      </div>
                      <Select defaultValue="50">
                        <SelectTrigger className="w-16 md:w-20 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                          <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-sm md:text-base">Resume Auto-Analysis</span>
                        <p className="text-xs md:text-sm text-gray-600">Automatically analyze uploaded resumes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>}
        </div>
      </div>

      {/* Modals */}
      <ViewUserModal isOpen={viewUserModal.isOpen} onClose={() => setViewUserModal({
      isOpen: false,
      user: null
    })} user={viewUserModal.user} onStatusToggle={handleUserStatusToggle} />

      <ViewAssessmentModal isOpen={viewAssessmentModal.isOpen} onClose={() => setViewAssessmentModal({
      isOpen: false,
      assessment: null
    })} assessment={viewAssessmentModal.assessment} />

      <EditCareerModal isOpen={editCareerModal.isOpen} onClose={() => setEditCareerModal({
      isOpen: false,
      career: null
    })} career={editCareerModal.career} onSave={handleSaveCareer} />

      <EditSkillModal isOpen={editSkillModal.isOpen} onClose={() => setEditSkillModal({
      isOpen: false,
      skill: null
    })} skill={editSkillModal.skill} onSave={handleSaveSkill} />

      <AddUserModal isOpen={addUserModal} onClose={() => setAddUserModal(false)} onAdd={handleAddUser} />

      <AddSkillModal isOpen={addSkillModal} onClose={() => setAddSkillModal(false)} onAdd={handleAddSkill} />

      <AddCareerModal isOpen={addCareerModal} onClose={() => setAddCareerModal(false)} onAdd={handleAddCareer} />
    </div>;
};
export default AdminDashboard;