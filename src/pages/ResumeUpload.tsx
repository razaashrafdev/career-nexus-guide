import { useState } from "react";
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

  // DEBUG 1: File select hone par
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File input changed:", e.target.files);
    if (e.target.files?.length) {
      const file = e.target.files[0];
      console.log("Selected file:", file.name, "| Size:", file.size, "| Type:", file.type);
      setUploadedFile(file);
    } else {
      console.log("No file selected (files array empty)");
      setUploadedFile(null);
    }
  };

  // DEBUG 2: Analyze button click
  const handleAnalyze = async () => {
    console.log("Analyze button clicked!"); // Add log to check if function is entered.
    console.log("Current uploadedFile state:", uploadedFile); // Check if uploadedFile is available.

    if (!uploadedFile) {
      console.log("No file in state → showing toast");
      toast({
        title: "No File Selected",
        description: "Please upload a resume file before analyzing.",
        variant: "destructive",
      });
      return;
    }

    console.log("File found in state:", uploadedFile.name);
    console.log("Starting upload process...");

    setIsProcessing(true);

    try {
      console.log("Calling resumeService.uploadResume()...");
      const result = await resumeService.uploadResume(uploadedFile);
      console.log("API Response received:", result);

      if (result.success) {
        const data = result.success.data;
        console.log("Success! Data:", data);
        console.log("Navigating to dashboard with careers:", data.careerRecommendation);

        navigate("/dashboard", {
          state: {
            from: "resume",
            recommendedCareers: data.careerRecommendation || [],
            careerCount: data.careerRecommendation?.length || 0,
          },
        });
      } else {
        console.log("API returned error:", result.error);
        toast({
          title: "Upload Failed",
          description: result.error?.message || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Unexpected error in upload:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      console.log("Upload process finished. Setting isProcessing = false");
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
