import { ApiError } from "@/types/auth";
import { TOKEN_KEY, API_ENDPOINTS } from "@/config/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem(TOKEN_KEY) || localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const adminService = {
  // Overview Stats
  async getOverview() {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_OVERVIEW, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to load overview",
          },
        };
      }

      return { success: data.data };
    } catch (error) {
      return {
        error: { isSuccess: false, message: "Unable to connect to server." },
      };
    }
  },

  // Users
  async getUsers() {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_USERS, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to load users",
          },
        };
      }

      return { success: data.data };
    } catch (error) {
      return {
        error: { isSuccess: false, message: "Unable to connect to server." },
      };
    }
  },

  async getUser(id: number) {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_USER(id), {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to load user",
          },
        };
      }

      return { success: data.data };
    } catch (error) {
      return {
        error: { isSuccess: false, message: "Unable to connect to server." },
      };
    }
  },

  async updateUserStatus(id: number, isActive: boolean) {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_USER_STATUS(id), {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ isActive }),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to update user status",
          },
        };
      }

      return { success: data.data };
    } catch (error) {
      return {
        error: { isSuccess: false, message: "Unable to connect to server." },
      };
    }
  },

  async deleteUser(id: number) {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_USER(id), {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to delete user",
          },
        };
      }

      return { success: true };
    } catch (error) {
      return {
        error: { isSuccess: false, message: "Unable to connect to server." },
      };
    }
  },

  // Assessments
  async getAssessments() {
    try {
      const url = API_ENDPOINTS.ADMIN_ASSESSMENTS;
      console.log("Fetching assessments from:", url);
      
      const response = await fetch(url, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      console.log("Assessment response status:", response.status);

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        console.error("Assessment fetch error:", data);
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to load assessments",
          },
        };
      }

      return { success: data.data };
    } catch (error) {
      console.error("Assessment fetch exception:", error);
      return {
        error: { isSuccess: false, message: "Unable to connect to server." },
      };
    }
  },

  async getAssessment(id: number) {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_ASSESSMENT(id), {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to load assessment",
          },
        };
      }

      return { success: data.data };
    } catch (error) {
      return {
        error: { isSuccess: false, message: "Unable to connect to server." },
      };
    }
  },

  // Resumes
  async getResumes() {
    try {
      const url = API_ENDPOINTS.ADMIN_RESUMES;
      console.log("Fetching resumes from:", url);
      
      const response = await fetch(url, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      console.log("Resume response status:", response.status);

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        console.error("Resume fetch error:", data);
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to load resumes",
          },
        };
      }

      return { success: data.data };
    } catch (error) {
      console.error("Resume fetch exception:", error);
      return {
        error: { isSuccess: false, message: "Unable to connect to server." },
      };
    }
  },

  // Careers
  async getCareers() {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_CAREERS, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to load careers",
          },
        };
      }

      return { success: data.data };
    } catch (error) {
      return {
        error: { isSuccess: false, message: "Unable to connect to server." },
      };
    }
  },

  async createCareer(careerData: {
    name: string;
    description: string;
    requiredSkills?: string[];
    personalityMatchs?: string[];
  }) {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_CAREER, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          Name: careerData.name,
          Description: careerData.description,
          RequiredSkills: careerData.requiredSkills || [],
          PersonalityMatchs: careerData.personalityMatchs || [],
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to create career",
          },
        };
      }

      return { success: data.data };
    } catch (error) {
      return {
        error: { isSuccess: false, message: "Unable to connect to server." },
      };
    }
  },

  async updateCareer(
    id: number,
    careerData: {
      name: string;
      description: string;
      requiredSkills?: string[];
      personalityMatchs?: string[];
    }
  ) {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_CAREER_BY_ID(id), {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          Name: careerData.name,
          Description: careerData.description,
          RequiredSkills: careerData.requiredSkills || [],
          PersonalityMatchs: careerData.personalityMatchs || [],
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to update career",
          },
        };
      }

      return { success: data.data };
    } catch (error) {
      return {
        error: { isSuccess: false, message: "Unable to connect to server." },
      };
    }
  },

  async deleteCareer(id: number) {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_CAREER_BY_ID(id), {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to delete career",
          },
        };
      }

      return { success: true };
    } catch (error) {
      return {
        error: { isSuccess: false, message: "Unable to connect to server." },
      };
    }
  },

  // Skills
  async getSkills() {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_SKILLS, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to load skills",
          },
        };
      }

      return { success: data.data };
    } catch (error) {
      return {
        error: { isSuccess: false, message: "Unable to connect to server." },
      };
    }
  },

  async createSkill(skillData: {
    name: string;
    category: string;
    description?: string;
  }) {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_SKILL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          Name: skillData.name,
          Category: skillData.category,
          Description: skillData.description || "",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to create skill",
          },
        };
      }

      return { success: data.data };
    } catch (error) {
      return {
        error: { isSuccess: false, message: "Unable to connect to server." },
      };
    }
  },

  async updateSkill(
    id: number,
    skillData: {
      name: string;
      category: string;
      description?: string;
    }
  ) {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_SKILL_BY_ID(id), {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          Name: skillData.name,
          Category: skillData.category,
          Description: skillData.description || "",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to update skill",
          },
        };
      }

      return { success: data.data };
    } catch (error) {
      return {
        error: { isSuccess: false, message: "Unable to connect to server." },
      };
    }
  },

  async deleteSkill(id: number) {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_SKILL_BY_ID(id), {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to delete skill",
          },
        };
      }

      return { success: true };
    } catch (error) {
      return {
        error: { isSuccess: false, message: "Unable to connect to server." },
      };
    }
  },

  // Settings
  async getSettings() {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_SETTINGS, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to load settings",
          },
        };
      }

      return { success: data.data };
    } catch (error) {
      return {
        error: { isSuccess: false, message: "Unable to connect to server." },
      };
    }
  },

  async updateSettings(settings: Record<string, string>) {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_SETTINGS, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to update settings",
          },
        };
      }

      return { success: data.data };
    } catch (error) {
      return {
        error: { isSuccess: false, message: "Unable to connect to server." },
      };
    }
  },

  // Stats
  async getTopCareers() {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_STATS_TOP_CAREERS, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to load top careers",
          },
        };
      }

      return { success: data.data };
    } catch (error) {
      return {
        error: { isSuccess: false, message: "Unable to connect to server." },
      };
    }
  },

  // Feedback (admin)
  async getFeedback(): Promise<{ success?: FeedbackItem[]; error?: { isSuccess: false; message: string } }> {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_FEEDBACK, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (!response.ok || !data.isSuccess) {
        return {
          error: { isSuccess: false, message: data.message || "Failed to load feedback" },
        };
      }
      return { success: data.data ?? [] };
    } catch (error) {
      return { error: { isSuccess: false, message: "Unable to connect to server." } };
    }
  },
};

export interface FeedbackItem {
  id: number;
  username: string;
  email: string;
  message: string;
  feedbackType: string;
  submittedAt: string;
}
