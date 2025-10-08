import { LoginRequest, LoginResponse,RegisterRequest,RegisterResponse, User, ApiError, JWTPayload } from "@/types/auth";

const API_BASE_URL = "https://localhost:7270";
const TOKEN_KEY = "career_nexus_token";

export const authService = {
async login(credentials: LoginRequest): Promise<{
  success?: {
    statusCode: number;
    data: {
      fullName: string;
      email: string;
      roleId: number;
      roleName: string;
      roleType: number;
      token: string;
      isTwoFactorEnabled: boolean;
    };
    message: string;
    isSuccess: boolean;
  };
  error?: ApiError;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Account/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    // ✅ Validation
    if (!response.ok || !data.isSuccess) {
      return {
        error: {
          statusCode: response.status,
          message: data.message || "Login failed",
          isSuccess: false,
        },
      };
    }

    // ✅ Token decode (optional)
    const decoded = this.decodeToken(data.data.token);

    // ✅ Token save
    this.saveToken(data.data.token);

    // ✅ Return standardized success
    return {
      success: {
        statusCode: data.statusCode,
        data: {
          fullName: data.data.fullName,
          email: data.data.email,
          roleId: data.data.roleId,
          roleName: data.data.roleName,
          roleType: data.data.roleType,
          token: data.data.token,
          isTwoFactorEnabled: data.data.isTwoFactorEnabled,
        },
        message: data.message,
        isSuccess: data.isSuccess,
      },
    };
  } catch (error) {
    return {
      error: {
        message: "Unable to connect to server. Please check your connection.",
        isSuccess: false,
      },
    };
  }
},

 async register(newUser: RegisterRequest): Promise<{ success?: RegisterResponse; error?: ApiError }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Account/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data: RegisterResponse | ApiError = await response.json();

    // ✅ ab direct isSuccess check hoga backend se
    if (!("isSuccess" in data) || !data.isSuccess) {
      return {
        error: {
          statusCode: response.status,
          message: "message" in data ? data.message : "Registration failed",
          isSuccess: false,
        },
      };
    }

    // ✅ successful case
    return { success: data as RegisterResponse };

  } catch (error) {
    return {
      error: {
        message: "Unable to connect to server. Please check your connection.",
        isSuccess: false,
      },
    };
  }
},
async forgotPassword(email: string): Promise<{ success?: string; error?: ApiError }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Account/ForgotPassword`, {
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
          message: data.message || "Failed to reset password",
          isSuccess: false,
        },
      };
    }

    return { success: data.message || "Password reset successfully. Check your email." };
  } catch (error) {
    return {
      error: {
        message: "Unable to connect to server. Please check your connection.",
        isSuccess: false,
      },
    };
  }
},
async changePassword(
  oldPassword: string,
  newPassword: string
): Promise<{ success?: { statusCode: number; data: object; message: string; isSuccess: boolean }; error?: ApiError }> {

  try {
    const token = this.getToken(); // JWT token localStorage se lo

    const response = await fetch(`${API_BASE_URL}/api/Account/ChangePassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 👈 token bhejna zaroori hai
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
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
        message: "Unable to connect to server. Please check your connection.",
        isSuccess: false,
      },
    };
  }
},



  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

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

  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  },

  async restoreSession(): Promise<User | null> {
    const token = this.getToken();
    if (!token) return null;

    if (this.isTokenExpired(token)) {
      this.removeToken();
      return null;
    }

    const decoded = this.decodeToken(token);
    if (!decoded) return null;

    return {
      id: decoded.primarysid,
      fullName: decoded.unique_name,
      email: "", // Email not in JWT, would need separate API call if needed
      token,
    };
  },
};
