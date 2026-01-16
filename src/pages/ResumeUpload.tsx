import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { resumeService } from "@/services/resumeService";
import { useToast } from "@/components/ui/use-toast";

const ResumeUpload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // ===============================
  // ON FILE CHANGE
  // ===============================
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setUploadedFile(e.target.files[0]);
    } else {
      setUploadedFile(null);
    }
  };

  // ===============================
  // ANALYZE / UPLOAD
  // ===============================
  const handleAnalyze = async () => {
    if (!uploadedFile) {
      toast({
        title: "No File Selected",
        description: "Please upload a resume file before analyzing.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const result = await resumeService.uploadResume(uploadedFile);

      if (result.success) {
        // ===============================
        // STEP 2: Just AFTER upload → now call GET /latest
        // ===============================
        const latest = await resumeService.getLatestResume();

        if (!latest.success) {
          toast({
            title: "Resume Analyzed",
            description: "But failed to load latest data.",
          });
        }

        // ===============================
        // Redirect to Dashboard with LATEST resume data
        // ===============================
        navigate("/dashboard", {
          state: {
            from: "resume",
            resumeData: latest.success?.data, // <- Dashboard will receive this
          },
        });
      } else {
        toast({
          title: "Upload Failed",
          description: result.error?.message || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-lg shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            Upload Your Resume
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
            onClick={handleAnalyze}
            disabled={isProcessing}
          >
            {isProcessing ? (
              "Analyzing Resume..."
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" /> Analyze Resume
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeUpload;
