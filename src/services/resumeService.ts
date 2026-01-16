import { ApiError } from "@/types/auth";
const TOKEN_KEY = "career_nexus_token";
const API_BASE_URL = "https://localhost:7270/api/Resume";
export const resumeService = {
  async uploadResume(file: File): Promise<{
    success?: { statusCode: number; data: unknown };
    error?: ApiError;
}> {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
const formData = new FormData();
formData.append("ResumeFile", file);
    const response = await fetch(`${API_BASE_URL}/UploadResume`, {
  method: "POST",
  body: formData,
  headers: {
    Authorization: `Bearer ${token}`, // Token must be sent
  },
});
    const result = await response.json();

    if (!response.ok) {
      return {
        error: { isSuccess: false, message: result?.message || "Failed" },
      };
    }

    return {
      success: {
        statusCode: response.status,
        data: result.data,
      },
    };
  } catch (error) {
    return {
      error: { isSuccess: false, message: "Failed to load latest resume" },
    };
    
  }
},
 async getLatestResume(): Promise<{
    success?: { statusCode: number; data: unknown };
    error?: ApiError;
  }> {
    try {
      const token = localStorage.getItem(TOKEN_KEY);

      const response = await fetch(`${API_BASE_URL}/latest`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          error: { isSuccess: false, message: result?.message || "Failed" },
        };
      }

      return {
        success: { statusCode: response.status, data: result.data },
      };
    } catch {
      return {
        error: { isSuccess: false, message: "Failed to load latest resume" },
      };
    }
  },
};



