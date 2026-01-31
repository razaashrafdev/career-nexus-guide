import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Brain, User, Calendar, TrendingUp } from "lucide-react";

interface AssessmentData {
  id?: number;
  userName?: string;
  personalityType?: string;
  completedDate?: string;
  score?: number;
  UserName?: string;
  PersonalityType?: string;
  CompletedDate?: string;
  Score?: number;
}

interface ViewAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: AssessmentData | null;
}

export const ViewAssessmentModal = ({ isOpen, onClose, assessment }: ViewAssessmentModalProps) => {
  if (!assessment) return null;

  const userName = assessment.userName ?? assessment.UserName ?? "N/A";
  const personalityType = assessment.personalityType ?? assessment.PersonalityType ?? "N/A";
  const completedDate = assessment.completedDate ?? assessment.CompletedDate ?? "N/A";
  const score = Number(assessment.score ?? assessment.Score ?? 0);

  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-green-600";
    if (s >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (s: number) => {
    if (s >= 80) return "Excellent";
    if (s >= 60) return "Good";
    return "Needs Improvement";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Assessment Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Assessment Info */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Assessment Name</label>
              <p className="text-lg font-semibold">Personality Assessment</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Candidate</label>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <p className="text-sm">{userName}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Personality Type</label>
              <Badge variant="outline" className="text-sm font-medium">
                {personalityType}
              </Badge>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Completion Date</label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <p className="text-sm">{completedDate}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Score</label>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-gray-400" />
                <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
                  {score}%
                </span>
                <Badge className={`${score >= 80 ? 'bg-green-100 text-green-800' : 
                  score >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                  {getScoreBadge(score)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};