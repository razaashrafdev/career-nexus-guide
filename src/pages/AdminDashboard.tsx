import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("users");

  // Mock data
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
      {/* Sidebar */}
      <div className="w-64 bg-white/90 backdrop-blur-sm shadow-lg border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            CareerCompass Admin
          </Link>
          <div className="flex items-center mt-4 space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-purple-400 rounded-full flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-gray-700">Admin User</span>
          </div>
        </div>

        <nav className="p-4">
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

        <div className="absolute bottom-4 left-4 right-4">
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
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-6">
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

        <div className="p-6">
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

          {/* Other tabs content would go here... */}
          {activeTab === "analytics" && (
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Personality Types Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Bar Chart - Personality Types</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Skills in Demand</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Pie Chart - Skills Demand</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Students Joining Per Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Line Chart - Weekly Signups</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Score Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Average Score</span>
                      <Badge variant="default" className="bg-blue-500">78.5%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Highest Score</span>
                      <Badge variant="default" className="bg-green-500">98%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Lowest Score</span>
                      <Badge variant="secondary">42%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  CareerCompass
                </div>
                <p className="text-gray-400 mb-6">
                  Empowering students worldwide to discover their ideal career paths through AI-powered insights and personalized guidance.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Product Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Product</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><Link to="/personality-test" className="hover:text-purple-400 transition-colors">Personality Test</Link></li>
                  <li><Link to="/resume-upload" className="hover:text-purple-400 transition-colors">Resume Analysis</Link></li>
                  <li><Link to="/dashboard" className="hover:text-purple-400 transition-colors">Career Dashboard</Link></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors">AI Counselor</a></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Job Matching</a></li>
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><Link to="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Our Team</a></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Press</a></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                    <a href="mailto:support@careercompass.com" className="hover:text-purple-400 transition-colors break-all">
                      support@careercompass.com
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                    <a href="tel:+1-555-0123" className="hover:text-purple-400 transition-colors">
                      +1 (555) 012-3456
                    </a>
                  </li>
                  <li className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>San Francisco, CA</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <h5 className="text-sm font-semibold mb-2 text-white">Newsletter</h5>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input 
                      type="email" 
                      placeholder="Your email" 
                      className="bg-gray-800 text-white px-3 py-2 rounded-md flex-1 border border-gray-700 focus:outline-none focus:border-purple-500 text-sm" 
                    />
                    <Button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm whitespace-nowrap">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-400 text-sm text-center md:text-left">
                  © 2025 CareerCompass. All rights reserved.
                </div>
                <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 text-sm text-gray-400">
                  <Link to="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link>
                  <Link to="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link>
                  <Link to="/cookie-policy" className="hover:text-purple-400 transition-colors">Cookie Policy</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
