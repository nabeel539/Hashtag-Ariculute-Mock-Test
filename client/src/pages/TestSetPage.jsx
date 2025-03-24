/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, FileText, ArrowRight } from "lucide-react";

// UI Components
const Button = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center ${className}`}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white border rounded-lg shadow ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children }) => {
  return <div className="p-6">{children}</div>;
};

const CardTitle = ({ children, className = "" }) => {
  return <h3 className={`font-bold ${className}`}>{children}</h3>;
};

const CardDescription = ({ children }) => {
  return <p className="text-gray-500 mt-1">{children}</p>;
};

const CardContent = ({ children }) => {
  return <div className="px-6 pb-4">{children}</div>;
};

const CardFooter = ({ children, className = "" }) => {
  return (
    <div className={`p-6 border-t flex items-center ${className}`}>
      {children}
    </div>
  );
};

const Badge = ({ children, className = "" }) => {
  return (
    <span className={`px-2 py-1 text-xs rounded-full ${className}`}>
      {children}
    </span>
  );
};

const Link = ({ href, children, className = "" }) => {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};

function TestSetsPage({ id }) {
  const navigate = useNavigate();

  // Mock test data
  const test = {
    id: Number(id),
    title: "UPSC Civil Services",
    description: "Preliminary examination mock test with 100 questions",
    price: "₹499",
    sets: [
      {
        id: 1,
        title: "Set 1",
        description: "General Studies Paper I",
        questions: 100,
        time: 120,
        attempted: false,
      },
      {
        id: 2,
        title: "Set 2",
        description: "General Studies Paper I (Advanced)",
        questions: 100,
        time: 120,
        attempted: false,
      },
      {
        id: 3,
        title: "Set 3",
        description: "CSAT Paper II",
        questions: 80,
        time: 120,
        attempted: false,
      },
    ],
  };

  const handleSelectSet = (setId) => {
    navigate(`/tests/${id}/sets/${setId}/instructions`);
  };

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <Link
            href="/dashboard"
            className="flex items-center text-blue-600 hover:underline mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">{test.title}</h1>
          <p className="text-gray-500">{test.description}</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full mt-0.5">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-blue-800">Select a Test Set</h3>
            <p className="text-sm text-blue-700">
              Choose one of the available test sets below. Each set contains
              different questions of similar difficulty.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {test.sets.map((set) => (
            <Card key={set.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">{set.title}</CardTitle>
                  {set.attempted && (
                    <Badge className="bg-green-50 text-green-700 border-green-200">
                      Attempted
                    </Badge>
                  )}
                </div>
                <CardDescription>{set.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{set.questions} Questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{set.time} Minutes</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t bg-gray-50 px-6 py-4">
                <div className="text-sm text-gray-500">
                  {set.attempted
                    ? "You can retake this test set"
                    : "You haven't attempted this set yet"}
                </div>
                <Button onClick={() => handleSelectSet(set.id)}>
                  {set.attempted ? "Retake" : "Start"}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestSetsPage;
