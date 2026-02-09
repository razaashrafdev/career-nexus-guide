import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  // Redirect logged-in users
  useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: "Already Logged In",
        description: "Please log out of your current account before creating a new one.",
        variant: "destructive"
      });
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, toast]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const capitalizeFirst = (str: string) =>
    str.trim() ? str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase() : str.trim();

  const ALLOWED_EMAIL_DOMAINS = ["gmail.com", "yahoo.com", "yopmail.com"];
  const getEmailDomain = (email: string) => email.trim().toLowerCase().split("@")[1] ?? "";
  const isAllowedEmail = (email: string) => ALLOWED_EMAIL_DOMAINS.includes(getEmailDomain(email));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAllowedEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Only Gmail and Yahoo email are accepted.",
        variant: "destructive",
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords don't match!",
        variant: "destructive"
      });
      return;
    }
    if (!agreedToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    const result = await authService.register({
      username: formData.email.split("@")[0],
      email: formData.email,
      fullname: `${capitalizeFirst(formData.firstName)} ${capitalizeFirst(formData.lastName)}`,
      roleid: 0,
      passswordHash: formData.password
    });

    if (result.error) {
      toast({
        title: "Registration Failed",
        description: result.error.message,
        variant: "destructive"
      });
      setIsLoading(false);
    } else {
      toast({
        title: "Account Created Successfully",
        description: "Your account has been created. Redirecting to login...",
      });
      setIsLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
    // Simulate registration process
    // setTimeout(() => {
    //   setIsLoading(false);
    //   navigate("/dashboard");
    // }, 2000);
  };
  const passwordStrength = (password: string) => {
    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    return {
      hasLength,
      hasUpper,
      hasLower,
      hasNumber
    };
  };
  const strength = passwordStrength(formData.password);
  return <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Join Career Nexus
        </h1>
        <p className="text-gray-600 mt-2">Start your personalized career journey today</p>
      </div>

      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Get started with your free account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" type="text" placeholder="John" value={formData.firstName} onChange={handleInputChange} required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" type="text" placeholder="Doe" value={formData.lastName} onChange={handleInputChange} required className="h-11" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleInputChange} required className="h-11" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Create a strong password" value={formData.password} onChange={handleInputChange} required className="h-11 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  <Eye className="h-4 w-4" />
                </button>
              </div>

              {formData.password && <div className="space-y-1 text-xs">
                <div className={`flex items-center ${strength.hasLength ? 'text-green-600' : 'text-gray-400'}`}>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  At least 8 characters
                </div>
                <div className={`flex items-center ${strength.hasUpper ? 'text-green-600' : 'text-gray-400'}`}>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  One uppercase letter
                </div>
                <div className={`flex items-center ${strength.hasLower ? 'text-green-600' : 'text-gray-400'}`}>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  One lowercase letter
                </div>
                <div className={`flex items-center ${strength.hasNumber ? 'text-green-600' : 'text-gray-400'}`}>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  One number
                </div>
              </div>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleInputChange} required className="h-11 pr-10 [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden" autoComplete="new-password" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <input type="checkbox" id="terms" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} className="mt-1 rounded border-gray-300" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" disabled={isLoading || !agreedToTerms}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>



          <div className="mt-3 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>;
};
export default SignUp;