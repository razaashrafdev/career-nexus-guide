import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/types/auth";

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
const CHAT_STORAGE_KEY = "career_nexus_ai_chat";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface UserDataLike {
  name?: string;
  email?: string;
  careerScore?: number;
  recommendedCareers?: string[];
  skills?: string[];
  resumeUploaded?: boolean;
  assessmentCompleted?: boolean;
  personalityType?: string;
}

interface ResumeDataLike {
  parsedSkills?: string;
  analysis?: { matchPercentage?: number; careerRecommendation?: string[] };
}

interface CareerLike {
  careerName: string;
  jobs?: unknown[];
}

interface DashboardAIChatProps {
  user: User | null;
  userData: UserDataLike;
  resumeData?: ResumeDataLike;
  careers?: CareerLike[];
}

function buildSystemPrompt(
  user: User | null,
  userData: UserDataLike,
  resumeData?: ResumeDataLike,
  careers?: CareerLike[]
): string {
  const name = user?.fullName || userData?.name || "User";
  const role = user?.RoleName || "User";
  const plan = `Career score: ${userData?.careerScore ?? "—"}, Resume uploaded: ${userData?.resumeUploaded ?? false}, Assessment done: ${userData?.assessmentCompleted ?? false}`;
  const recommended = userData?.recommendedCareers?.length
    ? userData.recommendedCareers.join(", ")
    : "None yet";
  const skills = userData?.skills?.length
    ? userData.skills.join(", ")
    : resumeData?.parsedSkills || "None yet";
  const careerList = careers?.length
    ? careers.map((c) => c.careerName).join(", ")
    : "None";

  return `You are an AI assistant inside a SaaS user dashboard for career guidance.
User data (do not use or ask for email):
Name: ${name}
Role: ${role}
Plan/Context: ${plan}
Recommended careers: ${recommended}
Skills: ${skills}
Careers in system: ${careerList}
Only respond based on this dashboard context and career-related questions. Keep answers helpful and concise.
Respond only in English or Roman Urdu (Urdu in Latin script). Do not use Urdu/Arabic script. Use Roman Urdu when the user writes in Roman Urdu; otherwise use English.`;
}

export function DashboardAIChat({
  user,
  userData,
  resumeData,
  careers,
}: DashboardAIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const raw = sessionStorage.getItem(CHAT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ChatMessage[];
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch {
      // ignore
    }
    return [];
  });
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const persistMessages = useCallback((next: ChatMessage[]) => {
    sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(next));
  }, []);

  useEffect(() => {
    persistMessages(messages);
  }, [messages, persistMessages]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text?.trim();
      if (!trimmed || isLoading) return;

      const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const geminiKey2 = import.meta.env.VITE_GEMINI_API_KEY_2;
      if (!geminiKey && !geminiKey2) {
        toast({
          title: "Configuration error",
          description: "At least one Gemini API key must be configured in .env (VITE_GEMINI_API_KEY or VITE_GEMINI_API_KEY_2).",
          variant: "destructive",
        });
        return;
      }

      const userMsg: ChatMessage = { role: "user", content: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setInputValue("");
      setIsLoading(true);

      const systemPrompt = buildSystemPrompt(user, userData, resumeData, careers);
      const geminiContents: { role: string; parts: { text: string }[] }[] = [
        ...messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
        { role: "user", parts: [{ text: trimmed }] },
      ];
      const geminiBody = {
        contents: geminiContents,
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
      };

      let responseText: string | null = null;
      const keysToTry = [geminiKey, geminiKey2].filter(Boolean) as string[];
      try {
        for (const apiKey of keysToTry) {
          try {
            const url = `${GEMINI_API_BASE}?key=${encodeURIComponent(apiKey)}`;
            const res = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(geminiBody),
            });
            if (res.ok) {
              const data = await res.json();
              responseText =
                data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
                "No response from AI.";
              break;
            }
          } catch {
            // try next key
          }
        }

        if (responseText != null) {
          setMessages((prev) => [...prev, { role: "assistant", content: responseText! }]);
        } else {
          toast({
            title: "AI unavailable",
            description: "Primary and fallback Gemini could not respond. Check API keys and try again later.",
            variant: "destructive",
          });
          setMessages((prev) => prev.slice(0, -1));
        }
      } finally {
        setIsLoading(false);
      }
    },
    [user, userData, resumeData, careers, messages, isLoading, toast]
  );

  // FALLBACK: Dono APIs Gemini (alag accounts). Primary = VITE_GEMINI_API_KEY, Fallback = VITE_GEMINI_API_KEY_2

  const handleSend = () => sendMessage(inputValue);
  const handleSuggestion = (text: string) => setInputValue(text);

  return (
    <div className="space-y-4 md:space-y-6 max-w-full">
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg py-3 px-4">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2 text-base md:text-lg font-semibold text-white gap-2">
              <Brain className="h-5 w-5 md:h-6 md:w-6" />
              AI Chat Counselor
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 md:p-4 rounded-lg">
              <h3 className="font-semibold text-base md:text-lg mb-2">Ask Your Career Questions</h3>
              <p className="text-xs md:text-sm text-gray-600 mb-4">
                Get personalized career advice powered by AI. Ask about career paths, skills development,
                job market trends, or any career-related questions you have.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-white min-h-48 md:min-h-64 max-h-64 md:max-h-96 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 py-6 md:py-8">
                    <Brain className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-3 text-purple-400" />
                    <p className="text-sm md:text-base">Start a conversation with your AI Career Counselor</p>
                    <p className="text-xs md:text-sm">Ask questions about careers, skills, or job opportunities</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                            m.role === "user"
                              ? "bg-purple-600 text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {m.content}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-500">
                          Thinking...
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <Input
                  placeholder="Type your career question here..."
                  className="flex-1 text-sm md:text-base min-w-0"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  disabled={isLoading}
                />
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-sm md:text-base px-3 md:px-4 flex-shrink-0"
                  onClick={handleSend}
                  disabled={isLoading || !inputValue.trim()}
                >
                  Send
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs md:text-sm"
                  onClick={() => handleSuggestion("What career suits my personality?")}
                >
                  "What career suits my personality?"
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs md:text-sm"
                  onClick={() => handleSuggestion("How can I improve my skills?")}
                >
                  "How can I improve my skills?"
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs md:text-sm"
                  onClick={() => handleSuggestion("What's the job market like?")}
                >
                  "What's the job market like?"
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
