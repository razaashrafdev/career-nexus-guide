import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
  ApiError,
  JWTPayload,
} from "@/types/auth";

const API_BASE_URL = "https://localhost:7270";
const TOKEN_KEY = "career_nexus_token";

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
 localStorage.setItem(TOKEN_KEY,data.token);
      // ✅ Token Save
      this.saveToken(data.data.token);

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

  // ✅ REGISTER
  async register(
    newUser: RegisterRequest
  ): Promise<{ success?: RegisterResponse; error?: ApiError }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Account/Register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
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

  // ✅ CHANGE PASSWORD (Authorization header fixed)
  async changePassword(oldPassword: string, newPassword: string) {
    try {
      const token = this.getToken();
      if (!token) {
        return {
          error: { message: "Token missing", isSuccess: false },
        };
      }

      const response = await fetch(`${API_BASE_URL}/api/Account/ChangePassword`, {
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
      return null;
    }

    const decoded = this.decodeToken(token);
    if (!decoded) return null;

    // 👇 consistent User return
    return {
      Id: Number(decoded.primarysid) || 0,
      fullName: decoded.unique_name || "",
      RoleName: decoded.RoleName || "",
      email: decoded.email || "",
      token,
    };
  },
};
