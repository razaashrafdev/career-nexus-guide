import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, LoginRequest, ApiError } from "@/types/auth";
import { authService } from "@/services/authService";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<{ success: boolean; error?: ApiError }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let guestSessionId = localStorage.getItem("guestSessionId");
  if (!guestSessionId) {
    guestSessionId = crypto.randomUUID();
    localStorage.setItem("guestSessionId", guestSessionId);
  }
    const restoreSession = async () => {
      try {
        const token = authService.getToken();
        
        // If no token exists, user is not authenticated
        if (!token) {
          setIsLoading(false);
          return;
        }

        // Check if token is expired locally first
        if (authService.isTokenExpired(token)) {
          authService.removeToken();
          localStorage.removeItem("userData");
          localStorage.removeItem("roleName");
          localStorage.removeItem("fullName");
          setIsLoading(false);
          return;
        }

        // Restore user from token and localStorage
        const restoredUser = await authService.restoreSession();
        
        // Only set user if we have a valid restored user with all required fields
        if (restoredUser && restoredUser.token && restoredUser.email) {
          // Also restore from localStorage if available for consistency
          const userDataStr = localStorage.getItem("userData");
          if (userDataStr) {
            try {
              const userData = JSON.parse(userDataStr);
              // Ensure RoleName is set from localStorage if not in token
              if (userData.roleName && !restoredUser.RoleName) {
                restoredUser.RoleName = userData.roleName;
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
          setUser(restoredUser);
        } else {
          // Invalid session, clear everything
          authService.removeToken();
          localStorage.removeItem("userData");
          localStorage.removeItem("roleName");
          localStorage.removeItem("fullName");
        }
      } catch (error) {
        console.error("Failed to restore session:", error);
        // Clear invalid session on error
        authService.removeToken();
        localStorage.removeItem("userData");
        localStorage.removeItem("roleName");
        localStorage.removeItem("fullName");
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (credentials: LoginRequest): Promise<{ success: boolean; error?: ApiError }> => {
    setIsLoading(true);
    try {
      const result = await authService.login(credentials);

      if (result.error) return { success: false, error: result.error };

      if (result.success?.data) {
        const userData = result.success.data;

        const roleName = (userData as any).roleName || userData.RoleName || localStorage.getItem("roleName") || "";

        const loggedInUser: User = {
          fullName: userData.fullName,
          email: userData.email,
          RoleName: roleName,
          token: userData.token,
          Id: undefined, // backend se id nahi aayi
        };

        setUser(loggedInUser);

        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("token", userData.token);
        // Ensure roleName is stored in localStorage (authService already does this, but ensure it's there)
        if (roleName) {
          localStorage.setItem("roleName", roleName);
        }

// 🔥 GUEST DATA MIGRATION (ADD THIS)
const guestSessionId = localStorage.getItem("guestSessionId");

if (guestSessionId) {
  try {
    await fetch("http://career-nexus.runasp.net/api/Resume/MigrateGuestData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify({ guestSessionId }),
    });

    // guest session clean
    localStorage.removeItem("guestSessionId");
  } catch (err) {
    console.error("Guest data migration failed", err);
  }
}


        return { success: true };
      }

      return { success: false, error: { message: "Unknown error occurred", isSuccess: false } };
    } catch {
      return { success: false, error: { message: "An unexpected error occurred", isSuccess: false } };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.removeToken();
    localStorage.removeItem("userData");
    localStorage.removeItem("roleName");
    localStorage.removeItem("fullName");
    setUser(null); // 👈 force clear user state
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
