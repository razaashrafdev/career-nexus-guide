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
    // Restore session on app load
    const restoreSession = async () => {
      try {
        const restoredUser = await authService.restoreSession();
        if (restoredUser) {
          setUser(restoredUser);
        }
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
      
      if (result.error) {
        setIsLoading(false);
        return { success: false, error: result.error };
      }

      if (result.user) {
        setUser(result.user);
        setIsLoading(false);
        return { success: true };
      }

      setIsLoading(false);
      return { success: false, error: { message: "Unknown error occurred", isSuccess: false } };
    } catch (error) {
      setIsLoading(false);
      return {
        success: false,
        error: { message: "An unexpected error occurred", isSuccess: false },
      };
    }
  };

  const logout = () => {
    authService.removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
