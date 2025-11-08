import { ApiError } from "@/types/auth";
const TOKEN_KEY = "career_nexus_token";
const API_BASE_URL = "https://localhost:7270/api/Resume";

export const resumeService = {
  async uploadResume(file: File): Promise<{
    success?: {
      statusCode: number;
      data: {
        matchPercentage: number;
        experience: string;
        matchedSkills: string[];
        missingSkills: string[];
        suggestions: string[];
        careerRecommendation: string[];
        careerCount: number;
      };
    };
    error?: ApiError;
  }> {
    try {
      const formData = new FormData();
      formData.append("ResumeFile", file);
const token = localStorage.getItem(TOKEN_KEY);
      const response = await fetch(`${API_BASE_URL}/UploadResume`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();

      return {
        success: {
          statusCode: response.status,
          data: result.data,
        },
      };
    } catch (error: unknown) { // ✅ no 'any'
      let message = "Failed to upload resume";

      // ✅ Safe type check
      if (error instanceof Error) {
        message = error.message;
      }

      return {
        error: {
          isSuccess: false,
          message,
        },
      };
    }
  },
};
