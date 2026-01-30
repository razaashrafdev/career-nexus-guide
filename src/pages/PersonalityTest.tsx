import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AnimatedElement } from "@/components/AnimatedElement";
import { TOKEN_KEY, API_ENDPOINTS } from "@/config/api";
import { useToast } from "@/hooks/use-toast";

// 20-question AI-based personality sorter (friendly UI text)
const questions = [
  // Dimension 1: Extraversion (E) vs Introversion (I)
  { id: 1, question: "At social gatherings, do you feel:", options: [
    { text: "Highly energized and outgoing", value: "E++" },
    { text: "Somewhat comfortable and talkative", value: "E+" },
    { text: "Prefer calm conversations with few people", value: "I+" },
    { text: "Drained and quiet, prefer being alone", value: "I++" },
  ]},
  { id: 2, question: "You gain energy mostly from:", options: [
    { text: "Meeting new people and socializing", value: "E++" },
    { text: "Being around friends or small groups", value: "E+" },
    { text: "Spending quiet time to recharge", value: "I+" },
    { text: "Total solitude or alone activities", value: "I++" },
  ]},
  { id: 3, question: "In meetings or group discussions, you usually:", options: [
    { text: "Lead and speak first", value: "E++" },
    { text: "Share ideas confidently", value: "E+" },
    { text: "Speak when asked or when necessary", value: "I+" },
    { text: "Prefer listening quietly", value: "I++" },
  ]},
  { id: 4, question: "When processing your thoughts, you prefer:", options: [
    { text: "Thinking aloud or talking through ideas", value: "E++" },
    { text: "Discussing briefly with someone", value: "E+" },
    { text: "Writing them down privately", value: "I+" },
    { text: "Reflecting alone silently", value: "I++" },
  ]},
  { id: 5, question: "A weekend full of social events makes you feel:", options: [
    { text: "Excited and fulfilled", value: "E++" },
    { text: "Happy but a bit tired", value: "E+" },
    { text: "Slightly drained, needing rest", value: "I+" },
    { text: "Exhausted, preferring total quiet", value: "I++" },
  ]},
  // Dimension 2: Sensing (S) vs Intuition (N)
  { id: 6, question: "You tend to focus more on:", options: [
    { text: "Tangible facts and real details", value: "S++" },
    { text: "What’s practical and proven", value: "S+" },
    { text: "Patterns and possible meanings", value: "N+" },
    { text: "New ideas and unseen possibilities", value: "N++" },
  ]},
  { id: 7, question: "When solving problems, you prefer:", options: [
    { text: "Tested, step-by-step methods", value: "S++" },
    { text: "Realistic adjustments based on data", value: "S+" },
    { text: "Creative or unusual angles", value: "N+" },
    { text: "Abstract brainstorming and innovation", value: "N++" },
  ]},
  { id: 8, question: "You’re more drawn to:", options: [
    { text: "Past experiences and what worked", value: "S++" },
    { text: "Current realities and results", value: "S+" },
    { text: "What could happen next", value: "N+" },
    { text: "Imagining future possibilities", value: "N++" },
  ]},
  { id: 9, question: "When planning a project, you prefer:", options: [
    { text: "Clear instructions and structure", value: "S++" },
    { text: "Practical steps and checklists", value: "S+" },
    { text: "Rough ideas and flexible concepts", value: "N+" },
    { text: "Visionary brainstorming sessions", value: "N++" },
  ]},
  { id: 10, question: "Your thinking is usually:", options: [
    { text: "Concrete and evidence-based", value: "S++" },
    { text: "Realistic but open to new ideas", value: "S+" },
    { text: "Conceptual and big-picture", value: "N+" },
    { text: "Abstract and visionary", value: "N++" },
  ]},
  // Dimension 3: Thinking (T) vs Feeling (F)
  { id: 11, question: "When making decisions, you prioritize:", options: [
    { text: "Objective logic above all", value: "T++" },
    { text: "Fairness with some empathy", value: "T+" },
    { text: "Harmony with reasonable logic", value: "F+" },
    { text: "Emotions and personal values", value: "F++" },
  ]},
  { id: 12, question: "In problem-solving, you tend to:", options: [
    { text: "Focus on facts and analysis", value: "T++" },
    { text: "Balance data with people’s needs", value: "T+" },
    { text: "Consider people first, then logic", value: "F+" },
    { text: "Follow your heart completely", value: "F++" },
  ]},
  { id: 13, question: "During conflicts, you prefer to:", options: [
    { text: "Stick strictly to principles or rules", value: "T++" },
    { text: "Discuss rationally but politely", value: "T+" },
    { text: "Preserve relationships even if rules bend", value: "F+" },
    { text: "Avoid hurt feelings above all", value: "F++" },
  ]},
  { id: 14, question: "When giving feedback, you’re more likely to be:", options: [
    { text: "Very direct and honest", value: "T++" },
    { text: "Honest but tactful", value: "T+" },
    { text: "Polite and gentle", value: "F+" },
    { text: "Extremely cautious not to offend", value: "F++" },
  ]},
  { id: 15, question: "You define fairness as:", options: [
    { text: "Equal rules for everyone", value: "T++" },
    { text: "Logical outcomes considering context", value: "T+" },
    { text: "Understanding each person’s needs", value: "F+" },
    { text: "Compassion and care above logic", value: "F++" },
  ]},
  // Dimension 4: Judging (J) vs Perceiving (P)
  { id: 16, question: "Deadlines make you feel:", options: [
    { text: "Energized to finish early", value: "J++" },
    { text: "Motivated to stay on schedule", value: "J+" },
    { text: "Flexible, can adjust as needed", value: "P+" },
    { text: "Stressed — prefer open time", value: "P++" },
  ]},
  { id: 17, question: "You prefer your work style to be:", options: [
    { text: "Fully planned and organized", value: "J++" },
    { text: "Mostly structured with some flexibility", value: "J+" },
    { text: "Adaptive depending on mood", value: "P+" },
    { text: "Spontaneous and unstructured", value: "P++" },
  ]},
  { id: 18, question: "Your to-do lists are usually:", options: [
    { text: "Detailed and checked daily", value: "J++" },
    { text: "Guiding outlines but not strict", value: "J+" },
    { text: "Loose reminders", value: "P+" },
    { text: "Rarely used; you go with flow", value: "P++" },
  ]},
  { id: 19, question: "When making choices, you tend to:", options: [
    { text: "Decide quickly and confidently", value: "J++" },
    { text: "Decide soon after considering facts", value: "J+" },
    { text: "Delay until more information comes", value: "P+" },
    { text: "Keep options open indefinitely", value: "P++" },
  ]},
  { id: 20, question: "You like your environment to be:", options: [
    { text: "Orderly and predictable", value: "J++" },
    { text: "Mostly tidy but adaptable", value: "J+" },
    { text: "Flexible and casual", value: "P+" },
    { text: "Ever-changing and spontaneous", value: "P++" },
  ]},
];

const PersonalityTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 🔥 ENSURE guestSessionId exists (same as resume)
let guestSessionId = localStorage.getItem("guestSessionId");

if (!guestSessionId) {
  guestSessionId = crypto.randomUUID();
  localStorage.setItem("guestSessionId", guestSessionId);
}

  submitAssessment();
}
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const isAnswered = answers[currentQuestion] !== undefined;

  const submitAssessment = async () => {
    try {
      const mapAnswerToScore = (val: string) => {
  switch (val) {
    case "E++":
    case "S++":
    case "T++":
    case "J++":
      return 5;

    case "E+":
    case "S+":
    case "T+":
    case "J+":
      return 4;

    case "I+":
    case "N+":
    case "F+":
    case "P+":
      return 2;

    case "I++":
    case "N++":
    case "F++":
    case "P++":
      return 1;

    default:
      return 3;
  }
};

      // 1️⃣ answers object → ordered array (0–19)
      const answerArray = Object.keys(answers)
  .sort((a, b) => Number(a) - Number(b))
  .map((key) => mapAnswerToScore(answers[Number(key)]));

  const token = localStorage.getItem(TOKEN_KEY);
    const guestSessionId = localStorage.getItem("guestSessionId");
      // 2️⃣ API call
      const response = await fetch(
        `${API_ENDPOINTS.ANALYZE_PERSONALITY}?useAi=true`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
             ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
         body: JSON.stringify({
  answers: answerArray,
  tempSessionId: token ? null : guestSessionId
}),
        }
      );

      const result = await response.json();

      // 3️⃣ success
      if (result.isSuccess) {
        //  if (!token && guestSessionId) localStorage.removeItem("guestSessionId");
        navigate("/dashboard", {
          state: {
            personalityResult: result.data,
          },
        });
      } else {
        toast({
          title: "Assessment Failed",
          description: result.message || "Assessment failed",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Something went wrong while submitting assessment",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header variant="back" />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <AnimatedElement delay={0}>
                <div className="flex justify-between items-center mb-4">
                  <CardTitle className="text-2xl">Personality Assessment</CardTitle>
                  <span className="text-sm text-gray-500">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                </div>
              </AnimatedElement>
              <AnimatedElement delay={80}>
                <Progress value={progress} className="w-full" />
              </AnimatedElement>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <AnimatedElement delay={0}>
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">
                    {questions[currentQuestion].question}
                  </h3>
                </AnimatedElement>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <AnimatedElement key={index} delay={100 + index * 50}>
                      <button
                        onClick={() => handleAnswer(option.value)}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                          answers[currentQuestion] === option.value
                            ? "border-purple-500 bg-purple-50 text-purple-700"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {option.text} {/* Only friendly text shown */}
                      </button>
                    </AnimatedElement>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <AnimatedElement delay={300}>
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                </AnimatedElement>

                <AnimatedElement delay={350}>
                  <Button
                    onClick={handleNext}
                    disabled={!isAnswered}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {currentQuestion === questions.length - 1
                      ? "Complete Test"
                      : "Next"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </AnimatedElement>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PersonalityTest;
