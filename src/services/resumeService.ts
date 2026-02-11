import { ApiError } from "@/types/auth";
import { TOKEN_KEY, API_ENDPOINTS } from "@/config/api";
export const resumeService = {
  async uploadResume(file: File): Promise<{
    success?: { statusCode: number; data: unknown; message?: string };
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
      if (guestSessionId) {
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
      const message = result?.message ?? result?.Message ?? "";

      if (!response.ok) {
        return {
          error: {
            isSuccess: result?.isSuccess ?? false,
            message: message || "Something went wrong.",
            statusCode: result?.statusCode ?? response.status,
          },
        };
      }

      return {
        success: {
          statusCode: response.status,
          data: result.data,
          message: message || "Resume analyzed successfully.",
        },
      };
    } catch {
      return {
        error: { isSuccess: false, message: "Failed to upload resume. Please try again." },
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

  async downloadLatestResume(userId?: number): Promise<{
    success?: true;
    error?: ApiError;
  }> {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        return { error: { isSuccess: false, message: "Please sign in to download resume." } };
      }

      const urls =
        userId != null && userId > 0
          ? `${API_ENDPOINTS.DOWNLOAD_LATEST_RESUME}?UserId=${userId}`
          : API_ENDPOINTS.DOWNLOAD_LATEST_RESUME;
      const response = await fetch(urls, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return { error: { isSuccess: false, message: "No resume found to download." } };
        }
        return {
          error: { isSuccess: false, message: response.statusText || "Failed to download resume." },
        };
      }

      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer], { type: "application/pdf" });
      const contentDisposition = response.headers.get("content-disposition");
      let fileName = "resume.pdf";
      if (contentDisposition) {
        const match = contentDisposition.match(/filename\*?=(?:UTF-8'')?([^;]+)/i) || contentDisposition.match(/filename="?([^";]+)"?/i);
        if (match && match[1]) {
          fileName = decodeURIComponent(match[1].trim().replace(/^["']|["']$/g, ""));
        }
      }
      if (!fileName.toLowerCase().endsWith(".pdf")) {
        fileName = fileName ? `${fileName.replace(/\.[^/.]+$/, "")}.pdf` : "resume.pdf";
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return { success: true };
    } catch {
      return { error: { isSuccess: false, message: "Failed to download resume. Please try again." } };
    }
  },
};


