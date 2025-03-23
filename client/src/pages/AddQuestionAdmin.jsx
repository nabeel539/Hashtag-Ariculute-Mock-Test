/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// // Import icons from lucide-react
// import { ArrowLeft, Upload, FileText, Check, X } from "lucide-react";

// // Note: You would need to implement these UI components or import them from a UI library
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// // Simple toast implementation (you might want to use a library like react-toastify)
// const toast = ({ title, description, variant }) => {
//   alert(`${title}: ${description}`);
// };

// export default function TestQuestionsPage({ params }) {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);
//   const fileInputRef = useRef(null);

//   // Mock extracted questions from PDF
//   const [extractedQuestions, setExtractedQuestions] = useState([]);

//   // Handle file selection
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   // Handle PDF upload
//   const handlePdfUpload = async (e) => {
//     e.preventDefault();

//     if (!selectedFile) {
//       toast({
//         title: "Error",
//         description: "Please select a PDF file first",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       setIsLoading(true);

//       // This would be replaced with an actual API call to process the PDF
//       // For now, we'll simulate the extraction with mock data
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       // Mock extracted questions from PDF
//       const mockExtractedQuestions = [
//         {
//           id: 1,
//           text: "Which of the following is NOT a fundamental right guaranteed by the Indian Constitution?",
//           options: [
//             { id: "a", text: "Right to Equality" },
//             { id: "b", text: "Right to Freedom" },
//             { id: "c", text: "Right to Property" },
//             { id: "d", text: "Right to Freedom of Religion" },
//           ],
//           correctAnswer: "c",
//         },
//         {
//           id: 2,
//           text: "Who among the following was the first Chairman of the Planning Commission of India?",
//           options: [
//             { id: "a", text: "Jawaharlal Nehru" },
//             { id: "b", text: "Sardar Vallabhbhai Patel" },
//             { id: "c", text: "Dr. Rajendra Prasad" },
//             { id: "d", text: "Dr. B.R. Ambedkar" },
//           ],
//           correctAnswer: "a",
//         },
//         {
//           id: 3,
//           text: "Which of the following rivers does NOT originate in India?",
//           options: [
//             { id: "a", text: "Brahmaputra" },
//             { id: "b", text: "Ganga" },
//             { id: "c", text: "Godavari" },
//             { id: "d", text: "Sutlej" },
//           ],
//           correctAnswer: "a",
//         },
//         {
//           id: 4,
//           text: "The concept of Fundamental Duties in the Indian Constitution was adopted from which country?",
//           options: [
//             { id: "a", text: "USA" },
//             { id: "b", text: "UK" },
//             { id: "c", text: "USSR" },
//             { id: "d", text: "France" },
//           ],
//           correctAnswer: "c",
//         },
//         {
//           id: 5,
//           text: "Which of the following is the largest tiger reserve in India by area?",
//           options: [
//             { id: "a", text: "Jim Corbett National Park" },
//             { id: "b", text: "Nagarjunsagar-Srisailam Tiger Reserve" },
//             { id: "c", text: "Bandipur Tiger Reserve" },
//             { id: "d", text: "Sundarbans Tiger Reserve" },
//           ],
//           correctAnswer: "b",
//         },
//       ];

//       setExtractedQuestions(mockExtractedQuestions);
//       setShowPreview(true);

//       toast({
//         title: "Success",
//         description:
//           "PDF processed successfully. Please review the extracted questions.",
//       });
//     } catch (error) {
//       toast({
//         title: `Error: ${error.code || "Unknown"}`,
//         description: "Failed to process PDF. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle accepting the extracted questions
//   const handleAcceptQuestions = () => {
//     // Here you could save the extracted questions to your backend
//     toast({
//       title: "Questions Imported",
//       description: "The extracted questions have been saved successfully.",
//     });
//     navigate("/dashboard/admin");
//   };

//   // Handle rejecting the extracted questions
//   const handleRejectQuestions = () => {
//     setShowPreview(false);
//     setSelectedFile(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   // Update extracted question
//   const updateExtractedQuestionText = (id, text) => {
//     setExtractedQuestions((prev) =>
//       prev.map((q) => (q.id === id ? { ...q, text } : q))
//     );
//   };

