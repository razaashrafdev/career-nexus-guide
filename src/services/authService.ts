import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
  ApiError,
  JWTPayload,
} from "@/types/auth";
import { API_BASE_URL, TOKEN_KEY, API_ENDPOINTS } from "@/config/api";

export const authService = {
  // ✅ LOGIN
  async login(credentials: LoginRequest): Promise<{
    success?: LoginResponse;
    error?: ApiError;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Account/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            statusCode: response.status,
            message: data.message || "Login failed",
            isSuccess: false,
          },
        };
      }
      // ✅ Token Save
      if (data.data?.token) {
        this.saveToken(data.data.token);
        localStorage.setItem("roleName", data.data.roleName);
        localStorage.setItem("fullName", data.data.fullName);
      }

      return { success: data as LoginResponse };
    } catch (error) {
      return {
        error: {
          message: "Unable to connect to server.",
          isSuccess: false,
        },
      };
    }
  },

  // ✅ REGISTER — capitalize first letter of user's name before sending
  async register(
    newUser: RegisterRequest
  ): Promise<{ success?: RegisterResponse; error?: ApiError }> {
    const capitalizeName = (name: string) =>
      (name || "")
        .trim()
        .split(/\s+/)
        .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ""))
        .join(" ");
    const payload = {
      ...newUser,
      fullname: capitalizeName(newUser.fullname ?? ""),
    };
    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: RegisterResponse | ApiError = await response.json();

      if (!("isSuccess" in data) || !data.isSuccess) {
        return {
          error: {
            statusCode: response.status,
            message: "message" in data ? data.message : "Registration failed",
            isSuccess: false,
          },
        };
      }

      return { success: data as RegisterResponse };
    } catch (error) {
      return {
        error: {
          message: "Unable to connect to server.",
          isSuccess: false,
        },
      };
    }
  },
  // ✅ FORGOT PASSWORD
async forgotPassword(email: string): Promise<{ success?; error?: ApiError }> {
  try {
    const response = await fetch(API_ENDPOINTS.FORGOT_PASSWORD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: {
          statusCode: response.status,
          message: data.message || "Failed to send password reset email",
          isSuccess: false,
        },
      };
    }

    return { success: data };
  } catch (error) {
    return {
      error: {
        message: "Unable to connect to server.",
        isSuccess: false,
      },
    };
  }
},

  // ✅ SUBMIT FEEDBACK (user dashboard)
  async submitFeedback(message: string, feedbackType: "suggestion" | "error"): Promise<{ success?: { data: number }; error?: ApiError }> {
    try {
      const token = this.getToken();
      if (!token) {
        return { error: { message: "Please sign in to submit feedback.", isSuccess: false } };
      }
      const response = await fetch(API_ENDPOINTS.SUBMIT_FEEDBACK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: message.trim(), feedbackType }),
      });
      const data = await response.json();
      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            statusCode: response.status,
            message: data.message || "Failed to submit feedback",
            isSuccess: false,
          },
        };
      }
      return { success: { data: data.data } };
    } catch (error) {
      return {
        error: { message: "Unable to connect to server.", isSuccess: false },
      };
    }
  },

  // ✅ CHANGE PASSWORD (Authorization header fixed)
  async changePassword(oldPassword: string, newPassword: string) {
    try {
      const token = this.getToken();
      if (!token) {
        return {
          error: { message: "Token missing", isSuccess: false },
        };
      }

      const response = await fetch(API_ENDPOINTS.CHANGE_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ fixed header
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            statusCode: response.status,
            message: data.message || "Password change failed",
            isSuccess: false,
          },
        };
      }

      return { success: data };
    } catch (error) {
      return {
        error: {
          message: "Unable to connect to server.",
          isSuccess: false,
        },
      };
    }
  },

  // ✅ TOKEN HANDLERS
  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  // ✅ DECODE TOKEN
  decodeToken(token: string): JWTPayload | null {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  },

  // ✅ TOKEN EXPIRATION CHECK
  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  },

  // ✅ RESTORE SESSION
  async restoreSession(): Promise<User | null> {
    const token = this.getToken();
    if (!token) return null;

    if (this.isTokenExpired(token)) {
      this.removeToken();
      localStorage.removeItem("userData");
      localStorage.removeItem("roleName");
      localStorage.removeItem("fullName");
      return null;
    }

    const decoded = this.decodeToken(token);
    if (!decoded) {
      // Invalid token, clear everything
      this.removeToken();
      localStorage.removeItem("userData");
      localStorage.removeItem("roleName");
      localStorage.removeItem("fullName");
      return null;
    }

    // Try to get RoleName from localStorage if not in token
    const roleName = localStorage.getItem("roleName") || decoded.RoleName || "";
    
    // Get email from token (unique_name) or localStorage
    // unique_name in JWT typically contains the email
    const email = (decoded as any).email || decoded.unique_name || "";
    
    // Get fullName from token or localStorage
    const fullName = decoded.unique_name || localStorage.getItem("fullName") || "";
    
    // If we don't have essential data (email/unique_name), don't restore session
    if (!decoded.unique_name && !email) {
      this.removeToken();
      localStorage.removeItem("userData");
      localStorage.removeItem("roleName");
      localStorage.removeItem("fullName");
      return null;
    }

    // Try to get email from localStorage userData if available
    let finalEmail = email;
    const userDataStr = localStorage.getItem("userData");
    if (userDataStr && !finalEmail) {
      try {
        const userData = JSON.parse(userDataStr);
        finalEmail = userData.email || finalEmail;
      } catch (e) {
        // Ignore parse errors
      }
    }

    // 👇 consistent User return
    return {
      Id: Number(decoded.primarysid) || 0,
      fullName: fullName,
      RoleName: roleName,
      email: finalEmail || decoded.unique_name || "",
      token,
    };
  },
};
