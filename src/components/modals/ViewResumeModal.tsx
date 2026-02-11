import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, User, Calendar, Download } from "lucide-react";

export interface ResumeData {
  id: number;
  userId?: number;
  userName: string;
  fileName: string;
  status: string;
  uploadDate: string;
  skills?: string[];
  fileURL?: string;
}

interface ViewResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData | null;
  onDownload?: (resume: ResumeData) => void | Promise<void>;
}

/** Show only filename (no path) e.g. "resumes/47/RazaResume.pdf" → "RazaResume.pdf" */
const getDisplayFileName = (fileName: string | null | undefined) => {
  if (!fileName) return "N/A";
  const parts = String(fileName).replace(/\\/g, "/").split("/");
  return parts[parts.length - 1] || fileName;
};

export const ViewResumeModal = ({ isOpen, onClose, resume, onDownload }: ViewResumeModalProps) => {
  if (!resume) return null;

  const skillsList = resume.skills || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Resume Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">User</label>
              <div className="flex items-center gap-2 mt-1">
                <User className="h-4 w-4 text-gray-400" />
                <p className="text-sm font-medium">{resume.userName || "Guest"}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">File</label>
              <div className="flex items-center gap-2 mt-1">
                <FileText className="h-4 w-4 text-gray-400" />
                <p className="text-sm truncate" title={resume.fileName}>{getDisplayFileName(resume.fileName)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <div className="mt-1">
                  <Badge
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    variant={resume.status === "Analyzed" ? "default" : "secondary"}
                  >
                    {resume.status || "Pending"}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Upload Date</label>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <p className="text-sm">{resume.uploadDate || "N/A"}</p>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Extracted Skills</label>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {skillsList.length > 0 ? (
                  <>
                    {skillsList.slice(0, 5).map((skill: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {skillsList.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{skillsList.length - 5}
                      </Badge>
                    )}
                  </>
                ) : (
                  <span className="text-sm text-gray-400">No skills extracted</span>
                )}
              </div>
            </div>
          </div>

          {resume.fileURL && onDownload && (
            <div className="border-t pt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  onDownload(resume);
                  onClose();
                }}
                className="w-full sm:w-auto"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
