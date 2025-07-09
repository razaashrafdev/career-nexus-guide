import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Target, X } from "lucide-react";

interface CareerData {
  id: number;
  name: string;
  description: string;
  requiredTraits: string[];
  skills: string[];
}

interface EditCareerModalProps {
  isOpen: boolean;
  onClose: () => void;
  career: CareerData | null;
  onSave: (career: CareerData) => void;
}

export const EditCareerModal = ({ isOpen, onClose, career, onSave }: EditCareerModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    requiredTraits: [] as string[],
    skills: [] as string[]
  });
  const [newTrait, setNewTrait] = useState("");
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (career) {
      setFormData({
        name: career.name,
        description: career.description,
        requiredTraits: [...career.requiredTraits],
        skills: [...career.skills]
      });
    }
  }, [career]);

  const handleAddTrait = () => {
    if (newTrait.trim() && !formData.requiredTraits.includes(newTrait.trim())) {
      setFormData(prev => ({
        ...prev,
        requiredTraits: [...prev.requiredTraits, newTrait.trim()]
      }));
      setNewTrait("");
    }
  };

  const handleRemoveTrait = (trait: string) => {
    setFormData(prev => ({
      ...prev,
      requiredTraits: prev.requiredTraits.filter(t => t !== trait)
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSave = () => {
    if (!career) return;
    
    const updatedCareer = {
      ...career,
      ...formData
    };
    
    onSave(updatedCareer);
    onClose();
  };

  if (!career) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Edit Career
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Job Title</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter job title"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter job description"
              rows={3}
            />
          </div>
          
          <div>
            <Label>Required Personality Traits</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTrait}
                onChange={(e) => setNewTrait(e.target.value)}
                placeholder="Add personality trait (e.g., INTJ)"
                onKeyPress={(e) => e.key === 'Enter' && handleAddTrait()}
              />
              <Button type="button" onClick={handleAddTrait} size="sm">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.requiredTraits.map((trait) => (
                <Badge key={trait} variant="secondary" className="flex items-center gap-1">
                  {trait}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveTrait(trait)}
                  />
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <Label>Required Skills</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add required skill"
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              />
              <Button type="button" onClick={handleAddSkill} size="sm">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="flex items-center gap-1">
                  {skill}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveSkill(skill)}
                  />
                </Badge>
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