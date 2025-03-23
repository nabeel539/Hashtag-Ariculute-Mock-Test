import { BookOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

function UserDashboardPage() {
  // Mock purchased tests data
  const purchasedTests = [
    {
      id: 1,
      title: "UPSC Civil Services",
      description: "Preliminary examination mock test",
      sets: 3,
      completedSets: 1,
      lastAttempted: "2023-03-15",
      expiresOn: "2023-06-15",
    },
    {
      id: 2,
      title: "SSC CGL",
      description: "Combined Graduate Level examination",
      sets: 2,
      completedSets: 2,
      lastAttempted: "2023-03-10",
      expiresOn: "2023-06-10",
    },
  ];

  // Mock test results data
  const testResults = [
    {
      id: 1,
      testId: 1,
      testName: "UPSC Civil Services",
      setNumber: 1,
      score: 68,
      totalQuestions: 100,
      correctAnswers: 68,
      incorrectAnswers: 32,
      timeTaken: "1h 45m",
      date: "2023-03-15",
    },
    {
      id: 2,
      testId: 2,
      testName: "SSC CGL",
      setNumber: 1,
      score: 72,
      totalQuestions: 100,
      correctAnswers: 72,
      incorrectAnswers: 28,
      timeTaken: "52m",
      date: "2023-03-08",
    },
    {
      id: 3,
      testId: 2,
      testName: "SSC CGL",
      setNumber: 2,
      score: 78,
      totalQuestions: 100,
      correctAnswers: 78,
      incorrectAnswers: 22,
      timeTaken: "55m",
      date: "2023-03-10",
    },
  ];

  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your tests and view your performance
          </p>
        </div>

        <Tabs defaultValue="my-tests">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-none md:flex">
            <TabsTrigger value="my-tests">My Tests</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="my-tests" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedTests.map((test) => (
                <Card key={test.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle>{test.title}</CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">
                            {test.completedSets}/{test.sets} sets
                          </span>
                        </div>
                        <Progress
                          value={(test.completedSets / test.sets) * 100}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">
                            Last Attempted
                          </p>
                          <p className="font-medium">
                            {new Date(test.lastAttempted).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Expires On</p>
                          <p className="font-medium">
                            {new Date(test.expiresOn).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <a href={`/tests/${test.id}/attempt`} className="w-full">
                      <Button className="w-full">
                        {test.completedSets === test.sets
                          ? "Review Test"
                          : "Continue Test"}
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              ))}

              <Card className="overflow-hidden border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-full py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Explore More Tests
                  </h3>
                  <p className="text-muted-foreground text-center mb-6">
                    Discover more mock tests to enhance your preparation
                  </p>
                  <a href="/tests">
                    <Button variant="outline">Browse Tests</Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testResults.map((result) => (
                <Card key={result.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{`Set ${result.setNumber}`}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(result.date).toLocaleDateString()}
                      </span>
                    </div>
                    <CardTitle className="mt-2">{result.testName}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Score</span>
                          <span className="font-medium">{result.score}%</span>
                        </div>
                        <Progress
                          value={result.score}
                          className={`${
                            result.score >= 75
                              ? "bg-green-500"
                              : result.score >= 50
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Correct</p>
                          <p className="font-medium text-green-600">
                            {result.correctAnswers}/{result.totalQuestions}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Incorrect</p>
                          <p className="font-medium text-red-600">
                            {result.incorrectAnswers}/{result.totalQuestions}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Time Taken</p>
                          <p className="font-medium">{result.timeTaken}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Date</p>
                          <p className="font-medium">
                            {new Date(result.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <a href={`/results/${result.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        View Detailed Analysis
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default UserDashboardPage;
