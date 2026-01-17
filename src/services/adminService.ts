import { ApiError } from "@/types/auth";

const API_BASE_URL = "http://localhost:8080";
const TOKEN_KEY = "career_nexus_token";

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
      const response = await fetch(`${API_BASE_URL}/api/Admin/Overview`, {
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
      const response = await fetch(`${API_BASE_URL}/api/Admin/Users`, {
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
      const response = await fetch(`${API_BASE_URL}/api/Admin/User/${id}`, {
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
      const response = await fetch(`${API_BASE_URL}/api/Admin/User/${id}/Status`, {
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
      const response = await fetch(`${API_BASE_URL}/api/Admin/User/${id}`, {
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
      const response = await fetch(`${API_BASE_URL}/api/Admin/Assessments`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to load assessments",
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

  async getAssessment(id: number) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Admin/Assessment/${id}`, {
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
      const response = await fetch(`${API_BASE_URL}/api/Admin/Resumes`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        return {
          error: {
            isSuccess: false,
            message: data.message || "Failed to load resumes",
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

  // Careers
  async getCareers() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Admin/Careers`, {
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
      const response = await fetch(`${API_BASE_URL}/api/Admin/Career`, {
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
      const response = await fetch(`${API_BASE_URL}/api/Admin/Career/${id}`, {
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
      const response = await fetch(`${API_BASE_URL}/api/Admin/Career/${id}`, {
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
      const response = await fetch(`${API_BASE_URL}/api/Admin/Skills`, {
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
      const response = await fetch(`${API_BASE_URL}/api/Admin/Skill`, {
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
      const response = await fetch(`${API_BASE_URL}/api/Admin/Skill/${id}`, {
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
      const response = await fetch(`${API_BASE_URL}/api/Admin/Skill/${id}`, {
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
      const response = await fetch(`${API_BASE_URL}/api/Admin/Settings`, {
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
      const response = await fetch(`${API_BASE_URL}/api/Admin/Settings`, {
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
      const response = await fetch(`${API_BASE_URL}/api/Admin/Stats/TopCareers`, {
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
};
