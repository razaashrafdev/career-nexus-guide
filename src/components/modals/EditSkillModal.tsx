import { useState, useEffect } from "react";
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

interface EditSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: SkillData | null;
  onSave: (skill: SkillData) => void;
}

export const EditSkillModal = ({ isOpen, onClose, skill, onSave }: EditSkillModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    category: ""
  });

  const categories = ["Technical", "Soft Skills", "Leadership", "Creative", "Analytical"];

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name,
        category: skill.category
      });
    }
  }, [skill]);

  const handleSave = () => {
    if (!skill) return;
    
    const updatedSkill = {
      ...skill,
      ...formData
    };
    
    onSave(updatedSkill);
    onClose();
  };

  if (!skill) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Edit Skill
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
            />
          </div>
          
          <div>
            <Label htmlFor="category">Skill Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
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
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <Label className="text-sm font-medium text-gray-600">Linked Careers</Label>
            <div className="mt-1 space-y-1">
              {skill.linkedCareers.map((career, index) => (
                <div key={index} className="text-sm text-gray-700">
                  • {career}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-blue-600">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};