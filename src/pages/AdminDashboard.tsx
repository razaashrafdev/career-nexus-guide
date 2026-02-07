import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, BookOpen, FileText, Target, TrendingUp, Award, ArrowRight, CheckCircle, AlertCircle, Upload, RefreshCw, Brain, BarChart3, Settings, LogOut, Home, Search, Eye, Trash2, Edit, Download, Plus, Key, Loader2, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ResponsiveSidebar from "@/components/ResponsiveSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { ViewUserModal, type UserData } from "@/components/modals/ViewUserModal";
import { ViewAssessmentModal } from "@/components/modals/ViewAssessmentModal";
import { ViewResumeModal } from "@/components/modals/ViewResumeModal";
import { EditCareerModal } from "@/components/modals/EditCareerModal";
import { EditSkillModal } from "@/components/modals/EditSkillModal";
import { AddUserModal } from "@/components/modals/AddUserModal";
import { AddSkillModal } from "@/components/modals/AddSkillModal";
import { AddCareerModal } from "@/components/modals/AddCareerModal";
import { useToast } from "@/hooks/use-toast";
import { adminService } from "@/services/adminService";
import { TOKEN_KEY } from "@/config/api";
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
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [usersDisplayCount, setUsersDisplayCount] = useState(10);
  const [assessmentsDisplayCount, setAssessmentsDisplayCount] = useState(10);
  const [resumesDisplayCount, setResumesDisplayCount] = useState(10);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [apiSettings, setApiSettings] = useState({
    indeedApiKey: "",
    chatgptApiKey: "",
    deepseekApiKey: "",
    activeAiModel: "chatgpt"
  });

  // Profile information state
  const [profileInfo, setProfileInfo] = useState({
    fullName: user?.fullName || "",
    email: user?.email || ""
  });

  // Password change state
  const [passwordSettings, setPasswordSettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Password visibility state
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleLogout = (closeSidebar: () => void) => {
    closeSidebar();
    logout();
    navigate("/login");
  };

  // Modal states
  const [viewUserModal, setViewUserModal] = useState<{
    isOpen: boolean;
    user: UserData | null;
  }>({
    isOpen: false,
    user: null,
  });
  const [viewAssessmentModal, setViewAssessmentModal] = useState({
    isOpen: false,
    assessment: null as any
  });
  const [viewResumeModal, setViewResumeModal] = useState({
    isOpen: false,
    resume: null as any
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

  // Delete confirmation modals state
  const [deleteUserModal, setDeleteUserModal] = useState<{ isOpen: boolean; userId: number | null }>({
    isOpen: false,
    userId: null
  });
  const [deleteCareerModal, setDeleteCareerModal] = useState<{ isOpen: boolean; careerId: number | null }>({
    isOpen: false,
    careerId: null
  });
  const [deleteSkillModal, setDeleteSkillModal] = useState<{ isOpen: boolean; skillId: number | null }>({
    isOpen: false,
    skillId: null
  });

  const {
    toast
  } = useToast();

  // Real data from API
  const [loading, setLoading] = useState(false);
  const [overview, setOverview] = useState({
    totalUsers: 0,
    assessmentsCompleted: 0,
    resumesUploaded: 0,
    careerMatches: 0
  });
  const [users, setUsers] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [resumes, setResumes] = useState<any[]>([]);
  const [careers, setCareers] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [topCareers, setTopCareers] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  // Feedback from users (loaded from API)
  const [feedbackList, setFeedbackList] = useState<{ id: number; username: string; email: string; message: string; submittedAt: string; feedbackType: "error" | "suggestion" }[]>([]);
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
    //   id: "careers",
    //   label: "Careers",
    //   icon: Target
    // }, {
    //   id: "skills",
    //   label: "Skills",
    //   icon: BookOpen
    // }, {
    id: "feedback",
    label: "Feedback",
    icon: MessageSquare
  }, {
    id: "settings",
    label: "Settings",
    icon: Settings
  }];
  const filteredUsers = users.filter(user => (user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || (user.email || "").toLowerCase().includes(searchTerm.toLowerCase()));

  // Define fetch functions before useEffect hooks that use them
  const fetchAssessments = useCallback(async () => {
    console.log("fetchAssessments called");
    setLoading(true);
    try {
      const result = await adminService.getAssessments();
      console.log("Assessment result:", result);
      if (result.success) {
        setAssessments(result.success);
      } else if (result.error) {
        toast({
          title: "Error",
          description: result.error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error in fetchAssessments:", error);
      toast({
        title: "Error",
        description: "Failed to fetch assessments",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const fetchResumes = useCallback(async () => {
    console.log("fetchResumes called");
    setLoading(true);
    try {
      const result = await adminService.getResumes();
      console.log("Resume result:", result);
      if (result.success) {
        setResumes(result.success);
      } else if (result.error) {
        toast({
          title: "Error",
          description: result.error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error in fetchResumes:", error);
      toast({
        title: "Error",
        description: "Failed to fetch resumes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const handleDownloadResume = async (resume: any) => {
    if (!resume.fileURL) {
      toast({
        title: "Error",
        description: "Resume file URL not available",
        variant: "destructive"
      });
      return;
    }

    try {
      const token = localStorage.getItem(TOKEN_KEY) || localStorage.getItem("token");
      const headers: HeadersInit = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      // Fetch the file
      const response = await fetch(resume.fileURL, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to download resume: ${response.statusText}`);
      }

      // Get the file as a blob
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger download
      const link = document.createElement("a");
      link.href = url;

      // Use the fileName from resume, or generate a default name
      const fileName = resume.fileName || `resume_${resume.id || Date.now()}.pdf`;
      link.download = fileName;

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Resume downloaded successfully",
      });
    } catch (error: any) {
      console.error("Error downloading resume:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to download resume",
        variant: "destructive"
      });
    }
  };

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
      setUsersDisplayCount(10); // Reset to initial count when switching to users section
    }
  }, [activeSection]);

  // Reset display count when search term changes
  useEffect(() => {
    if (activeSection === "users") {
      setUsersDisplayCount(10);
    }
  }, [searchTerm, activeSection]);

  // Fetch Assessments
  useEffect(() => {
    if (activeSection === "assessments") {
      console.log("Fetching assessments - activeSection:", activeSection);
      fetchAssessments();
      setAssessmentsDisplayCount(10); // Reset to initial count when switching to assessments section
    }
  }, [activeSection, fetchAssessments]);

  // Fetch Resumes
  useEffect(() => {
    if (activeSection === "resumes") {
      console.log("Fetching resumes - activeSection:", activeSection);
      fetchResumes();
      setResumesDisplayCount(10); // Reset to initial count when switching to resumes section
    }
  }, [activeSection, fetchResumes]);

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

  // Sync profile info with user object
  useEffect(() => {
    if (user) {
      setProfileInfo({
        fullName: user.fullName || "",
        email: user.email || ""
      });
    }
  }, [user]);

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

  const fetchFeedback = useCallback(async () => {
    const result = await adminService.getFeedback();
     console.log("Feedback API result:", result);
    if (result.success) {
      setFeedbackList(
        result.success.map((item) => ({
          id: item.id,
          username: item.username,
          email: item.email,
          message: item.message,
          feedbackType: item.feedbackType as "error" | "suggestion", 
          submittedAt: typeof item.submittedAt === "string" ? item.submittedAt : new Date(item.submittedAt).toISOString(),
          
        }))
      );
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive",
      });
    }
  }, [toast]);

  // Fetch Feedback
  useEffect(() => {
    if (activeSection === "feedback") {
      fetchFeedback();
    }
  }, [activeSection, fetchFeedback]);

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
      // Close the modal after successful update
      setViewUserModal({
        isOpen: false,
        user: null,
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
      const user = result.success;
      setViewUserModal({
        isOpen: true,
        user: {
          id: user.id,
          userName: user.userName || "",
          roleName: user.roleName || "",
          fullName: user.fullName || "",
          email: user.email || "",
          isActive: user.isActive || false,
          createdOn: user.createdOn || "",
          assessmentCompleted: user.assessmentCompleted || false,
          resumeUploaded: user.resumeUploaded || false,
        },
      });
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
    }
  };

  const handleViewAssessment = (assessment: any) => {
    setViewAssessmentModal({
      isOpen: true,
      assessment
    });
  };

  const handleViewResume = (resume: any) => {
    setViewResumeModal({
      isOpen: true,
      resume
    });
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
    setDeleteUserModal({ isOpen: true, userId });
  };

  const confirmDeleteUser = async () => {
    if (!deleteUserModal.userId) return;

    const result = await adminService.deleteUser(deleteUserModal.userId);
    if (result.success) {
      await fetchUsers();
      toast({
        title: "User Deleted",
        description: "User has been successfully deleted."
      });
      setDeleteUserModal({ isOpen: false, userId: null });
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
      setDeleteUserModal({ isOpen: false, userId: null });
    }
  };

  const handleDeleteCareer = async (careerId: number) => {
    setDeleteCareerModal({ isOpen: true, careerId });
  };

  const confirmDeleteCareer = async () => {
    if (!deleteCareerModal.careerId) return;

    const result = await adminService.deleteCareer(deleteCareerModal.careerId);
    if (result.success) {
      await fetchCareers();
      toast({
        title: "Career Deleted",
        description: "Career has been successfully deleted."
      });
      setDeleteCareerModal({ isOpen: false, careerId: null });
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
      setDeleteCareerModal({ isOpen: false, careerId: null });
    }
  };

  const handleDeleteSkill = async (skillId: number) => {
    setDeleteSkillModal({ isOpen: true, skillId });
  };

  const confirmDeleteSkill = async () => {
    if (!deleteSkillModal.skillId) return;

    const result = await adminService.deleteSkill(deleteSkillModal.skillId);
    if (result.success) {
      await fetchSkills();
      toast({
        title: "Skill Deleted",
        description: "Skill has been successfully deleted."
      });
      setDeleteSkillModal({ isOpen: false, skillId: null });
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive"
      });
      setDeleteSkillModal({ isOpen: false, skillId: null });
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
      {({ closeSidebar }) => (
        <>
          <div className="p-4 md:p-6 border-b border-gray-200">
            <Link to="/" className="flex items-center" onClick={closeSidebar}>
              <img src="/header-icon.png" alt="Career Nexus Logo" className="h-8 w-auto md:h-10 md:w-auto" />
            </Link>
          </div>

          <nav className="p-2 md:p-4 flex-1 overflow-y-auto">
            <ul className="space-y-1 md:space-y-2">
              {sidebarItems.map(item => <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveSection(item.id);
                    closeSidebar();
                  }}
                  className={`w-full flex items-center space-x-2 md:space-x-3 px-2 md:px-3 py-2 rounded-lg transition-colors text-sm md:text-base ${activeSection === item.id ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <item.icon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <span className="text-left truncate min-w-0">{item.label}</span>
                </button>
              </li>)}
            </ul>
          </nav>

          <div className="p-2 md:p-4 border-t border-gray-200 mt-auto">
            <Button onClick={() => handleLogout(closeSidebar)} variant="outline" size="sm" className="w-full justify-start text-red-600 hover:text-red-700 text-xs md:text-sm">
              <LogOut className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Logout</span>
              <span className="md:hidden">Logout</span>
            </Button>
          </div>
        </>
      )}
    </ResponsiveSidebar>

    {/* Main Content */}
    <div className="flex-1 flex flex-col min-h-screen lg:ml-64 min-w-0">
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 lg:left-64 bg-white backdrop-blur-sm border-b border-gray-200 py-2 px-3 md:py-[14px] md:px-6 z-40">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm md:text-base text-gray-600">Welcome, {user?.fullName || "Admin"}</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-3 md:p-6 mt-[76px] md:mt-[98px] min-w-0 overflow-x-hidden">
        {loading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          </div>
        )}
        {activeSection === "overview" && !loading && <div className="space-y-5 md:space-y-7">
          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Total Users Card */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 text-white overflow-hidden relative group hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
              <CardContent className="p-5 md:p-7 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-purple-100 text-xs md:text-sm font-medium mb-2 uppercase tracking-wide">Total Users</p>
                    <p className="text-3xl md:text-4xl font-bold mb-1">{overview.totalUsers.toLocaleString()}</p>
                    <p className="text-purple-100 text-xs font-light">Registered Accounts</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 group-hover:bg-white/30 transition-colors">
                    <User className="h-6 w-6 md:h-7 md:w-7" />
                  </div>
                </div>
                {overview.totalUsers > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-purple-100">Active Platform</span>
                      <span className="font-semibold">100%</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Assessments Card */}
            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-5 md:p-7">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs md:text-sm font-medium mb-2 uppercase tracking-wide">Assessments</p>
                    <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">{overview.assessmentsCompleted.toLocaleString()}</p>
                    <p className="text-gray-400 text-xs font-light">Completed Tests</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 group-hover:bg-blue-100 transition-colors">
                    <Brain className="h-6 w-6 md:h-7 md:w-7 text-blue-600" />
                  </div>
                </div>
                {overview.totalUsers > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-gray-500">Completion Rate</span>
                      <span className="text-blue-600 font-semibold">
                        {Math.round((overview.assessmentsCompleted / overview.totalUsers) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((overview.assessmentsCompleted / overview.totalUsers) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Resumes Card */}
            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-5 md:p-7">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs md:text-sm font-medium mb-2 uppercase tracking-wide">Resumes</p>
                    <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">{overview.resumesUploaded.toLocaleString()}</p>
                    <p className="text-gray-400 text-xs font-light">Uploaded Files</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 group-hover:bg-blue-100 transition-colors">
                    <Upload className="h-6 w-6 md:h-7 md:w-7 text-blue-600" />
                  </div>
                </div>
                {overview.totalUsers > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-gray-500">Upload Rate</span>
                      <span className="text-blue-600 font-semibold">
                        {Math.round((overview.resumesUploaded / overview.totalUsers) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((overview.resumesUploaded / overview.totalUsers) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Career Matches Card */}
            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-5 md:p-7">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs md:text-sm font-medium mb-2 uppercase tracking-wide">Career Matches</p>
                    <p className="text-3xl md:text-4xl font-bold text-indigo-600 mb-1">{overview.careerMatches.toLocaleString()}</p>
                    <p className="text-gray-400 text-xs font-light">Successful Matches</p>
                  </div>
                  <div className="bg-indigo-50 rounded-xl p-3 group-hover:bg-indigo-100 transition-colors">
                    <Target className="h-6 w-6 md:h-7 md:w-7 text-indigo-600" />
                  </div>
                </div>
                {overview.resumesUploaded > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-gray-500">Match Rate</span>
                      <span className="text-indigo-600 font-semibold">
                        {Math.round((overview.careerMatches / overview.resumesUploaded) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((overview.careerMatches / overview.resumesUploaded) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Activity & Trends Section */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7"> */}
            {/* Most Recommended Careers - Enhanced */}
            <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardHeader className="border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base md:text-lg font-bold text-gray-800">Top Assessment Results</CardTitle>
                      <p className="text-xs text-gray-500 font-light mt-0.5">Top results matches from assessments</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Top {Math.min(topCareers.length, 5)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {topCareers.length > 0 ? (
                    topCareers.slice(0, 5).map((career: any, index: number) => {
                      const matchCount = career.MatchCount || career.matchCount || 0;
                      const maxMatches = topCareers[0]?.MatchCount || topCareers[0]?.matchCount || 1;
                      const percentage = Math.round((matchCount / maxMatches) * 100);
                      return (
                        // <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group">
                        //   <div className="flex items-center gap-3 flex-1 min-w-0">
                        //     <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        //       {index + 1}
                        //     </div>
                        //     <div className="flex-1 min-w-0">
                        //       <p className="font-semibold text-sm md:text-base text-gray-800 truncate group-hover:text-purple-600 transition-colors">
                        //         {career.CareerName || career.careerName}
                        //       </p>
                        //       <div className="flex items-center gap-2 mt-1">
                        //         <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden max-w-[100px]">
                        //           <div
                        //             className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-500"
                        //             style={{ width: `${percentage}%` }}
                        //           ></div>
                        //         </div>
                        //         <span className="text-xs text-gray-500">{matchCount} matches</span>
                        //       </div>
                        //     </div>
                        //   </div>
                        //   <Badge className="text-xs font-semibold bg-purple-100 text-purple-700 border-purple-200">
                        //     {matchCount}
                        //   </Badge>
                        // </div>
                        <div
                          key={index}
                          className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white border border-gray-200"
                        >
                          {/* Name */}
                          <div className="w-24 flex-shrink-0">
                            <p className="font-semibold text-sm md:text-base text-gray-800 truncate">
                              {career.CareerName || career.careerName}
                            </p>
                          </div>

                          {/* Separator */}
                          <div className="h-8 w-px bg-gray-300" />

                          {/* Progress Bar */}
                          <div className="flex-1">
                            <div className="w-full bg-gray-100 rounded-full h-2.5">
                              <div
                                className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>

                          {/* Value */}
                          <div className="w-14 text-right">
                            <span className="text-sm font-bold text-gray-700">
                              {matchCount}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <Award className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">No career data available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Top Skills Trends - Enhanced */}
            {/* <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardHeader className="border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base md:text-lg font-bold text-gray-800">Top Skills Trends</CardTitle>
                      <p className="text-xs text-gray-500 font-light mt-0.5">Most in-demand skills</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Top {Math.min(skills.length, 3)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {skills.length > 0 ? (
                    skills.slice(0, 5).map((skill: any, index: number) => {
                      const usageCount = careers.filter((c: any) =>
                        (c.RequiredSkills || []).some((s: string) => s.includes(skill.Name || skill.name))
                      ).length;
                      const percentage = careers.length > 0 ? Math.round((usageCount / careers.length) * 100) : 0;
                      return (
                        <div key={index} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <BookOpen className="h-4 w-4 text-blue-600 flex-shrink-0" />
                              <span className="font-semibold text-sm md:text-base text-gray-800 truncate">
                                {skill.Name || skill.name}
                              </span>
                            </div>
                            <span className="text-xs md:text-sm font-bold text-blue-600 ml-2">{percentage}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-blue-500 h-full rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 min-w-[60px] text-right">
                              {usageCount} career{usageCount !== 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">No skills data available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card> */}
          {/* </div> */}

          {/* Quick Stats Summary */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50">
            <CardContent className="p-5 md:p-7">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-blue-600">
                    {overview.totalUsers > 0 ? Math.round((overview.assessmentsCompleted / overview.totalUsers) * 100) : 0}%
                  </p>
                  <p className="text-xs text-gray-600 font-medium mb-1">Assessment Rate</p>
                  <p className="text-[10px] text-gray-500 mt-1 px-2">
                    (Assessments ÷ Total Users) × 100
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-blue-600">
                    {overview.totalUsers > 0 ? Math.round((overview.resumesUploaded / overview.totalUsers) * 100) : 0}%
                  </p>
                  <p className="text-xs text-gray-600 font-medium mb-1">Resume Upload Rate</p>
                  <p className="text-[10px] text-gray-500 mt-1 px-2">
                    (Resumes Uploaded ÷ Total Users) × 100
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-indigo-600">
                    {overview.resumesUploaded > 0 ? Math.round((overview.careerMatches / overview.resumesUploaded) * 100) : 0}%
                  </p>
                  <p className="text-xs text-gray-600 font-medium mb-1">Match Success Rate</p>
                  <p className="text-[10px] text-gray-500 mt-1 px-2">
                    (Career Matches ÷ Resumes) × 100
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-purple-600">
                    {overview.resumesUploaded > 0 ? (overview.careerMatches / overview.resumesUploaded).toFixed(1) : 0}
                  </p>
                  <p className="text-xs text-gray-600 font-medium mb-1">Avg Matches/Resume</p>
                  <p className="text-[10px] text-gray-500 mt-1 px-2">
                    Career Matches ÷ Resumes Uploaded
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>}

        {activeSection === "users" && !loading && <div className="space-y-4 md:space-y-6">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg py-3 px-4 min-h-[65px] flex items-center">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 w-full">
                <CardTitle className="flex items-center space-x-2 text-base md:text-lg font-semibold text-white gap-2">
                  <User className="h-5 w-5 md:h-6 md:w-6" />
                  <span>Manage Users</span>
                </CardTitle>
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Search users..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-full text-black sm:w-64 text-sm" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="overflow-x-auto">
                <table className="w-full min-w-0 md:min-w-[600px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm">Name</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm">Email</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm hidden md:table-cell">Status</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm hidden md:table-cell">Joined</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm hidden md:table-cell">Assessment</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm hidden md:table-cell">Resume</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? filteredUsers.slice(0, usersDisplayCount).map((user: any) => <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 md:p-3 font-medium text-xs md:text-sm">{user.name || user.fullName || "N/A"}</td>
                      <td className="p-2 md:p-3 text-gray-600 text-xs md:text-sm truncate max-w-[120px] md:max-w-none">{user.email || "N/A"}</td>
                      <td className="p-2 md:p-3 hidden md:table-cell">
                        <div className="flex items-center space-x-2">
                          <Switch checked={user.status === "Active"} onCheckedChange={checked => handleUserStatusToggle(user.id, checked)} className="data-[state=checked]:bg-blue-600" />
                          <span className="text-xs text-gray-600">
                            {user.status === "Active" ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </td>
                      <td className="p-2 md:p-3 text-gray-600 text-xs md:text-sm hidden md:table-cell">{user.joined || "N/A"}</td>
                      <td className="p-2 md:p-3 hidden md:table-cell">
                        {user.assessmentCompleted ? <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-blue-500" /> : <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />}
                      </td>
                      <td className="p-2 md:p-3 hidden md:table-cell">
                        {user.resumeUploaded ? <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-blue-500" /> : <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />}
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
              {filteredUsers.length > usersDisplayCount && (
                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={() => setUsersDisplayCount(prev => prev + 10)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                  >
                    Load More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>}

        {activeSection === "assessments" && !loading && <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg py-3 px-4 min-h-[65px] flex items-center">
              <div className="flex flex-row items-center justify-between gap-3 w-full">
                <CardTitle className="flex items-center space-x-2 text-base md:text-lg font-semibold text-white gap-2">
                  <Brain className="h-5 w-5 md:h-6 md:w-6" />
                  <span>Assessment Results</span>
                </CardTitle>
                <Button className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-xs sm:text-sm shrink-0 p-2" onClick={fetchAssessments} title="Refresh">
                  <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="ml-1 sm:ml-2 hidden sm:inline">Refresh</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="overflow-x-auto">
                <table className="w-full min-w-0 md:min-w-[500px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm">User</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm">Attempt</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm">Personality Type</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm hidden md:table-cell">Score</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm hidden md:table-cell">Completed Date</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessments.length > 0 ? assessments.slice(0, assessmentsDisplayCount).map((assessment: any) => <tr key={assessment.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 md:p-3 font-medium text-xs md:text-sm truncate max-w-[100px] md:max-w-none">{assessment.userName || "Guest"}</td>
                      <td className="p-2 md:p-3 text-gray-600 text-xs md:text-sm">{assessment.attempt != null ? assessment.attempt : "—"}</td>
                      <td className="p-2 md:p-3">
                        <Badge variant="outline" className="text-xs">{assessment.personalityType || "N/A"}</Badge>
                      </td>
                      <td className="p-2 md:p-3 hidden md:table-cell">
                        <div className="flex items-center space-x-2">
                          <Progress value={assessment.score || 0} className="w-16 h-2 [&>div]:bg-blue-600" />
                          <span className="text-sm">{assessment.score || 0}%</span>
                        </div>
                      </td>
                      <td className="p-2 md:p-3 text-gray-600 text-xs md:text-sm hidden md:table-cell">{assessment.completedDate || "N/A"}</td>
                      <td className="p-2 md:p-3">
                        <Button size="sm" variant="outline" onClick={() => handleViewAssessment(assessment)} className="p-1 md:p-2" title="View Details">
                          <Eye className="h-3 w-3 md:h-4 md:w-4 md:mr-2" />
                          <span className="hidden md:inline">View Details</span>
                        </Button>
                      </td>
                    </tr>) : (
                      <tr>
                        <td colSpan={6} className="p-4 text-center text-gray-500">No assessments found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {assessments.length > assessmentsDisplayCount && (
                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={() => setAssessmentsDisplayCount(prev => prev + 10)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                  >
                    Load More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>}

        {activeSection === "resumes" && !loading && <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg py-3 px-4 min-h-[65px] flex items-center">
              <div className="flex flex-row items-center justify-between gap-3 w-full">
                <CardTitle className="flex items-center space-x-2 text-base md:text-lg font-semibold text-white gap-2">
                  <FileText className="h-5 w-5 md:h-6 md:w-6" />
                  <span>Resume Management</span>
                </CardTitle>
                <Button className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-xs sm:text-sm shrink-0 p-2" onClick={fetchResumes} title="Refresh">
                  <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="ml-1 sm:ml-2 hidden sm:inline">Refresh</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="overflow-x-auto">
                <table className="w-full min-w-0 md:min-w-[600px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm">User</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm">Attempt</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm hidden md:table-cell">File Name</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm">Status</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm hidden md:table-cell">Upload Date</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm hidden md:table-cell">Extracted Skills</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resumes.length > 0 ? resumes.slice(0, resumesDisplayCount).map((resume: any) => {
                      const skillsList = resume.skills || [];
                      return (
                        <tr key={resume.id} className="border-b hover:bg-gray-50">
                          <td className="p-2 md:p-3 font-medium text-xs md:text-sm truncate max-w-[100px] md:max-w-none">{resume.userName || "Guest"}</td>
                          <td className="p-2 md:p-3 text-gray-600 text-xs md:text-sm">{resume.attempt != null ? resume.attempt : "—"}</td>
                          <td className="p-2 md:p-3 text-gray-600 text-xs md:text-sm hidden md:table-cell">{resume.fileName || "N/A"}</td>
                          <td className="p-2 md:p-3">
                            <Badge className="bg-blue-600 text-white hover:bg-blue-700 text-xs" variant={resume.status === "Analyzed" ? "default" : "secondary"}>
                              {resume.status || "Pending"}
                            </Badge>
                          </td>
                          <td className="p-2 md:p-3 text-gray-600 text-xs md:text-sm hidden md:table-cell">{resume.uploadDate || "N/A"}</td>
                          <td className="p-2 md:p-3 hidden md:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {skillsList.slice(0, 2).map((skill: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {skillsList.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{skillsList.length - 2}
                                </Badge>
                              )}
                              {skillsList.length === 0 && (
                                <span className="text-xs text-gray-400">No skills</span>
                              )}
                            </div>
                          </td>
                          <td className="p-2 md:p-3">
                            <div className="flex space-x-1 md:space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewResume(resume)}
                                title="View Details"
                                className="p-1 md:p-2"
                              >
                                <Eye className="h-3 w-3 md:h-4 md:w-4" />
                              </Button>
                              {resume.fileURL && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDownloadResume(resume)}
                                  title="Download Resume"
                                  className="p-1 md:p-2"
                                >
                                  <Download className="h-3 w-3 md:h-4 md:w-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan={7} className="p-4 text-center text-gray-500">No resumes found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {resumes.length > resumesDisplayCount && (
                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={() => setResumesDisplayCount(prev => prev + 10)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                  >
                    Load More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>}

        {activeSection === "careers" && !loading && <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg py-3 px-4 min-h-[65px] flex items-center">
              <div className="flex flex-row items-center justify-between gap-3 w-full">
                <CardTitle className="flex items-center space-x-2 text-base md:text-lg font-semibold text-white gap-2">
                  <Target className="h-5 w-5 md:h-6 md:w-6" />
                  <span>Career Management</span>
                </CardTitle>
                <Button className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-xs sm:text-sm shrink-0" onClick={() => setAddCareerModal(true)}>
                  <Plus className="h-4 w-4" />
                  <span className="ml-1 sm:ml-2">Add Career</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {careers.length > 0 ? careers.map((career: any) => {
                  const requiredTraits = career.PersonalityMatchs || career.personalityMatchs || [];
                  const skills = career.RequiredSkills || career.requiredSkills || [];
                  return (
                    <Card key={career.id} className="p-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="flex-1 min-w-0 w-full">
                          <h3 className="font-semibold text-base sm:text-lg break-words">{career.name || career.Name}</h3>
                          <p className="text-gray-600 mb-3 text-sm sm:text-base break-words">{career.description || career.Description || ""}</p>
                          <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 sm:flex-col sm:space-y-2 sm:gap-x-0 sm:gap-y-0 items-start">
                            {requiredTraits.length > 0 && (
                              <div className="min-w-0 flex-1 sm:flex-none">
                                <span className="text-xs sm:text-sm font-medium block mb-1">Required Traits</span>
                                <div className="flex flex-row flex-wrap gap-1.5">
                                  {requiredTraits.map((trait: string, index: number) => (
                                    <Badge key={index} variant="outline" className="text-xs shrink-0">
                                      {trait}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            {skills.length > 0 && (
                              <div className="min-w-0 flex-1 sm:flex-none">
                                <span className="text-xs sm:text-sm font-medium block mb-1">Skills</span>
                                <div className="flex flex-row flex-wrap gap-1.5">
                                  {skills.map((skill: string, index: number) => (
                                    <Badge key={index} variant="secondary" className="text-xs shrink-0">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2 flex-shrink-0 w-full sm:w-auto justify-end sm:justify-start">
                          <Button size="sm" variant="outline" onClick={() => handleEditCareer(career.id)} className="flex-1 sm:flex-none">
                            <Edit className="h-4 w-4" />
                            <span className="ml-1 sm:hidden">Edit</span>
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 flex-1 sm:flex-none" onClick={() => handleDeleteCareer(career.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="ml-1 sm:hidden">Delete</span>
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
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg py-3 px-4 min-h-[65px] flex items-center">
              <div className="flex flex-row items-center justify-between gap-3 w-full">
                <CardTitle className="flex items-center space-x-2 text-base md:text-lg font-semibold text-white gap-2">
                  <BookOpen className="h-5 w-5 md:h-6 md:w-6" />
                  <span>Skills Management</span>
                </CardTitle>
                <Button className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-xs sm:text-sm shrink-0" onClick={() => setAddSkillModal(true)}>
                  <Plus className="h-4 w-4" />
                  <span className="ml-1 sm:ml-2">Add Skill</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="overflow-x-auto">
                <table className="w-full min-w-0 md:min-w-[400px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm">Skill Name</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm">Category</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm hidden md:table-cell">Linked Careers</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.length > 0 ? skills.map((skill: any) => {
                      const linkedCareers = skill.LinkedCareers || skill.linkedCareers || [];
                      return (
                        <tr key={skill.id} className="border-b hover:bg-gray-50">
                          <td className="p-2 md:p-3 font-medium text-xs md:text-sm truncate max-w-[120px] md:max-w-none">{skill.name || skill.Name}</td>
                          <td className="p-2 md:p-3">
                            <Badge className="bg-blue-600 text-white hover:bg-blue-700 text-xs" variant={skill.category === "Technical" || skill.Category === "Technical" ? "default" : "secondary"}>
                              {skill.category || skill.Category || "N/A"}
                            </Badge>
                          </td>
                          <td className="p-2 md:p-3 hidden md:table-cell">
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
                          <td className="p-2 md:p-3">
                            <div className="flex space-x-1 md:space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditSkill(skill.id)} className="p-1 md:p-2">
                                <Edit className="h-3 w-3 md:h-4 md:w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600 p-1 md:p-2" onClick={() => handleDeleteSkill(skill.id)}>
                                <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
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

        {activeSection === "feedback" && (
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm w-full max-w-full overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg py-3 px-3 sm:py-3 sm:px-4 md:py-4 md:px-5">
              <CardTitle className="flex items-center space-x-2 text-sm sm:text-base md:text-lg font-semibold text-white gap-2">
                <MessageSquare className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 flex-shrink-0" />
                <span className="break-words">User Feedback</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              {feedbackList.length === 0 ? (
                <div className="text-center py-8 sm:py-12 text-gray-500 px-2">
                  <MessageSquare className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 text-gray-300" />
                  <p className="font-medium text-sm sm:text-base">No feedback yet</p>
                  <p className="text-xs sm:text-sm mt-1 max-w-sm mx-auto">
                    When users submit feedback from their dashboard, it will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {feedbackList.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors w-full max-w-full overflow-hidden"
                    >
                      <div className="flex flex-col gap-y-2 text-sm mb-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1">
                        <div className="flex justify-between items-center gap-2 w-full sm:contents">
                          <div className="flex items-center gap-x-2 flex-wrap min-w-0 sm:contents">
                            <span className="font-semibold text-gray-800 text-xs sm:text-sm break-words sm:order-1">{item.userName}</span>
                            <Badge
                              variant="secondary"
                              className={`text-xs w-fit sm:order-3 ${item.feedbackType === "error" ? "bg-red-600 text-white hover:bg-red-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                            >
                              {item.feedbackType === "error" ? "Error" : "Suggestion"}
                            </Badge>
                          </div>
                          <span className="text-gray-400 text-xs flex-shrink-0 sm:order-4 sm:ml-auto">
                            {item.submittedAt ? new Date(item.submittedAt).toLocaleDateString(undefined, { dateStyle: "medium" }) : "—"}
                          </span>
                        </div>
                        <span className="text-gray-500 text-xs sm:text-sm break-all sm:order-2">{item.email}</span>
                      </div>
                      <p className="text-gray-700 text-xs sm:text-sm whitespace-pre-wrap break-words">{item.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeSection === "settings" && <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg pt-5 pb-3 px-4 min-h-[65px] flex items-center">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 w-full">
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
                    <Input
                      value={profileInfo.fullName}
                      onChange={(e) => setProfileInfo({ ...profileInfo, fullName: e.target.value })}
                      className="mt-1 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs md:text-sm font-medium text-gray-700">Email</label>
                    <Input
                      value={profileInfo.email}
                      onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })}
                      className="mt-1 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Password Change */}
              <div className="space-y-4">
                <h3 className="text-sm md:text-base font-semibold">Change Password</h3>
                <form onSubmit={(e) => { e.preventDefault(); handlePasswordChange(); }} className="space-y-3">
                  <div>
                    <label className="text-xs md:text-sm font-medium text-gray-700">Current Password</label>
                    <div className="relative mt-1">
                      <Input
                        type={showPasswords.current ? "text" : "password"}
                        placeholder="Enter current password"
                        className="text-sm pr-10 [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
                        value={passwordSettings.currentPassword}
                        onChange={e => setPasswordSettings({
                          ...passwordSettings,
                          currentPassword: e.target.value
                        })}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs md:text-sm font-medium text-gray-700">New Password</label>
                    <div className="relative mt-1">
                      <Input
                        type={showPasswords.new ? "text" : "password"}
                        placeholder="Enter new password"
                        className="text-sm pr-10"
                        value={passwordSettings.newPassword}
                        onChange={e => setPasswordSettings({
                          ...passwordSettings,
                          newPassword: e.target.value
                        })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs md:text-sm font-medium text-gray-700">Confirm New Password</label>
                    <div className="relative mt-1">
                      <Input
                        type={showPasswords.confirm ? "text" : "password"}
                        placeholder="Confirm new password"
                        className="text-sm pr-10 [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
                        value={passwordSettings.confirmPassword}
                        onChange={e => setPasswordSettings({
                          ...passwordSettings,
                          confirmPassword: e.target.value
                        })}
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

                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-sm w-full"
                  >
                    Update Password
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>}
      </div>
    </div>

    {/* Modals */}
    <ViewUserModal
      isOpen={viewUserModal.isOpen}
      user={viewUserModal.user}   // ✅ NOT viewUserModal
      onClose={() =>
        setViewUserModal({
          isOpen: false,
          user: null,
        })
      }
      onStatusToggle={handleUserStatusToggle}
    />


    <ViewAssessmentModal isOpen={viewAssessmentModal.isOpen} onClose={() => setViewAssessmentModal({
      isOpen: false,
      assessment: null
    })} assessment={viewAssessmentModal.assessment} />

    <ViewResumeModal
      isOpen={viewResumeModal.isOpen}
      onClose={() => setViewResumeModal({ isOpen: false, resume: null })}
      resume={viewResumeModal.resume}
      onDownload={handleDownloadResume}
    />

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

    {/* Delete Confirmation Modals */}
    <AlertDialog open={deleteUserModal.isOpen} onOpenChange={(open) => !open && setDeleteUserModal({ isOpen: false, userId: null })}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete User</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this user? This action cannot be undone and will permanently remove the user from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={confirmDeleteUser}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <AlertDialog open={deleteCareerModal.isOpen} onOpenChange={(open) => !open && setDeleteCareerModal({ isOpen: false, careerId: null })}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Career</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this career? This action cannot be undone and will permanently remove the career from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={confirmDeleteCareer}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <AlertDialog open={deleteSkillModal.isOpen} onOpenChange={(open) => !open && setDeleteSkillModal({ isOpen: false, skillId: null })}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Skill</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this skill? This action cannot be undone and will permanently remove the skill from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={confirmDeleteSkill}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
};
export default AdminDashboard;