//   // Update extracted option text
//   const updateExtractedOptionText = (questionId, optionId, text) => {
//     setExtractedQuestions((prev) =>
//       prev.map((q) =>
//         q.id === questionId
//           ? {
//               ...q,
//               options: q.options.map((o) =>
//                 o.id === optionId ? { ...o, text } : o
//               ),
//             }
//           : q
//       )
//     );
//   };

//   // Update extracted correct answer
//   const updateExtractedCorrectAnswer = (questionId, correctAnswer) => {
//     setExtractedQuestions((prev) =>
//       prev.map((q) => (q.id === questionId ? { ...q, correctAnswer } : q))
//     );
//   };

//   return (
//     <div className="container py-12">
//       <div className="space-y-6">
//         <div>
//           <a
//             href="/dashboard/admin"
//             className="flex items-center text-blue-600 hover:underline mb-2"
//           >
//             <ArrowLeft className="h-4 w-4 mr-1" />
//             Back to Dashboard
//           </a>
//           <h1 className="text-3xl font-bold">Upload Questions</h1>
//           <p className="text-muted-foreground">
//             Upload a PDF file containing questions for your test
//           </p>
//         </div>

//         {showPreview ? (
//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Preview Extracted Questions</CardTitle>
//                 <CardDescription>
//                   Review and edit the questions extracted from your PDF before
//                   adding them to the test
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Alert className="mb-6">
//                   <FileText className="h-4 w-4" />
//                   <AlertTitle>PDF Processed Successfully</AlertTitle>
//                   <AlertDescription>
//                     We found {extractedQuestions.length} questions in your PDF.
//                     Please review them below.
//                   </AlertDescription>
//                 </Alert>

//                 <div className="space-y-6">
//                   {extractedQuestions.map((question, index) => (
//                     <Card key={question.id}>
//                       <CardHeader>
//                         <CardTitle>Question {index + 1}</CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         <div className="space-y-2">
//                           <Label htmlFor={`extracted-question-${question.id}`}>
//                             Question Text
//                           </Label>
//                           <Input
//                             id={`extracted-question-${question.id}`}
//                             value={question.text}
//                             onChange={(e) =>
//                               updateExtractedQuestionText(
//                                 question.id,
//                                 e.target.value
//                               )
//                             }
//                             placeholder="Enter the question text"
//                             required
//                           />
//                         </div>

//                         <div className="space-y-4">
//                           <Label>Options</Label>
//                           {question.options.map((option) => (
//                             <div
//                               key={option.id}
//                               className="flex items-center gap-4"
//                             >
//                               <div className="w-8 text-center font-medium">
//                                 {option.id.toUpperCase()}
//                               </div>
//                               <Input
//                                 value={option.text}
//                                 onChange={(e) =>
//                                   updateExtractedOptionText(
//                                     question.id,
//                                     option.id,
//                                     e.target.value
//                                   )
//                                 }
//                                 placeholder={`Option ${option.id.toUpperCase()}`}
//                                 required
//                               />
//                             </div>
//                           ))}
//                         </div>

