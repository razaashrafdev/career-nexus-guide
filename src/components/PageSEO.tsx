import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const BASE_URL = "https://careernexus-guide.netlify.app";
const DEFAULT_TITLE = "Career Nexus – AI-Powered Smart Career Counselor | Personality Test & Resume Analysis";
const DEFAULT_DESCRIPTION = "Career Nexus helps you discover the right career with AI-powered personality assessment, resume analysis, and personalized career recommendations.";

const ROUTE_SEO: Record<string, { title: string; description: string }> = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  "/about": {
    title: "About Us | Career Nexus – AI Career Guidance for Students",
    description: "Learn about Career Nexus: AI-powered career guidance, personality assessment, and resume analysis helping students find their ideal career path.",
  },
  "/contact": {
    title: "Contact Us | Career Nexus – Get Career Support",
    description: "Contact Career Nexus for career counseling, support, or partnership. We help students with AI personality tests and resume analysis.",
  },
  "/personality-test": {
    title: "Personality Assessment | Career Nexus – Free MBTI-Style Test",
    description: "Take the free Career Nexus personality assessment. Discover your personality type and get AI-powered career recommendations in about 5 minutes.",
  },
  "/resume-upload": {
    title: "Upload Resume | Career Nexus – AI Resume Analysis",
    description: "Upload your resume for AI-powered analysis. Get skill extraction, career match score, and personalized job recommendations from Career Nexus.",
  },
  "/privacy": {
    title: "Privacy Policy | Career Nexus",
    description: "Career Nexus privacy policy. How we collect, use, and protect your data for personality assessment and resume analysis.",
  },
  "/terms": {
    title: "Terms of Service | Career Nexus",
    description: "Terms of service for using Career Nexus career guidance platform, personality test, and resume analysis services.",
  },
};

function updateMetaTag(name: string, content: string, isProperty = false) {
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function PageSEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = ROUTE_SEO[pathname] ?? {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
    };

    document.title = seo.title;
    updateMetaTag("description", seo.description);
    updateMetaTag("og:title", seo.title, true);
    updateMetaTag("og:description", seo.description, true);
    updateMetaTag("og:url", `${BASE_URL}${pathname === "/" ? "" : pathname}`, true);
    updateMetaTag("twitter:title", seo.title);
    updateMetaTag("twitter:description", seo.description);
  }, [pathname]);

  return null;
}
