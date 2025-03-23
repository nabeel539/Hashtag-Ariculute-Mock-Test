import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Clock, AlertTriangle } from "lucide-react";

// Mock test data
const mockTest = {
  id: 1,
  title: "UPSC Civil Services - Set 1",
  description: "Preliminary examination mock test",
  timeLimit: 120, // in minutes
  questions: [
    {
      id: 1,
      text: "Which of the following is NOT a fundamental right guaranteed by the Indian Constitution?",
      options: [
        { id: "a", text: "Right to Equality" },
        { id: "b", text: "Right to Freedom" },
        { id: "c", text: "Right to Property" },
        { id: "d", text: "Right to Freedom of Religion" },
      ],
      correctAnswer: "c",
    },
    {
      id: 2,
      text: "Who among the following was the first Chairman of the Planning Commission of India?",
      options: [
        { id: "a", text: "Jawaharlal Nehru" },
        { id: "b", text: "Sardar Vallabhbhai Patel" },
        { id: "c", text: "Dr. Rajendra Prasad" },
        { id: "d", text: "Dr. B.R. Ambedkar" },
      ],
      correctAnswer: "a",
    },
    // Add more questions as needed...
  ],
};

export default function TestAttemptPage() {
  const { id } = useParams(); // Get the test ID from the URL
  const navigate = useNavigate(); // React Router's navigate function
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(mockTest.timeLimit * 60); // in seconds
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isTimeUpDialogOpen, setIsTimeUpDialogOpen] = useState(false);

  // Load saved state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem(`test_${id}_state`);
    if (savedState) {
      const {
        currentQuestion: savedQuestion,
        answers: savedAnswers,
        timeLeft: savedTimeLeft,
      } = JSON.parse(savedState);
      setCurrentQuestion(savedQuestion);
      setAnswers(savedAnswers);
      setTimeLeft(savedTimeLeft);
    }
  }, [id]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      `test_${id}_state`,
      JSON.stringify({
        currentQuestion,
        answers,
        timeLeft,
      })
    );
  }, [currentQuestion, answers, timeLeft, id]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUpDialogOpen(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId, answerId) => {
    if (typeof answerId !== "string") {
      console.error("Invalid answerId type:", answerId);
      return;
    }
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestion < mockTest.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  // Navigate to previous question
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  // Handle test submission
  const handleSubmitTest = () => {
    let correctAnswers = 0;
    mockTest.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round(
      (correctAnswers / mockTest.questions.length) * 100
    );

    localStorage.removeItem(`test_${id}_state`);

    alert(`Test Submitted. Your score: ${score}%`);
    navigate(`/results/${id}`);
  };

  // Current question data
  const question = mockTest.questions[currentQuestion];

  // Calculate progress
  const progress =
    (Object.keys(answers).length / mockTest.questions.length) * 100;

  return (
    <div className="container py-6">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{mockTest.title}</h1>
            <p className="text-muted-foreground">{mockTest.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1.5 rounded-md">
              <Clock className="h-4 w-4" />
              <span className="font-medium">{formatTime(timeLeft)}</span>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsSubmitDialogOpen(true)}
            >
              Submit Test
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span>
              {Object.keys(answers).length}/{mockTest.questions.length}{" "}
              questions answered
            </span>
          </div>
          <Progress value={progress} />
        </div>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>
              Question {currentQuestion + 1} of {mockTest.questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-lg font-medium">{question.text}</div>
            <RadioGroup
              value={answers[question.id] || ""} // Ensure value is always a string
              onValueChange={(value) => handleAnswerSelect(question.id, value)}
              className="space-y-3"
            >
              {question.options.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center space-x-2 rounded-md border p-4 ${
                    answers[question.id] === option.id
                      ? "border-blue-500 bg-blue-50"
                      : ""
                  }`}
                >
                  <RadioGroupItem
                    value={option.id}
                    id={`option-${option.id}`}
                  />
                  <Label
                    htmlFor={`option-${option.id}`}
                    className="flex-1 cursor-pointer"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={currentQuestion === mockTest.questions.length - 1}
            >
              Next
            </Button>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {mockTest.questions.map((q, index) => (
            <Button
              key={q.id}
              variant={answers[q.id] ? "default" : "outline"}
              className={`h-10 w-10 p-0 ${
                currentQuestion === index ? "ring-2 ring-offset-2" : ""
              }`}
              onClick={() => setCurrentQuestion(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>

      {/* Submit Test Dialog */}
      <AlertDialog
        open={isSubmitDialogOpen}
        onOpenChange={setIsSubmitDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              You have answered {Object.keys(answers).length} out of{" "}
              {mockTest.questions.length} questions.
              {Object.keys(answers).length < mockTest.questions.length && (
                <div className="mt-2 flex items-center text-amber-600">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span>
                    You have{" "}
                    {mockTest.questions.length - Object.keys(answers).length}{" "}
                    unanswered questions.
                  </span>
                </div>
              )}
              Are you sure you want to submit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmitTest}>
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Time Up Dialog */}
      <AlertDialog
        open={isTimeUpDialogOpen}
        onOpenChange={setIsTimeUpDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Time&apos;s Up!</AlertDialogTitle>
            <AlertDialogDescription>
              Your time for this test has expired. Your answers will be
              automatically submitted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleSubmitTest}>
              View Results
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
