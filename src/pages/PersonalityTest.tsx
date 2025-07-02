
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    question: "How do you prefer to work?",
    options: [
      { text: "In a team with lots of collaboration", value: "team" },
      { text: "Independently with minimal supervision", value: "independent" },
      { text: "A mix of both team and solo work", value: "mixed" },
      { text: "Leading and directing others", value: "leadership" }
    ]
  },
  {
    id: 2,
    question: "What energizes you most?",
    options: [
      { text: "Solving complex problems", value: "problem_solving" },
      { text: "Creating something new", value: "creativity" },
      { text: "Helping others succeed", value: "helping" },
      { text: "Analyzing data and patterns", value: "analysis" }
    ]
  },
  {
    id: 3,
    question: "In a perfect work environment, you would:",
    options: [
      { text: "Have flexible hours and remote options", value: "flexibility" },
      { text: "Work in a structured, organized setting", value: "structure" },
      { text: "Be constantly learning new things", value: "learning" },
      { text: "Have opportunities for advancement", value: "advancement" }
    ]
  },
  {
    id: 4,
    question: "Which best describes your communication style?",
    options: [
      { text: "Direct and to the point", value: "direct" },
      { text: "Thoughtful and analytical", value: "analytical" },
      { text: "Enthusiastic and persuasive", value: "persuasive" },
      { text: "Supportive and encouraging", value: "supportive" }
    ]
  },
  {
    id: 5,
    question: "What type of challenges do you enjoy most?",
    options: [
      { text: "Technical and logical puzzles", value: "technical" },
      { text: "Creative and artistic projects", value: "creative" },
      { text: "Strategic and business problems", value: "strategic" },
      { text: "Social and interpersonal challenges", value: "social" }
    ]
  }
];

const PersonalityTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const navigate = useNavigate();

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Test completed, navigate to results
      navigate("/dashboard", { state: { personalityAnswers: answers } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isAnswered = answers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            CareerCompass
          </Link>
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </nav>
      </header>

      {/* Test Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-center mb-4">
                <CardTitle className="text-2xl">Personality Assessment</CardTitle>
                <span className="text-sm text-gray-500">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>
              <Progress value={progress} className="w-full" />
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-800">
                  {questions[currentQuestion].question}
                </h3>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                        answers[currentQuestion] === option.value
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {currentQuestion === questions.length - 1 ? "Complete Test" : "Next"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PersonalityTest;
