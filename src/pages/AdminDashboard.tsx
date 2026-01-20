import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, BookOpen, FileText, Target, TrendingUp, Award, ArrowRight, CheckCircle, AlertCircle, Upload, RefreshCw, Brain, BarChart3, Settings, LogOut, Home, Search, Eye, Trash2, Edit, Download, Plus, Key, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ResponsiveSidebar from "@/components/ResponsiveSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { ViewUserModal } from "@/components/modals/ViewUserModal";
import { ViewAssessmentModal } from "@/components/modals/ViewAssessmentModal";
import { EditCareerModal } from "@/components/modals/EditCareerModal";
import { EditSkillModal } from "@/components/modals/EditSkillModal";
import { AddUserModal } from "@/components/modals/AddUserModal";
import { AddSkillModal } from "@/components/modals/AddSkillModal";
import { AddCareerModal } from "@/components/modals/AddCareerModal";
import { useToast } from "@/hooks/use-toast";
import { adminService } from "@/services/adminService";
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [apiSettings, setApiSettings] = useState({
    indeedApiKey: "",
    chatgptApiKey: "",
    deepseekApiKey: "",
    activeAiModel: "chatgpt"
  });

  // Password change state
  const [passwordSettings, setPasswordSettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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

  // Real data from API
  const [loading, setLoading] = useState(false);
  const [overview, setOverview] = useState({
    TotalUsers: 0,
    AssessmentsCompleted: 0,
    ResumesUploaded: 0,
    CareerMatches: 0
  });
  const [users, setUsers] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [resumes, setResumes] = useState<any[]>([]);
  const [careers, setCareers] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [topCareers, setTopCareers] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
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
  const filteredUsers = users.filter(user => (user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || (user.email || "").toLowerCase().includes(searchTerm.toLowerCase()));

  // Fetch Overview Data
  useEffect(() => {
    if (activeSection === "overview") {
      fetchOverview();
      fetchTopCareers();
    }
  }, [activeSection]);

  // Fetch Users
  useEffect(() => {
    if (activeSection === "users") {
      fetchUsers();
    }
  }, [activeSection]);

  // Fetch Assessments
  useEffect(() => {
    if (activeSection === "assessments") {
      fetchAssessments();
    }
  }, [activeSection]);

  // Fetch Resumes
  useEffect(() => {
    if (activeSection === "resumes") {
      fetchResumes();
    }
  }, [activeSection]);

  // Fetch Careers
  useEffect(() => {
    if (activeSection === "careers") {
      fetchCareers();
    }
  }, [activeSection]);

  // Fetch Skills
  useEffect(() => {
    if (activeSection === "skills") {
      fetchSkills();
    }
  }, [activeSection]);

  // Fetch Settings
  useEffect(() => {
    if (activeSection === "settings") {
      fetchSettings();
    }
  }, [activeSection]);

  const fetchOverview = async () => {
    setLoading(true);
    const result = await adminService.getOverview();
    setLoading(false);
    if (result.success) {
      setOverview(result.success);
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
    }
  };

  const fetchTopCareers = async () => {
    const result = await adminService.getTopCareers();
    if (result.success) {
      setTopCareers(result.success);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    const result = await adminService.getUsers();
    setLoading(false);
    if (result.success) {
      setUsers(result.success);
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
    }
  };

  const fetchAssessments = async () => {
    setLoading(true);
    const result = await adminService.getAssessments();
    setLoading(false);
    if (result.success) {
      setAssessments(result.success);
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
    }
  };

  const fetchResumes = async () => {
    setLoading(true);
    const result = await adminService.getResumes();
    setLoading(false);
    if (result.success) {
      setResumes(result.success);
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
    }
  };

  const fetchCareers = async () => {
    setLoading(true);
    const result = await adminService.getCareers();
    setLoading(false);
    if (result.success) {
      setCareers(result.success);
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
    }
  };

  const fetchSkills = async () => {
    setLoading(true);
    const result = await adminService.getSkills();
    setLoading(false);
    if (result.success) {
      setSkills(result.success);
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
    }
  };

  const fetchSettings = async () => {
    setLoading(true);
    const result = await adminService.getSettings();
    setLoading(false);
    if (result.success) {
      setSettings(result.success);
      setApiSettings({
        indeedApiKey: result.success["IndeedApiKey"] || "",
        chatgptApiKey: result.success["ChatGPTApiKey"] || "",
        deepseekApiKey: result.success["DeepSeekApiKey"] || "",
        activeAiModel: result.success["ActiveAiModel"] || "chatgpt"
      });
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
    }
  };
  const handleUserStatusToggle = async (userId: number, newStatus: boolean) => {
    const result = await adminService.updateUserStatus(userId, newStatus);
    if (result.success) {
      setUsers(prevUsers => prevUsers.map(user => user.id === userId ? {
        ...user,
        status: newStatus ? "Active" : "Inactive"
      } : user));
      toast({
        title: "Success",
        description: "User status updated successfully."
      });
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
    }
  };

  const handleViewUser = async (userId: number) => {
    const result = await adminService.getUser(userId);
    if (result.success) {
      setViewUserModal({
        isOpen: true,
        user: result.success
      });
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
    }
  };

  const handleViewAssessment = async (assessmentId: number) => {
    const result = await adminService.getAssessment(assessmentId);
    if (result.success) {
      setViewAssessmentModal({
        isOpen: true,
        assessment: result.success
      });
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
    }
  };

  const handleEditCareer = (careerId: number) => {
    const career = careers.find(c => c.id === careerId);
    setEditCareerModal({
      isOpen: true,
      career
    });
  };

  const handleEditSkill = (skillId: number) => {
    const skill = skills.find(s => s.id === skillId);
    setEditSkillModal({
      isOpen: true,
      skill
    });
  };

  const handleAddUser = (userData: any) => {
    // Note: Add user functionality would need to be implemented in backend
    toast({
      title: "Info",
      description: "User creation functionality needs to be implemented."
    });
  };

  const handleAddSkill = async (skillData: any) => {
    const result = await adminService.createSkill({
      name: skillData.name,
      category: skillData.category,
      description: skillData.description || ""
    });
    if (result.success) {
      await fetchSkills();
      toast({
        title: "Skill Added",
        description: `${skillData.name} has been successfully added to the skills database.`
      });
      setAddSkillModal(false);
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
    }
  };

  const handleAddCareer = async (careerData: any) => {
    const result = await adminService.createCareer({
      name: careerData.name,
      description: careerData.description || "",
      requiredSkills: careerData.skills || [],
      personalityMatchs: careerData.requiredTraits || []
    });
    if (result.success) {
      await fetchCareers();
      toast({
        title: "Career Added",
        description: `${careerData.name} has been successfully added to the careers database.`
      });
      setAddCareerModal(false);
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
    }
  };

  const handleSaveCareer = async (updatedCareer: any) => {
    const result = await adminService.updateCareer(updatedCareer.id, {
      name: updatedCareer.name,
      description: updatedCareer.description || "",
      requiredSkills: updatedCareer.skills || [],
      personalityMatchs: updatedCareer.requiredTraits || []
    });
    if (result.success) {
      await fetchCareers();
      toast({
        title: "Career Updated",
        description: `${updatedCareer.name} has been successfully updated.`
      });
      setEditCareerModal({ isOpen: false, career: null });
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
    }
  };

  const handleSaveSkill = async (updatedSkill: any) => {
    const result = await adminService.updateSkill(updatedSkill.id, {
      name: updatedSkill.name,
      category: updatedSkill.category,
      description: updatedSkill.description || ""
    });
    if (result.success) {
      await fetchSkills();
      toast({
        title: "Skill Updated",
        description: `${updatedSkill.name} has been successfully updated.`
      });
      setEditSkillModal({ isOpen: false, skill: null });
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const result = await adminService.deleteUser(userId);
      if (result.success) {
        await fetchUsers();
        toast({
          title: "User Deleted",
          description: "User has been successfully deleted."
        });
      } else if (result.error) {
        toast({
          title: "Error",
          description: result.error.message,
          variant: "destructive"
        });
      }
    }
  };

  const handleDeleteCareer = async (careerId: number) => {
    if (window.confirm("Are you sure you want to delete this career?")) {
      const result = await adminService.deleteCareer(careerId);
      if (result.success) {
        await fetchCareers();
        toast({
          title: "Career Deleted",
          description: "Career has been successfully deleted."
        });
      } else if (result.error) {
        toast({
          title: "Error",
          description: result.error.message,
          variant: "destructive"
        });
      }
    }
  };

  const handleDeleteSkill = async (skillId: number) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      const result = await adminService.deleteSkill(skillId);
      if (result.success) {
        await fetchSkills();
        toast({
          title: "Skill Deleted",
          description: "Skill has been successfully deleted."
        });
      } else if (result.error) {
        toast({
          title: "Error",
          description: result.error.message,
          variant: "destructive"
        });
      }
    }
  };

  const handlePasswordChange = async () => {
    if (!passwordSettings.currentPassword || !passwordSettings.newPassword || !passwordSettings.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields.",
        variant: "destructive"
      });
      return;
    }

    if (passwordSettings.newPassword !== passwordSettings.confirmPassword) {
      toast({
        title: "Error", 
        description: "New password and confirm password do not match.",
        variant: "destructive"
      });
      return;
    }

    if (passwordSettings.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "New password must be at least 8 characters long.",
        variant: "destructive" 
      });
      return;
    }

    // Use authService for password change
    const { authService } = await import("@/services/authService");
    const result = await authService.changePassword(
      passwordSettings.currentPassword,
      passwordSettings.newPassword
    );

    if (result.success) {
      setPasswordSettings({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      toast({
        title: "Password Changed",
        description: "Your password has been successfully updated."
      });
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
    }
  };

  const handleSaveApiSettings = async () => {
    const updatedSettings: Record<string, string> = {
      ...settings,
      IndeedApiKey: apiSettings.indeedApiKey,
      ChatGPTApiKey: apiSettings.chatgptApiKey,
      DeepSeekApiKey: apiSettings.deepseekApiKey,
      ActiveAiModel: apiSettings.activeAiModel
    };

    const result = await adminService.updateSettings(updatedSettings);
    if (result.success) {
      toast({
        title: "Settings Saved",
        description: "API settings have been successfully updated."
      });
      await fetchSettings();
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex">
      <ResponsiveSidebar>
        <div className="p-4 md:p-6 border-b border-gray-200">
          <Link to="/" className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Career Nexus
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
          <Button onClick={handleLogout} variant="outline" size="sm" className="w-full justify-start text-red-600 hover:text-red-700 text-xs md:text-sm">
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
              <p className="text-sm md:text-base text-gray-600">Welcome, {user?.fullName || "Admin"}</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-3 md:p-6">
          {loading && (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            </div>
          )}
          {activeSection === "overview" && !loading && <div className="space-y-4 md:space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-xs md:text-sm">Total Users</p>
                        <p className="text-xl md:text-3xl font-bold">{overview.TotalUsers.toLocaleString()}</p>
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
                        <p className="text-xl md:text-3xl font-bold text-green-600">{overview.AssessmentsCompleted.toLocaleString()}</p>
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
                        <p className="text-xl md:text-3xl font-bold text-blue-600">{overview.ResumesUploaded.toLocaleString()}</p>
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
                        <p className="text-xl md:text-3xl font-bold text-indigo-600">{overview.CareerMatches.toLocaleString()}</p>
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
                      {topCareers.length > 0 ? (
                        topCareers.slice(0, 5).map((career: any, index: number) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm md:text-base">{career.CareerName || career.careerName}</span>
                            <Badge className="text-xs">{career.MatchCount || career.matchCount} matches</Badge>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No data available</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-base md:text-lg">Top Skills Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {skills.length > 0 ? (
                        skills.slice(0, 3).map((skill: any, index: number) => {
                          const usageCount = careers.filter((c: any) => 
                            (c.RequiredSkills || []).some((s: string) => s.includes(skill.Name || skill.name))
                          ).length;
                          const percentage = careers.length > 0 ? Math.round((usageCount / careers.length) * 100) : 0;
                          return (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-sm md:text-base">{skill.Name || skill.name}</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={percentage} className="w-12 md:w-20 h-2" />
                                <span className="text-xs md:text-sm">{percentage}%</span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-sm text-gray-500">No data available</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>}

          {activeSection === "users" && !loading && <div className="space-y-4 md:space-y-6">
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
                        {filteredUsers.length > 0 ? filteredUsers.map((user: any) => <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="p-2 md:p-3 font-medium text-xs md:text-sm">{user.name || user.fullName || "N/A"}</td>
                            <td className="p-2 md:p-3 text-gray-600 text-xs md:text-sm">{user.email || "N/A"}</td>
                             <td className="p-2 md:p-3">
                               <div className="flex items-center space-x-2">
                                 <Switch checked={user.status === "Active"} onCheckedChange={checked => handleUserStatusToggle(user.id, checked)} className="data-[state=checked]:bg-green-600" />
                                 <span className="text-xs text-gray-600">
                                   {user.status === "Active" ? "Active" : "Inactive"}
                                 </span>
                               </div>
                             </td>
                            <td className="p-2 md:p-3 text-gray-600 text-xs md:text-sm">{user.joined || "N/A"}</td>
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
                                <Button size="sm" variant="outline" className="text-red-600 p-1 md:p-2" onClick={() => handleDeleteUser(user.id)}>
                                  <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>) : (
                          <tr>
                            <td colSpan={7} className="p-4 text-center text-gray-500">No users found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>}

          {activeSection === "assessments" && !loading && <div className="space-y-6">
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
                        {assessments.length > 0 ? assessments.map((assessment: any) => <tr key={assessment.id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{assessment.userName || "Guest"}</td>
                            <td className="p-3">
                              <Badge variant="outline">{assessment.personalityType || "N/A"}</Badge>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <Progress value={assessment.score || 0} className="w-16 h-2" />
                                <span className="text-sm">{assessment.score || 0}%</span>
                              </div>
                            </td>
                            <td className="p-3 text-gray-600">{assessment.completedDate || "N/A"}</td>
                            <td className="p-3">
                              <Button size="sm" variant="outline" onClick={() => handleViewAssessment(assessment.id)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </td>
                          </tr>) : (
                          <tr>
                            <td colSpan={5} className="p-4 text-center text-gray-500">No assessments found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>}

          {activeSection === "resumes" && !loading && <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Resume Management</CardTitle>
                    <Button variant="outline" onClick={fetchResumes}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
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
                        {resumes.length > 0 ? resumes.map((resume: any) => {
                          const skillsList = resume.skills || [];
                          return (
                            <tr key={resume.id} className="border-b hover:bg-gray-50">
                              <td className="p-3 font-medium">{resume.userName || "Guest"}</td>
                              <td className="p-3 text-gray-600">{resume.fileName || "N/A"}</td>
                              <td className="p-3">
                                <Badge variant={resume.status === "Analyzed" ? "default" : "secondary"}>
                                  {resume.status || "Pending"}
                                </Badge>
                              </td>
                              <td className="p-3 text-gray-600">{resume.uploadDate || "N/A"}</td>
                              <td className="p-3">
                                <div className="flex flex-wrap gap-1">
                                  {skillsList.slice(0, 3).map((skill: string, index: number) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                  {skillsList.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{skillsList.length - 3}
                                    </Badge>
                                  )}
                                  {skillsList.length === 0 && (
                                    <span className="text-xs text-gray-400">No skills</span>
                                  )}
                                </div>
                              </td>
                              <td className="p-3">
                                <div className="flex space-x-2">
                                  {resume.fileURL && (
                                    <Button size="sm" variant="outline" onClick={() => window.open(resume.fileURL, '_blank')}>
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        }) : (
                          <tr>
                            <td colSpan={6} className="p-4 text-center text-gray-500">No resumes found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>}

          {activeSection === "careers" && !loading && <div className="space-y-6">
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
                    {careers.length > 0 ? careers.map((career: any) => {
                      const requiredTraits = career.PersonalityMatchs || career.personalityMatchs || [];
                      const skills = career.RequiredSkills || career.requiredSkills || [];
                      return (
                        <Card key={career.id} className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{career.name || career.Name}</h3>
                              <p className="text-gray-600 mb-3">{career.description || career.Description || ""}</p>
                              <div className="space-y-2">
                                {requiredTraits.length > 0 && (
                                  <div>
                                    <span className="text-sm font-medium">Required Traits: </span>
                                    {requiredTraits.map((trait: string, index: number) => (
                                      <Badge key={index} variant="outline" className="mr-1">
                                        {trait}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                                {skills.length > 0 && (
                                  <div>
                                    <span className="text-sm font-medium">Skills: </span>
                                    {skills.map((skill: string, index: number) => (
                                      <Badge key={index} variant="secondary" className="mr-1">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditCareer(career.id)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleDeleteCareer(career.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      );
                    }) : (
                      <p className="text-center text-gray-500 p-4">No careers found</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>}

          {activeSection === "skills" && !loading && <div className="space-y-6">
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
                        {skills.length > 0 ? skills.map((skill: any) => {
                          const linkedCareers = skill.LinkedCareers || skill.linkedCareers || [];
                          return (
                            <tr key={skill.id} className="border-b hover:bg-gray-50">
                              <td className="p-3 font-medium">{skill.name || skill.Name}</td>
                              <td className="p-3">
                                <Badge variant={skill.category === "Technical" || skill.Category === "Technical" ? "default" : "secondary"}>
                                  {skill.category || skill.Category || "N/A"}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <div className="flex flex-wrap gap-1">
                                  {linkedCareers.length > 0 ? linkedCareers.map((career: string, index: number) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {career}
                                    </Badge>
                                  )) : (
                                    <span className="text-xs text-gray-400">None</span>
                                  )}
                                </div>
                              </td>
                              <td className="p-3">
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline" onClick={() => handleEditSkill(skill.id)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleDeleteSkill(skill.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        }) : (
                          <tr>
                            <td colSpan={4} className="p-4 text-center text-gray-500">No skills found</td>
                          </tr>
                        )}
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

                  <Button className="w-full text-sm md:text-base" onClick={handleSaveApiSettings}>
                    Save API Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
                    <Key className="h-4 w-4 md:h-5 md:w-5" />
                    <span>Change Password</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
                  <div className="grid gap-4">
                    <div>
                      <label className="text-xs md:text-sm font-medium mb-2 block">Current Password</label>
                      <Input 
                        type="password" 
                        placeholder="Enter your current password" 
                        value={passwordSettings.currentPassword} 
                        onChange={e => setPasswordSettings({
                          ...passwordSettings,
                          currentPassword: e.target.value
                        })} 
                        className="text-sm" 
                      />
                    </div>
                    <div>
                      <label className="text-xs md:text-sm font-medium mb-2 block">New Password</label>
                      <Input 
                        type="password" 
                        placeholder="Enter your new password" 
                        value={passwordSettings.newPassword} 
                        onChange={e => setPasswordSettings({
                          ...passwordSettings,
                          newPassword: e.target.value
                        })} 
                        className="text-sm" 
                      />
                    </div>
                    <div>
                      <label className="text-xs md:text-sm font-medium mb-2 block">Confirm New Password</label>
                      <Input 
                        type="password" 
                        placeholder="Confirm your new password" 
                        value={passwordSettings.confirmPassword} 
                        onChange={e => setPasswordSettings({
                          ...passwordSettings,
                          confirmPassword: e.target.value
                        })} 
                        className="text-sm" 
                      />
                    </div>
                  </div>

                  <Button onClick={handlePasswordChange} className="w-full text-sm md:text-base">
                    Change Password
                  </Button>
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