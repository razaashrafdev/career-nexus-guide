import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen } from "lucide-react";

interface SkillData {
  id: number;
  name: string;
  category: string;
  linkedCareers: string[];
}

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (skillData: Omit<SkillData, 'id' | 'linkedCareers'>) => void;
}

export const AddSkillModal = ({ isOpen, onClose, onAdd }: AddSkillModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    category: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = ["Technical", "Soft Skills", "Leadership", "Creative", "Analytical"];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Skill name is required";
    }
    
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAdd({
        name: formData.name,
        category: formData.category
      });
      
      // Reset form
      setFormData({
        name: "",
        category: ""
      });
      setErrors({});
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      category: ""
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Add New Skill
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="skillName">Skill Name</Label>
            <Input
              id="skillName"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter skill name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <Label htmlFor="category">Skill Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Career links will be automatically established based on skill relevance and can be managed later.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-purple-600 to-blue-600">
            Add Skill
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};