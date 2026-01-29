import { ApiError } from "@/types/auth";
import { TOKEN_KEY, API_ENDPOINTS } from "@/config/api";
export const resumeService = {
  async uploadResume(file: File): Promise<{
    success?: { statusCode: number; data: unknown };
    error?: ApiError;
}> {
  try {
const token = localStorage.getItem(TOKEN_KEY);
// if (!token) {
//   return {
//     error: { isSuccess: false, message: "User not logged in" },
//   };
// }
const guestSessionId = localStorage.getItem("guestSessionId");

const formData = new FormData();
formData.append("ResumeFile", file);


// 👇 guest case support
if (!token && guestSessionId) {
  formData.append("TempSessionId", guestSessionId);
}

const headers: HeadersInit = {};

// 👇 logged-in case
if (token) {
  headers.Authorization = `Bearer ${token}`;
}

const response = await fetch(API_ENDPOINTS.UPLOAD_RESUME, {

  method: "POST",
  body: formData,
  headers,
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

      const response = await fetch(API_ENDPOINTS.GET_LATEST_RESUME, {
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



