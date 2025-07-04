import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  Users, 
  BarChart3, 
  Settings, 
  Shield, 
  Search,
  ArrowLeft,
  User,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Brain,
  Target,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  LogOut,
  Lock,
  Bell,
  Database,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";
import ResponsiveSidebar from "@/components/ResponsiveSidebar";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("users");

  // Mock analytics data
  const userGrowthData = [
    { month: 'Jan', users: 1200, active: 800 },
    { month: 'Feb', users: 1850, active: 1200 },
    { month: 'Mar', users: 2400, active: 1600 },
    { month: 'Apr', users: 3200, active: 2100 },
    { month: 'May', users: 4100, active: 2800 },
    { month: 'Jun', users: 5200, active: 3500 },
  ];

  const assessmentData = [
    { week: 'Week 1', completed: 250 },
    { week: 'Week 2', completed: 320 },
    { week: 'Week 3', completed: 280 },
    { week: 'Week 4', completed: 420 },
  ];

  const stats = {
    totalUsers: 52847,
    activeUsers: 14392,
    completedAssessments: 47234,
    avgSessionTime: "18m 45s"
  };

  const recentUsers = [
    { id: 1, name: "Alex Johnson", email: "alex@email.com", status: "active", assessments: 2, joinDate: "2025-01-02", resumeUploaded: true, personalityType: "INTJ", careerScore: 85 },
    { id: 2, name: "Sarah Chen", email: "sarah@email.com", status: "pending", assessments: 1, joinDate: "2025-01-02", resumeUploaded: false, personalityType: "ENFP", careerScore: 72 },
    { id: 3, name: "Mike Wilson", email: "mike@email.com", status: "active", assessments: 3, joinDate: "2025-01-01", resumeUploaded: true, personalityType: "ISTP", careerScore: 91 },
    { id: 4, name: "Emma Davis", email: "emma@email.com", status: "inactive", assessments: 0, joinDate: "2025-01-01", resumeUploaded: false, personalityType: "", careerScore: 0 },
    { id: 5, name: "Tom Brown", email: "tom@email.com", status: "active", assessments: 2, joinDate: "2024-12-31", resumeUploaded: true, personalityType: "ENFJ", careerScore: 78 }
  ];

  const systemAlerts = [
    { id: 1, type: "warning", message: "High server load detected", time: "5 min ago" },
    { id: 2, type: "info", message: "Weekly backup completed successfully", time: "2 hours ago" },
    { id: 3, type: "error", message: "Payment gateway timeout", time: "1 day ago" }
  ];

  const jobs = [
    { id: 1, title: "Junior Web Developer", company: "TechCorp", location: "Remote", match: 82, applicants: 24, skills: ["React", "JavaScript", "CSS"] },
    { id: 2, title: "Data Analyst", company: "DataInc", location: "New York", match: 91, applicants: 18, skills: ["Python", "SQL", "Excel"] },
    { id: 3, title: "UX Designer", company: "DesignStudio", location: "San Francisco", match: 76, applicants: 31, skills: ["Figma", "Sketch", "User Research"] }
  ];

  const sidebarItems = [
    { id: "users", label: "Users Management", icon: Users },
    { id: "resumes", label: "Resume Viewer", icon: FileText },
    { id: "personality", label: "Personality Tests", icon: Brain },
    { id: "jobs", label: "Job Management", icon: Target },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "system", label: "System Settings", icon: Settings },
    { id: "reports", label: "Reports", icon: Download }
  ];

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
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === item.id
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

        <div className="p-4 border-t border-gray-200">
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Lock className="h-4 w-4 mr-2" />
              Change Password
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-red-600 hover:text-red-700">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </ResponsiveSidebar>

      {/* Main Content */}
      <div className="flex-1 overflow-auto md:ml-0 ml-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-6 md:ml-0 ml-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, Admin • {new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Site
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="p-6 md:ml-0 ml-16">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Total Users</p>
                    <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-100" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Active Users (30d)</p>
                    <p className="text-3xl font-bold text-green-600">{stats.activeUsers.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Completed Assessments</p>
                    <p className="text-3xl font-bold text-blue-600">{stats.completedAssessments.toLocaleString()}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Avg Session Time</p>
                    <p className="text-3xl font-bold text-indigo-600">{stats.avgSessionTime}</p>
                  </div>
                  <Clock className="h-8 w-8 text-indigo-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dynamic Content Based on Active Tab */}
          {activeTab === "users" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Users Management</CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm font-semibold">{user.assessments}</p>
                          <p className="text-xs text-gray-500">Tests</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold">{user.careerScore}%</p>
                          <p className="text-xs text-gray-500">Score</p>
                        </div>
                        <Badge variant={user.resumeUploaded ? 'default' : 'secondary'}>
                          {user.resumeUploaded ? 'Resume ✓' : 'No Resume'}
                        </Badge>
                        <Badge 
                          variant={user.status === 'active' ? 'default' : 
                                  user.status === 'pending' ? 'secondary' : 'destructive'}
                        >
                          {user.status}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>User Growth Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="users" 
                          stroke="#8884d8" 
                          strokeWidth={2}
                          name="Total Users"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="active" 
                          stroke="#82ca9d" 
                          strokeWidth={2}
                          name="Active Users"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Weekly Assessment Completions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={assessmentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="completed" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Personality Types Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>INTJ</span>
                        <Badge variant="default" className="bg-blue-500">25%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>ENFP</span>
                        <Badge variant="default" className="bg-green-500">20%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>ISTP</span>
                        <Badge variant="default" className="bg-purple-500">18%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>ENFJ</span>
                        <Badge variant="default" className="bg-orange-500">15%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Skills in Demand</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>JavaScript</span>
                        <Badge variant="default" className="bg-yellow-500">35%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Python</span>
                        <Badge variant="default" className="bg-blue-500">30%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>React</span>
                        <Badge variant="default" className="bg-cyan-500">25%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>SQL</span>
                        <Badge variant="default" className="bg-green-500">20%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "resumes" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Resume Viewer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.filter(user => user.resumeUploaded).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-blue-500" />
                        <div>
                          <p className="font-semibold">{user.name}'s Resume</p>
                          <p className="text-sm text-gray-600">Score: {user.careerScore}%</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "personality" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Personality Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.filter(user => user.personalityType).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Brain className="h-8 w-8 text-purple-500" />
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-gray-600">Type: {user.personalityType}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="default" className="bg-purple-500">
                          {user.personalityType}
                        </Badge>
                        <div className="text-center">
                          <p className="text-sm font-semibold">{user.careerScore}%</p>
                          <p className="text-xs text-gray-500">Match</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "jobs" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Job Management</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Job
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                        <div className="flex space-x-2 mt-2">
                          {job.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm font-semibold">{job.match}%</p>
                          <p className="text-xs text-gray-500">Match</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold">{job.applicants}</p>
                          <p className="text-xs text-gray-500">Applicants</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "system" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Database Configuration</h4>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Database Status</span>
                      <Badge variant="default" className="bg-green-500">Connected</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Last Backup</span>
                      <span className="text-sm text-gray-600">2 hours ago</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Security Settings</h4>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Two-Factor Auth</span>
                      <Badge variant="default" className="bg-green-500">Enabled</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>SSL Certificate</span>
                      <Badge variant="default" className="bg-green-500">Valid</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "reports" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Export Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Student Data Export</h4>
                    <p className="text-sm text-gray-600 mb-4">Export all student information to CSV format</p>
                    <Button size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Assessment Results</h4>
                    <p className="text-sm text-gray-600 mb-4">Download personality test results and analytics</p>
                    <Button size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">System Performance</h4>
                    <p className="text-sm text-gray-600 mb-4">Server performance and uptime statistics</p>
                    <Button size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
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
