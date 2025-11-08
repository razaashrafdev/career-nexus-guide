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
    const restoreSession = async () => {
      try {
        const restoredUser = await authService.restoreSession();
        if (restoredUser) setUser(restoredUser);
      } catch (error) {
        console.error("Failed to restore session:", error);
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

        const loggedInUser: User = {
          fullName: userData.fullName,
          email: userData.email,
          RoleName:userData.RoleName,
          token: userData.token,
          Id: undefined, // backend se id nahi aayi
        };

        setUser(loggedInUser);

        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("token", userData.token);

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
