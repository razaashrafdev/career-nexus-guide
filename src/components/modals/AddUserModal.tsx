import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { UserPlus } from "lucide-react";

interface UserData {
  id: number;
  name: string;
  email: string;
  status: string;
  joined: string;
  assessmentCompleted: boolean;
  resumeUploaded: boolean;
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (userData: Omit<UserData, 'id' | 'joined' | 'assessmentCompleted' | 'resumeUploaded'>) => void;
}

export const AddUserModal = ({ isOpen, onClose, onAdd }: AddUserModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    status: "Active"
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAdd({
        name: formData.name,
        email: formData.email,
        status: formData.status
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        status: "Active"
      });
      setErrors({});
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      status: "Active"
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add New User
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter full name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter email address"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter password"
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>
          
          <div>
            <Label className="text-sm font-medium">Account Status</Label>
            <div className="flex items-center gap-3 mt-2">
              <Switch 
                checked={formData.status === "Active"}
                onCheckedChange={(checked) => setFormData(prev => ({ 
                  ...prev, 
                  status: checked ? "Active" : "Inactive" 
                }))}
                className="data-[state=checked]:bg-green-600"
              />
              <span className="text-sm text-gray-600">{formData.status}</span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-purple-600 to-blue-600">
            Add User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};