//                         <div className="space-y-2">
//                           <Label>Correct Answer</Label>
//                           <RadioGroup
//                             value={question.correctAnswer}
//                             onValueChange={(value) =>
//                               updateExtractedCorrectAnswer(question.id, value)
//                             }
//                             className="grid grid-cols-2 gap-4"
//                           >
//                             {question.options.map((option) => (
//                               <div
//                                 key={option.id}
//                                 className={`flex items-center space-x-2 rounded-md border p-4 ${
//                                   question.correctAnswer === option.id
//                                     ? "border-green-500 bg-green-50"
//                                     : ""
//                                 }`}
//                               >
//                                 <RadioGroupItem
//                                   value={option.id}
//                                   id={`extracted-option-${question.id}-${option.id}`}
//                                 />
//                                 <Label
//                                   htmlFor={`extracted-option-${question.id}-${option.id}`}
//                                   className="flex-1 cursor-pointer"
//                                 >
//                                   Option {option.id.toUpperCase()}
//                                 </Label>
//                               </div>
//                             ))}
//                           </RadioGroup>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-between">
//                 <Button variant="outline" onClick={handleRejectQuestions}>
//                   <X className="mr-2 h-4 w-4" />
//                   Reject and Upload Again
//                 </Button>
//                 <Button onClick={handleAcceptQuestions}>
//                   <Check className="mr-2 h-4 w-4" />
//                   Accept and Save
//                 </Button>
//               </CardFooter>
//             </Card>
//           </div>
//         ) : (
//           <form onSubmit={handlePdfUpload}>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Upload Questions PDF</CardTitle>
//                 <CardDescription>
//                   Upload a PDF file containing questions in the required format
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center">
//                   <Upload className="h-12 w-12 text-muted-foreground mb-4" />
//                   <p className="text-lg font-medium mb-2">
//                     {selectedFile
//                       ? selectedFile.name
//                       : "Drag and drop your PDF file"}
//                   </p>
//                   <p className="text-sm text-muted-foreground text-center mb-6">
//                     {selectedFile
//                       ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
//                       : "or click to browse your files"}
//                   </p>
//                   <Input
//                     id="pdf-upload"
//                     type="file"
//                     accept=".pdf"
//                     className="hidden"
//                     onChange={handleFileChange}
//                     ref={fileInputRef}
//                   />
//                   <Button
//                     variant="outline"
//                     type="button"
//                     onClick={() =>
//                       document.getElementById("pdf-upload")?.click()
//                     }
//                   >
//                     {selectedFile ? "Change PDF" : "Choose PDF"}
//                   </Button>
//                 </div>
//                 <div className="space-y-2">
//                   <p className="text-sm font-medium">
//                     PDF Format Requirements:
//                   </p>
//                   <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
//                     <li>Each question must be clearly numbered</li>
//                     <li>Options should be labeled as A, B, C, D</li>
//                     <li>
//                       Correct answers should be marked or listed separately
//                     </li>
//                     <li>Maximum file size: 10MB</li>
//                   </ul>
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-end gap-4">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => navigate("/admin/dashboard")}
//                 >
//                   Cancel
//                 </Button>
//                 <Button type="submit" disabled={isLoading || !selectedFile}>
//                   {isLoading ? "Processing PDF..." : "Upload and Process"}
//                 </Button>
//               </CardFooter>
//             </Card>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import { ArrowLeft, Upload, FileText, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { StoreContext } from "@/context/StoreContext";

// Simple toast implementation
const toast = ({ title, description }) => {
  alert(`${title}: ${description}`);
};

