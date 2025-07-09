import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Brain, User, Calendar, TrendingUp } from "lucide-react";

interface AssessmentData {
  id: number;
  userName: string;
  personalityType: string;
  completedDate: string;
  score: number;
}

interface ViewAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: AssessmentData | null;
}

export const ViewAssessmentModal = ({ isOpen, onClose, assessment }: ViewAssessmentModalProps) => {
  if (!assessment) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
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
                <p className="text-sm">{assessment.userName}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Personality Type</label>
              <Badge variant="outline" className="text-sm font-medium">
                {assessment.personalityType}
              </Badge>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Completion Date</label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <p className="text-sm">{assessment.completedDate}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Score</label>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-gray-400" />
                <span className={`text-2xl font-bold ${getScoreColor(assessment.score)}`}>
                  {assessment.score}%
                </span>
                <Badge className={`${assessment.score >= 80 ? 'bg-green-100 text-green-800' : 
                  assessment.score >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                  {getScoreBadge(assessment.score)}
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Additional Details */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-800 mb-3">Assessment Summary</h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                The candidate completed the personality assessment with a {assessment.personalityType} type, 
                indicating strong analytical and strategic thinking abilities. The score of {assessment.score}% 
                reflects {getScoreBadge(assessment.score).toLowerCase()} performance across all assessment criteria.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};