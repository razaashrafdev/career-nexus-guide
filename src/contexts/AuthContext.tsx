import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, LoginRequest, ApiError } from "@/types/auth";
import { authService } from "@/services/authService";
import { TOKEN_KEY, API_ENDPOINTS } from "@/config/api";

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
        
        // Only set user if we have a valid restored user with token
        if (restoredUser && restoredUser.token) {
          // Also restore from localStorage if available for consistency
          const userDataStr = localStorage.getItem("userData");
          if (userDataStr) {
            try {
              const userData = JSON.parse(userDataStr);
              // Ensure email is set from localStorage if missing
              if (userData.email && !restoredUser.email) {
                restoredUser.email = userData.email;
              }
              // Ensure RoleName is set from localStorage if not in token
              if (userData.roleName && !restoredUser.RoleName) {
                restoredUser.RoleName = userData.roleName;
              }
              // Ensure fullName is set from localStorage if not in token
              if (userData.fullName && !restoredUser.fullName) {
                restoredUser.fullName = userData.fullName;
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
          
          // Final check: ensure we have at least email or unique_name (from token)
          // If email is still missing, try to get it from unique_name in token
          if (!restoredUser.email) {
            const decoded = authService.decodeToken(restoredUser.token);
            if (decoded && decoded.unique_name) {
              restoredUser.email = decoded.unique_name;
            }
          }
          
          // Only set user if we have essential fields (token and email)
          if (restoredUser.email) {
            setUser(restoredUser);
          } else {
            // Missing essential data, clear everything
            authService.removeToken();
            localStorage.removeItem("userData");
            localStorage.removeItem("roleName");
            localStorage.removeItem("fullName");
          }
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

  const login = async (
  credentials: LoginRequest
): Promise<{ success: boolean; error?: ApiError }> => {
  setIsLoading(true);

  try {
    const result = await authService.login(credentials);

    if (result.error) return { success: false, error: result.error };

    if (result.success?.data) {
      const userData = result.success.data;

      const roleName =
        (userData as any).roleName ||
        userData.RoleName ||
        localStorage.getItem("roleName") ||
        "";

      const loggedInUser: User = {
        fullName: userData.fullName,
        email: userData.email,
        RoleName: roleName,
        token: userData.token,
        Id: undefined,
      };

      setUser(loggedInUser);

      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);
      if (roleName) localStorage.setItem("roleName", roleName);



      const guestSessionId = localStorage.getItem("guestSessionId");
      const hasGuestData = localStorage.getItem("hasGuestData");

if (guestSessionId || hasGuestData === "true") {
  try {
    await fetch(API_ENDPOINTS.MIGERATE_USER_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify({
        tempSessionId: guestSessionId,
      }),
    });

    // cleanup
    localStorage.removeItem("guestSessionId");
    localStorage.removeItem("hasGuestData");

  } catch (err) {
    console.error("Guest data migration failed", err);
  }
}

      return { success: true };
    }

    return {
      success: false,
      error: { message: "Unknown error occurred", isSuccess: false },
    };
  } catch {
    return {
      success: false,
      error: { message: "An unexpected error occurred", isSuccess: false },
    };
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
