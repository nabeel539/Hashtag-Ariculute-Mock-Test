/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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
import { Circle, CheckCircle, Flag } from "lucide-react";
import { toast } from "sonner";
import { StoreContext } from "@/context/StoreContext";

export default function TestAttemptPage() {
  const { id, setId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questionStatus, setQuestionStatus] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { backendUrl } = useContext(StoreContext);

  // ✅ Fetch test data from API
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/test/${id}/sets/${setId}/questions`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setTest(response.data.data);
          setTimeLeft(response.data.data.timeLimit * 60);
          initializeQuestionStatus(response.data.data.questions);
        } else {
          toast.error("Failed to load test");
          navigate(`/tests/${id}/sets`);
        }
      } catch (error) {
        toast.error("Error fetching test details");
        navigate(`/tests/${id}/sets`);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [id, setId, navigate]);

  // ✅ Initialize question tracking
  const initializeQuestionStatus = (questions) => {
    let status = {};
    questions.forEach((q) => {
      status[q._id] = "notVisited"; // Default status for all questions
    });
    setQuestionStatus(status);
  };

  // ✅ Load saved state on refresh
  useEffect(() => {
    const savedState = localStorage.getItem(`test_${id}_set_${setId}_state`);
    if (savedState) {
      const { savedAnswers, savedQuestionStatus, savedTimeLeft } =
        JSON.parse(savedState);
      setAnswers(savedAnswers);
      setQuestionStatus(savedQuestionStatus);
      setTimeLeft(savedTimeLeft);
    }
  }, [id, setId]);

  // ✅ Save test progress to localStorage
  useEffect(() => {
    localStorage.setItem(
      `test_${id}_set_${setId}_state`,
      JSON.stringify({
        savedAnswers: answers,
        savedQuestionStatus: questionStatus,
        savedTimeLeft: timeLeft,
      })
    );
  }, [answers, questionStatus, timeLeft, id, setId]);

  // ✅ Timer countdown
  useEffect(() => {
    if (!timeLeft) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitDialogOpen(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // ✅ Handle answer selection
  const handleAnswerSelect = (questionId, answerId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
    setQuestionStatus((prev) => ({ ...prev, [questionId]: "answered" }));
  };

  // ✅ Handle question navigation
  const handleNextQuestion = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  // ✅ Handle marking question for review
  const handleMarkForReview = () => {
    setQuestionStatus((prev) => ({
      ...prev,
      [test.questions[currentQuestion]._id]: "markedForReview",
    }));
  };

  // ✅ Handle test submission
  const handleSubmitTest = () => {
    navigate(`/results/${id}`);
  };

  if (loading) return <div>Loading test...</div>;
  if (!test) return <div>Test not found</div>;

  const question = test.questions[currentQuestion];
  const progress = (Object.keys(answers).length / test.questions.length) * 100;

  // ✅ Icons for different question states
  const getQuestionIcon = (status) => {
    switch (status) {
      case "notVisited":
        return <Circle className="text-gray-400" />;
      case "answered":
        return <CheckCircle className="text-green-500" />;
      case "markedForReview":
        return <Flag className="text-yellow-500" />;
      default:
        return <Circle className="text-gray-400" />;
    }
  };

  return (
    <div className="container py-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{test.testName}</h1>
          <div className="bg-amber-100 text-amber-800 px-3 py-1.5 rounded-md">
            ⏳ {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </div>
        </div>

        <Progress value={progress} />

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              Question {currentQuestion + 1} of {test.questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">{question.question}</div>
            <RadioGroup
              onValueChange={(value) => handleAnswerSelect(question._id, value)}
            >
              {question.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} />
                  <Label>{option.text}</Label>
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
            <Button onClick={handleMarkForReview}>Mark for Review</Button>
            <Button
              onClick={handleNextQuestion}
              disabled={currentQuestion === test.questions.length - 1}
            >
              Next
            </Button>
          </CardFooter>
        </Card>

        {/* Question Navigation */}
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {test.questions.map((q, index) => (
            <Button
              key={q._id}
              variant="outline"
              className="h-10 w-10 p-0"
              onClick={() => setCurrentQuestion(index)}
            >
              {getQuestionIcon(questionStatus[q._id])}
              {index + 1}
            </Button>
          ))}
        </div>
      </div>

      {/* Submit Confirmation */}
      <AlertDialog
        open={isSubmitDialogOpen}
        onOpenChange={setIsSubmitDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              You have answered {Object.keys(answers).length} questions.
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
    </div>
  );
}
