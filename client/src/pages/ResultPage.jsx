/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Assuming you have Card components
import { Progress } from "@/components/ui/progress"; // Assuming you have a Progress component
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming you have Tabs components
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component
import { CheckCircle, XCircle, Clock, ArrowLeft } from "lucide-react"; // Assuming you're using Lucide icons

// Mock result data
const mockResult = {
  id: 1,
  testId: 1,
  testName: "UPSC Civil Services - Set 1",
  score: 68,
  totalQuestions: 15,
  correctAnswers: 10,
  incorrectAnswers: 5,
  timeTaken: "1h 45m",
  date: "2023-03-15",
  questionWiseAnalysis: [
    { id: 1, isCorrect: true, timeTaken: 85 },
    { id: 2, isCorrect: true, timeTaken: 62 },
    { id: 3, isCorrect: false, timeTaken: 120 },
    { id: 4, isCorrect: true, timeTaken: 75 },
    { id: 5, isCorrect: false, timeTaken: 95 },
    { id: 6, isCorrect: true, timeTaken: 68 },
    { id: 7, isCorrect: true, timeTaken: 55 },
    { id: 8, isCorrect: false, timeTaken: 110 },
    { id: 9, isCorrect: true, timeTaken: 72 },
    { id: 10, isCorrect: true, timeTaken: 65 },
    { id: 11, isCorrect: false, timeTaken: 90 },
    { id: 12, isCorrect: true, timeTaken: 78 },
    { id: 13, isCorrect: true, timeTaken: 60 },
    { id: 14, isCorrect: false, timeTaken: 105 },
    { id: 15, isCorrect: true, timeTaken: 70 },
  ],
  topicWiseAnalysis: [
    { topic: "Indian Polity", correct: 3, total: 4, percentage: 75 },
    { topic: "Geography", correct: 2, total: 3, percentage: 67 },
    { topic: "History", correct: 2, total: 3, percentage: 67 },
    { topic: "Economy", correct: 1, total: 2, percentage: 50 },
    { topic: "Current Affairs", correct: 2, total: 3, percentage: 67 },
  ],
};

export default function ResultPage({ params }) {
  // Format time in seconds to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link
              to="/dashboard/user"
              className="flex items-center text-blue-600 hover:underline mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold">{mockResult.testName}</h1>
            <p className="text-muted-foreground">Test Result</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm">
              {new Date(mockResult.date).toLocaleDateString()}
            </Badge>
            <Button variant="outline">Download Result</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">
                {mockResult.score}%
              </div>
              <Progress value={mockResult.score} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Correct Answers</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {mockResult.correctAnswers}
                </div>
                <div className="text-sm text-muted-foreground">
                  out of {mockResult.totalQuestions}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Incorrect Answers</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {mockResult.incorrectAnswers}
                </div>
                <div className="text-sm text-muted-foreground">
                  out of {mockResult.totalQuestions}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Time Taken</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mockResult.timeTaken}</div>
                <div className="text-sm text-muted-foreground">total time</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="question-analysis">
          <TabsList>
            <TabsTrigger value="question-analysis">
              Question Analysis
            </TabsTrigger>
            <TabsTrigger value="topic-analysis">Topic Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="question-analysis" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Question-wise Analysis</CardTitle>
                <CardDescription>
                  See how you performed on each question
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockResult.questionWiseAnalysis.map((question, index) => (
                    <div key={question.id} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-8 text-center font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-shrink-0">
                        {question.isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <Progress
                          value={100}
                          className={`h-2 ${
                            question.isCorrect ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                      </div>
                      <div className="flex-shrink-0 text-sm text-muted-foreground">
                        {formatTime(question.timeTaken)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="topic-analysis" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Topic-wise Analysis</CardTitle>
                <CardDescription>
                  See how you performed across different topics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockResult.topicWiseAnalysis.map((topic) => (
                    <div key={topic.topic} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{topic.topic}</div>
                        <div className="text-sm">
                          {topic.correct}/{topic.total} ({topic.percentage}%)
                        </div>
                      </div>
                      <Progress
                        value={topic.percentage}
                        className={`${
                          topic.percentage >= 75
                            ? "bg-green-500"
                            : topic.percentage >= 50
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center gap-4">
          <Link to={`/tests/${mockResult.testId}`}>
            <Button variant="outline">View Test Details</Button>
          </Link>
          <Link to="/dashboard/user">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
