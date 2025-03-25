/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import { Clock, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { StoreContext } from "@/context/StoreContext";
import { useContext } from "react";

// Add this function at the top level, before the component
const getUserIdFromToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    const payload = JSON.parse(jsonPayload);
    return payload.id;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export default function TestDetailPage() {
  const { id } = useParams(); // Get the test ID from the URL
  console.log("testId", id);
  const navigate = useNavigate(); // React Router's navigate function
  const [isLoading, setIsLoading] = useState(false);
  const [test, setTest] = useState(null); // State to store test details
  const [isPurchased, setIsPurchased] = useState(false); // State to track if test is purchased
  const { backendUrl } = useContext(StoreContext);

  // Fetch test details by ID and check if purchased
  useEffect(() => {
    const fetchTestAndCheckPurchase = async () => {
      try {
        setIsLoading(true);
        // Fetch test details
        const testResponse = await axios.get(
          `${backendUrl}/api/auth/tests/${id}`
        );
        if (testResponse.data.success) {
          setTest(testResponse.data.data);
          // Check purchase status
          const purchaseResponse = await axios.get(
            `${backendUrl}/api/order/check-purchase/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          console.log("Check Purchase API Response:", purchaseResponse.data); // ✅ Debug API Response

          if (purchaseResponse.data.success) {
            setIsPurchased(purchaseResponse.data.isPurchased);
            console.log("Is Purchased:", isPurchased);
          } else {
            setIsPurchased(false);
          }
        } else {
          toast.error("Failed to fetch test details");
        }
      } catch (error) {
        console.error("Error fetching test details:", error);
        toast.error("Error fetching test details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestAndCheckPurchase();
  }, [id, backendUrl]);

  // If test not found, show error
  if (!test) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Test not found</h1>
        <p className="mb-6">The test you are looking for does not exist.</p>
        <Link to="/tests">
          <Button>Browse All Tests</Button>
        </Link>
      </div>
    );
  }

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      // Step 1: Create order
      const { data } = await axios.post(
        `${backendUrl}/api/order/razorpay`,
        { testId: test._id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (data.success) {
        console.log("Order created:", data);
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "Mock Test Payment",
          description: `Purchase of ${test.testName}`,
          order_id: data.order.id,
          handler: async (response) => {
            try {
              // Step 2: Verify payment
              const verifyResponse = await axios.post(
                `${backendUrl}/api/order/verifyRazorpay`,
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  testId: test._id,
                  userId: getUserIdFromToken(localStorage.getItem("token")),
                  amount: data.order.amount,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              if (verifyResponse.data.success) {
                toast.success(
                  "Payment Successful! You can now access the test."
                );
                setIsPurchased(true);
                navigate("/dashboard/user");
              } else {
                toast.error(
                  verifyResponse.data.message || "Payment Verification Failed!"
                );
              }
            } catch (error) {
              console.error("Payment verification error:", error);
              toast.error(
                error.response?.data?.message || "Error verifying payment."
              );
            }
          },
          prefill: {
            name: localStorage.getItem("userName") || "User",
            email: localStorage.getItem("userEmail") || "user@example.com",
          },
          theme: {
            color: "#18c201",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

        rzp.on("payment.failed", function (response) {
          toast.error("Payment failed. Please try again.");
        });
      } else {
        toast.error(data.message || "Payment initiation failed.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to process payment. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <Badge className="mb-2">{test.category}</Badge>
            <h1 className="text-3xl font-bold">{test.testName}</h1>
            <p className="text-muted-foreground mt-2">{test.description}</p>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 mt-4">
              <p>{test.longDescription}</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <FileText
                        className="h-5 w-5 text-blue-600"
                        width={20}
                        height={20}
                      />
                      <div>
                        <p className="font-medium">Test Sets</p>
                        <p className="text-muted-foreground">
                          {test.numberOfSets} sets
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Clock
                        className="h-5 w-5 text-blue-600"
                        width={20}
                        height={20}
                      />
                      <div>
                        <p className="font-medium">Duration</p>
                        <p className="text-muted-foreground">
                          {test.timeLimit} minutes
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="syllabus" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Test Syllabus</CardTitle>
                  <CardDescription>Topics covered in this test</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {test.syllabus.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle
                          className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                          width={20}
                          height={20}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="features" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Test Features</CardTitle>
                  <CardDescription>
                    What&apos;s included in this test package
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {test.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle
                          className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                          width={20}
                          height={20}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>
                {isPurchased ? "Access Test" : "Purchase Test"}
              </CardTitle>
              <CardDescription>
                {isPurchased
                  ? "You have already purchased this test"
                  : "Get access to all test sets"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-blue-600">
                ₹{test.price}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className="h-4 w-4 text-green-500"
                    width={16}
                    height={16}
                  />
                  <span>{test.numberOfSets} complete test sets</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className="h-4 w-4 text-green-500"
                    width={16}
                    height={16}
                  />
                  <span>{test.questionsPerSet} questions per set</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className="h-4 w-4 text-green-500"
                    width={16}
                    height={16}
                  />
                  <span>Detailed solutions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className="h-4 w-4 text-green-500"
                    width={16}
                    height={16}
                  />
                  <span>Performance analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle
                    className="h-4 w-4 text-amber-500"
                    width={16}
                    height={16}
                  />
                  <span>Valid for 3 months</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              {isPurchased ? (
                <Button
                  className="w-full"
                  onClick={() => navigate(`/tests/${id}/sets`)}
                >
                  Start Test
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={handlePurchase}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Buy Now"}
                </Button>
              )}
              <p className="text-xs text-center text-muted-foreground">
                By purchasing, you agree to our terms and conditions
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