export default function TestQuestionsPage() {
  const { id: testId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);
  const [token, setToken] = useState("");

  const [extractedQuestions, setExtractedQuestions] = useState([]);
  const { backendUrl } = useContext(StoreContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, [token]);

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle PDF upload
  const handlePdfUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a PDF file first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("pdfFile", selectedFile);

      // Make the API call to upload and extract questions
      const response = await axios.post(
        `${backendUrl}/api/admin/extract-questions`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Set the extracted questions from the API response
        setExtractedQuestions(response.data.questions);
        setShowPreview(true);

        toast({
          title: "Success",
          description:
            "PDF processed successfully. Please review the extracted questions.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to process PDF. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
      toast({
        title: `Error: ${error.code || "Unknown"}`,
        description: "Failed to process PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle accepting the extracted questions
  const handleAcceptQuestions = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/admin/save-questions`,
        {
          testId: testId,
          questions: extractedQuestions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        }
      );

      if (response.data.success) {
        toast({
          title: "Questions Imported",
          description: "The extracted questions have been saved successfully.",
        });
        navigate("/dashboard/admin");
      } else {
        toast({
          title: "Error",
          description: "Failed to save questions. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving questions:", error);
      toast({
        title: `Error: ${error.code || "Unknown"}`,
        description: "Failed to save questions. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle rejecting the extracted questions
  const handleRejectQuestions = () => {
    setShowPreview(false);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Update extracted question
  const updateExtractedQuestionText = (id, text) => {
    setExtractedQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, text } : q))
    );
  };

  // Update extracted option text
  const updateExtractedOptionText = (questionId, optionId, text) => {
    setExtractedQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) =>
                o.id === optionId ? { ...o, text } : o
              ),
            }
          : q
      )
    );
  };

  // Update extracted correct answer
  const updateExtractedCorrectAnswer = (questionId, correctAnswer) => {
    setExtractedQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, correctAnswer } : q))
    );
  };

  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div>
          <a
            href="/dashboard/admin"
            className="flex items-center text-blue-600 hover:underline mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </a>
          <h1 className="text-3xl font-bold">Upload Questions</h1>
          <p className="text-muted-foreground">
            Upload a PDF file containing questions for your test
          </p>
        </div>

        {showPreview ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview Extracted Questions</CardTitle>
                <CardDescription>
                  Review and edit the questions extracted from your PDF before
                  adding them to the test
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6">
                  <FileText className="h-4 w-4" />
                  <AlertTitle>PDF Processed Successfully</AlertTitle>
                  <AlertDescription>
                    We found {extractedQuestions.length} questions in your PDF.
                    Please review them below.
                  </AlertDescription>
                </Alert>

                <div className="space-y-6">
                  {extractedQuestions.map((question, index) => (
                    <Card key={question.id}>
                      <CardHeader>
                        <CardTitle>Question {index + 1}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`extracted-question-${question.id}`}>
                            Question Text
                          </Label>
                          <Input
                            id={`extracted-question-${question.id}`}
                            value={question.text}
                            onChange={(e) =>
                              updateExtractedQuestionText(
                                question.id,
                                e.target.value
                              )
                            }
                            placeholder="Enter the question text"
                            required
                          />
                        </div>

                        <div className="space-y-4">
                          <Label>Options</Label>
                          {question.options.map((option) => (
                            <div
                              key={option.id}
                              className="flex items-center gap-4"
                            >
                              <div className="w-8 text-center font-medium">
                                {option.id.toUpperCase()}
                              </div>
                              <Input
                                value={option.text}
                                onChange={(e) =>
                                  updateExtractedOptionText(
                                    question.id,
                                    option.id,
                                    e.target.value
                                  )
                                }
                                placeholder={`Option ${option.id.toUpperCase()}`}
                                required
                              />
                            </div>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <Label>Correct Answer</Label>
                          <RadioGroup
                            value={question.correctAnswer}
                            onValueChange={(value) =>
                              updateExtractedCorrectAnswer(question.id, value)
                            }
                            className="grid grid-cols-2 gap-4"
                          >
                            {question.options.map((option) => (
                              <div
                                key={option.id}
                                className={`flex items-center space-x-2 rounded-md border p-4 ${
                                  question.correctAnswer === option.id
                                    ? "border-green-500 bg-green-50"
                                    : ""
                                }`}
                              >
                                <RadioGroupItem
                                  value={option.id}
                                  id={`extracted-option-${question.id}-${option.id}`}
                                />
                                <Label
                                  htmlFor={`extracted-option-${question.id}-${option.id}`}
                                  className="flex-1 cursor-pointer"
                                >
                                  Option {option.id.toUpperCase()}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleRejectQuestions}>
                  <X className="mr-2 h-4 w-4" />
                  Reject and Upload Again
                </Button>
                <Button onClick={handleAcceptQuestions}>
                  <Check className="mr-2 h-4 w-4" />
                  Accept and Save
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <form onSubmit={handlePdfUpload}>
            <Card>
              <CardHeader>
                <CardTitle>Upload Questions PDF</CardTitle>
                <CardDescription>
                  Upload a PDF file containing questions in the required format
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center">
                  <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">
                    {selectedFile
                      ? selectedFile.name
                      : "Drag and drop your PDF file"}
                  </p>
                  <p className="text-sm text-muted-foreground text-center mb-6">
                    {selectedFile
                      ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                      : "or click to browse your files"}
                  </p>
                  <Input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() =>
                      document.getElementById("pdf-upload")?.click()
                    }
                  >
                    {selectedFile ? "Change PDF" : "Choose PDF"}
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    PDF Format Requirements:
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Each question must be clearly numbered</li>
                    <li>Options should be labeled as A, B, C, D</li>
                    <li>
                      Correct answers should be marked or listed separately
                    </li>
                    <li>Maximum file size: 10MB</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/dashboard")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading || !selectedFile}>
                  {isLoading ? "Processing PDF..." : "Upload and Process"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        )}
      </div>
    </div>
  );
}
