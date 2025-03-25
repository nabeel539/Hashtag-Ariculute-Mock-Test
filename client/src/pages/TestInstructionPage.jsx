/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ArrowLeft, AlertTriangle, Info } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { StoreContext } from "@/context/StoreContext";

export default function TestInstructionsPage() {
  const { id, setId } = useParams(); // ✅ Get test ID and set ID
  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [testSet, setTestSet] = useState(null);
  const [loading, setLoading] = useState(true);

  const { backendUrl } = useContext(StoreContext);
  // ✅ Fetch test set details from API
  useEffect(() => {
    const fetchTestSet = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/test/${id}/sets/${setId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setTestSet(response.data.data);
        } else {
          toast.error("Failed to load test set");
          navigate(`/tests/${id}/sets`);
        }
      } catch (error) {
        toast.error("Error fetching test set details");
        navigate(`/tests/${id}/sets`);
      } finally {
        setLoading(false);
      }
    };

    fetchTestSet();
  }, [id, setId, navigate]);

  const handleStartTest = () => {
    if (!agreedToTerms) {
      toast.error("You must agree to the terms before starting the test.");
      return;
    }
    // navigate(`/tests/${id}/attempt?set=${setId}`);
    navigate(`/tests/${id}/sets/${setId}/attempt`);
  };

  if (loading) return <div>Loading test set...</div>;
  if (!testSet) return <div>Test Set not found</div>;

  return (
    <>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <Link
              to={`/tests/${id}/sets`}
              className="flex items-center text-blue-600 hover:underline mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Test Sets
            </Link>
            <h1 className="text-3xl font-bold">
              {testSet.testName} - {testSet.setTitle}
            </h1>
            <p className="text-muted-foreground">{testSet.description}</p>
          </div>

          <Card>
            <CardHeader className="bg-blue-50 border-b">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                <CardTitle>Test Instructions</CardTitle>
              </div>
              <CardDescription>
                Please read the following instructions carefully before starting
                the test.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <h3 className="text-lg font-medium">General Instructions:</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  This test contains {testSet.questions} multiple-choice
                  questions.
                </li>
                <li>The total time duration is {testSet.timeLimit} minutes.</li>
                <li>All questions carry equal marks.</li>
                <li>There is no negative marking for wrong answers.</li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-full mt-0.5">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium text-amber-800">Important Note</h3>
                  <p className="text-sm text-amber-700">
                    Ensure you have a stable internet connection before starting
                    the test.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start border-t bg-muted/20 px-6 py-4 space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked)}
                />
                <label htmlFor="terms" className="text-sm font-medium">
                  I have read and understood the instructions, and agree to
                  follow them.
                </label>
              </div>
              <div className="flex justify-between w-full">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/tests/${id}/sets`)}
                >
                  Go Back
                </Button>
                <Button onClick={handleStartTest} disabled={!agreedToTerms}>
                  Start Test
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
