/**
 * Centralized API Configuration
 * All API URLs and keys are loaded from environment variables
 */

// API Base URLs
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://career-nexus.runasp.net";
export const API_RESUME_BASE_URL = import.meta.env.VITE_API_RESUME_BASE_URL || `${API_BASE_URL}/api/Resume`;
export const API_PERSONALITY_BASE_URL = import.meta.env.VITE_API_PERSONALITY_BASE_URL || `${API_BASE_URL}/api/Personality`;

// Debug: Log API configuration (only in development)
if (import.meta.env.DEV) {
  console.log("API Configuration loaded:", {
    API_BASE_URL,
    API_RESUME_BASE_URL,
    API_PERSONALITY_BASE_URL,
    TOKEN_KEY: import.meta.env.VITE_TOKEN_KEY || "career_nexus_token",
  });
}

// Storage Keys
export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || "career_nexus_token";

// External Services
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "923008974168";

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/api/Account/login`,
  REGISTER: `${API_BASE_URL}/api/Account/Register`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/Account/ForgotPassword`,
  CHANGE_PASSWORD: `${API_BASE_URL}/api/Account/ChangePassword`,
  
  // Resume
  UPLOAD_RESUME: `${API_RESUME_BASE_URL}/UploadResume`,
  GET_LATEST_RESUME: `${API_RESUME_BASE_URL}/latest`,
  
  // Personality Assessment
  ANALYZE_PERSONALITY: `${API_PERSONALITY_BASE_URL}/analyze`,
  
  // Admin
  ADMIN_OVERVIEW: `${API_BASE_URL}/api/Admin/Overview`,
  ADMIN_USERS: `${API_BASE_URL}/api/Admin/Users`,
  ADMIN_USER: (id: number) => `${API_BASE_URL}/api/Admin/User/${id}`,
  ADMIN_USER_STATUS: (id: number) => `${API_BASE_URL}/api/Admin/User/${id}/Status`,
  ADMIN_ASSESSMENTS: `${API_BASE_URL}/api/Admin/Assessments`,
  ADMIN_ASSESSMENT: (id: number) => `${API_BASE_URL}/api/Admin/Assessment/${id}`,
  ADMIN_RESUMES: `${API_BASE_URL}/api/Admin/Resumes`,
  ADMIN_CAREERS: `${API_BASE_URL}/api/Admin/Careers`,
  ADMIN_CAREER: `${API_BASE_URL}/api/Admin/Career`,
  ADMIN_CAREER_BY_ID: (id: number) => `${API_BASE_URL}/api/Admin/Career/${id}`,
  ADMIN_SKILLS: `${API_BASE_URL}/api/Admin/Skills`,
  ADMIN_SKILL: `${API_BASE_URL}/api/Admin/Skill`,
  ADMIN_SKILL_BY_ID: (id: number) => `${API_BASE_URL}/api/Admin/Skill/${id}`,
  ADMIN_SETTINGS: `${API_BASE_URL}/api/Admin/Settings`,
  ADMIN_STATS_TOP_CAREERS: `${API_BASE_URL}/api/Admin/Stats/TopCareers`,
} as const;

// Helper function to get WhatsApp link
export const getWhatsAppLink = (message?: string) => {
  const encodedMessage = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${WHATSAPP_NUMBER}${encodedMessage ? `?text=${encodedMessage}` : ""}`;
};
