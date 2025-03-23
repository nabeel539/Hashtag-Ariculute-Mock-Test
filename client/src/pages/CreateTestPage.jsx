// export default CreateTestPage;
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { ArrowLeft, Upload, Plus } from "lucide-react";
import { StoreContext } from "@/context/StoreContext";
import axios from "axios";

// // Mock categories
// const categories = [
//   { id: "upsc", name: "UPSC" },
//   { id: "ssc", name: "SSC" },
//   { id: "banking", name: "Banking" },
//   { id: "railways", name: "Railways" },
//   { id: "state", name: "State PSC" },
//   { id: "engineering", name: "Engineering" },
//   { id: "other", name: "Other" },
// ];
const categories = [
  { id: "rubber-board-field-officer", name: "RUBBER BOARD FIELD OFFICER" },
  { id: "nscl-trainee-agriculture", name: "NSCL TRAINEE AGRICULTURE" },
  { id: "iffco-agt", name: "IFFCO AGT" },
  { id: "afo-prelims", name: "AFO PRELIMS" },
  { id: "afo-mains", name: "AFO MAINS" },
  { id: "afo-interview", name: "AFO INTERVIEW" },
  { id: "fci", name: "FCI" },
  { id: "icar-jrf", name: "ICAR JRF" },
  { id: "cuet-pg", name: "CUET PG" },
  // { id: "upsc", name: "UPSC" },
  // { id: "ssc", name: "SSC" },
  // { id: "banking", name: "Banking" },
  // { id: "railways", name: "Railways" },
  // { id: "state", name: "State PSC" },
  // { id: "engineering", name: "Engineering" },
  { id: "other", name: "Other" },
];

// Basic UI Components
const Card = ({ children, className }) => (
  <div className={`border rounded-lg shadow-sm bg-white ${className || ""}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`p-6 pb-3 ${className || ""}`}>{children}</div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-lg font-medium">{children}</h3>
);

const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-500">{children}</p>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 pt-3 ${className || ""}`}>{children}</div>
);

const CardFooter = ({ children, className }) => (
  <div className={`p-6 pt-0 border-t ${className || ""}`}>{children}</div>
);

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium mb-1">
    {children}
  </label>
);

const Input = ({ id, type = "text", className, ...props }) => (
  <input
    id={id}
    type={type}
    className={`w-full px-3 py-2 border rounded-md ${className || ""}`}
    {...props}
  />
);

const Textarea = ({ id, rows = 3, className, ...props }) => (
  <textarea
    id={id}
    rows={rows}
    className={`w-full px-3 py-2 border rounded-md ${className || ""}`}
    {...props}
  />
);

function CreateTestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [newTestId, setNewTestId] = useState(null);
  const { backendUrl } = useContext(StoreContext);
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    testName: "",
    description: "",
    longDescription: "",
    price: "",
    numberOfSets: "3",
    questionsPerSet: "15",
    timeLimit: "120",
    category: "",
    features: [
      "Detailed solutions",
      "Performance analytics",
      "Topic-wise analysis",
    ],
    syllabus: [""],
    bannerImage: undefined,
  });

  const Button = ({
    children,
    variant = "default",
    size = "default",
    className,
    type = "button",
    disabled,
    onClick,
  }) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "outline":
          return "bg-white border-gray-300 text-gray-700 hover:bg-gray-50";
        case "ghost":
          return "bg-transparent hover:bg-gray-100";
        default:
          return "bg-blue-600 text-white hover:bg-blue-700";
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "py-1 px-3 text-sm";
        case "icon":
          return "p-1";
        default:
          return "py-2 px-4";
      }
    };

    return (
      <button
        type={type}
        disabled={disabled}
        className={`font-medium border rounded-md ${getVariantClasses()} ${getSizeClasses()} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className || ""}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  // Select component
  const Select = ({ children, value, onValueChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          type="button"
          className="w-full px-3 py-2 text-left border rounded-md flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>
            {value
              ? categories.find((c) => c.id === value)?.name
              : "Select a category"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
            <div className="py-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => {
                    onValueChange(category.id);
                    setIsOpen(false);
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Dialog component
  const Dialog = ({ open, onOpenChange, children }) => {
    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => onOpenChange(false)}
        />
        <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-md mx-auto">
          {children}
        </div>
      </div>
    );
  };

  const DialogContent = ({ children }) => <div className="p-6">{children}</div>;
  const DialogHeader = ({ children }) => <div className="mb-4">{children}</div>;
  const DialogTitle = ({ children }) => (
    <h2 className="text-xl font-bold">{children}</h2>
  );
  const DialogDescription = ({ children }) => (
    <p className="text-gray-500 mt-1">{children}</p>
  );
  const DialogFooter = ({ children }) => (
    <div className="mt-6 flex justify-end gap-3">{children}</div>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle adding a new feature
  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  // Handle updating a feature
  const updateFeature = (index, value) => {
    setFormData((prev) => {
      const updatedFeatures = [...prev.features];
      updatedFeatures[index] = value;
      return {
        ...prev,
        features: updatedFeatures,
      };
    });
  };

  // Handle removing a feature
  const removeFeature = (index) => {
    setFormData((prev) => {
      const updatedFeatures = [...prev.features];
      updatedFeatures.splice(index, 1);
      return {
        ...prev,
        features: updatedFeatures,
      };
    });
  };

  // Handle adding a new syllabus item
  const addSyllabusItem = () => {
    setFormData((prev) => ({
      ...prev,
      syllabus: [...prev.syllabus, ""],
    }));
  };

  // Handle updating a syllabus item
  const updateSyllabusItem = (index, value) => {
    setFormData((prev) => {
      const updatedSyllabus = [...prev.syllabus];
      updatedSyllabus[index] = value;
      return {
        ...prev,
        syllabus: updatedSyllabus,
      };
    });
  };

  // Handle removing a syllabus item
  const removeSyllabusItem = (index) => {
    setFormData((prev) => {
      const updatedSyllabus = [...prev.syllabus];
      updatedSyllabus.splice(index, 1);
      return {
        ...prev,
        syllabus: updatedSyllabus,
      };
    });
  };

  const showToast = (message, type = "success") => {
    // Simple toast implementation
    alert(`${type === "success" ? "Success" : "Error"}: ${message}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.testName ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      !selectedImage
    ) {
      showToast(
        "Please fill in all required fields and upload an image",
        "error"
      );
      return;
    }

    // Validate features and syllabus
    if (formData.features.some((feature) => !feature.trim())) {
      showToast("Please fill in all features or remove empty ones", "error");
      return;
    }

    if (formData.syllabus.some((item) => !item.trim())) {
      showToast(
        "Please fill in all syllabus items or remove empty ones",
        "error"
      );
      return;
    }

    try {
      setIsLoading(true);

      // Check if token exists
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Create FormData object
      const formDataToSend = new FormData();

      // Append basic fields
      formDataToSend.append("testName", formData.testName);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("longDescription", formData.longDescription);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("numberOfSets", formData.numberOfSets);
      formDataToSend.append("questionsPerSet", formData.questionsPerSet);
      formDataToSend.append("timeLimit", formData.timeLimit);
      formDataToSend.append("category", formData.category);

      // Append features array
      formData.features.forEach((feature) => {
        formDataToSend.append("features", feature);
      });

      // Append syllabus array
      formData.syllabus.forEach((item) => {
        formDataToSend.append("syllabus", item);
      });

      // Append image file
      formDataToSend.append("bannerImage", selectedImage);

      // Make API call with axios
      const response = await axios.post(
        `${backendUrl}/api/admin/create`,
        formDataToSend,
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle response
      if (response.data && response.data.success) {
        setNewTestId(response.data.testId);
        setShowSuccessDialog(true);
        showToast("Test created successfully");
      } else {
        throw new Error(response.data.message || "Failed to create test");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create test. Please try again.";
      showToast(errorMessage, "error");
      console.error("API Error:", error.response || error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddQuestions = () => {
    if (newTestId) {
      window.location.href = `/admin/tests/${newTestId}/questions`;
    }
  };

  const handleGoToDashboard = () => {
    window.location.href = "/dashboard/admin";
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
          <h1 className="text-3xl font-bold">Create New Test</h1>
          <p className="text-gray-500">Add a new test to your catalog</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Test Information</CardTitle>
                  <CardDescription>
                    Basic information about the test
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="testName">Test Name *</Label>
                    <Input
                      id="testName"
                      name="testName"
                      placeholder="e.g., UPSC Civil Services"
                      value={formData.testName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description *</Label>
                    <Input
                      id="description"
                      name="description"
                      placeholder="e.g., Preliminary examination mock test"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longDescription">
                      Detailed Description
                    </Label>
                    <Textarea
                      id="longDescription"
                      name="longDescription"
                      placeholder="Provide a detailed description of the test"
                      value={formData.longDescription}
                      onChange={handleChange}
                      rows={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleSelectChange("category", value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Test Configuration</CardTitle>
                  <CardDescription>Set up the test parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="numberOfSets">Number of Sets *</Label>
                      <Input
                        id="numberOfSets"
                        name="numberOfSets"
                        type="number"
                        min="1"
                        value={formData.numberOfSets}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="questionsPerSet">
                        Questions per Set *
                      </Label>
                      <Input
                        id="questionsPerSet"
                        name="questionsPerSet"
                        type="number"
                        min="5"
                        value={formData.questionsPerSet}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeLimit">Time Limit (minutes) *</Label>
                      <Input
                        id="timeLimit"
                        name="timeLimit"
                        type="number"
                        min="10"
                        value={formData.timeLimit}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      name="price"
                      placeholder="e.g., 499"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Test Features</CardTitle>
                    <CardDescription>
                      What&apos;s included in this test package
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={addFeature}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Feature
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="e.g., Detailed solutions and explanations"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeature(index)}
                        disabled={formData.features.length <= 1}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-red-500"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Test Syllabus</CardTitle>
                    <CardDescription>
                      Topics covered in this test
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={addSyllabusItem}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Topic
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.syllabus.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={item}
                        onChange={(e) =>
                          updateSyllabusItem(index, e.target.value)
                        }
                        placeholder="e.g., Indian Polity and Governance"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSyllabusItem(index)}
                        disabled={formData.syllabus.length <= 1}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-red-500"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Test Banner</CardTitle>
                  <CardDescription>
                    Upload a banner image for the test
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center ${
                      imagePreview ? "border-blue-500" : ""
                    }`}
                  >
                    {imagePreview ? (
                      <div className="w-full">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-auto rounded-md mb-4 object-cover"
                        />
                        <p className="text-sm text-center text-gray-500 mb-4">
                          {selectedImage?.name} (
                          {(selectedImage?.size || 0) / 1024 < 1000
                            ? `${Math.round(
                                (selectedImage?.size || 0) / 1024
                              )} KB`
                            : `${(
                                (selectedImage?.size || 0) /
                                1024 /
                                1024
                              ).toFixed(2)} MB`}
                          )
                        </p>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 text-center mb-2">
                          Drag and drop an image, or click to browse
                        </p>
                      </>
                    )}
                    <Input
                      id="bannerImage"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        document.getElementById("bannerImage")?.click()
                      }
                    >
                      {imagePreview ? "Change Image" : "Choose Image"}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Recommended size: 1200 x 600 pixels. Max file size: 2MB.
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Creating Test..." : "Create Test"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => (window.location.href = "/admin/dashboard")}
                  >
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </form>

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Created Successfully!</DialogTitle>
              <DialogDescription>
                Your test{" "}
                <span className="font-bold text-gray-600">
                  {formData.testName}
                </span>{" "}
                has been created. What would you like to do next?
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-500 mb-2">Test Details:</p>
              <ul className="text-sm space-y-1">
                <li>
                  <strong>Name:</strong> {formData.testName}
                </li>
                <li>
                  <strong>Category:</strong>{" "}
                  {categories.find((c) => c.id === formData.category)?.name}
                </li>
                <li>
                  <strong>Sets:</strong> {formData.numberOfSets}
                </li>
                <li>
                  <strong>Questions per Set:</strong> {formData.questionsPerSet}
                </li>
                <li>
                  <strong>Price:</strong> ₹{formData.price}
                </li>
              </ul>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleGoToDashboard}>
                Go to Dashboard
              </Button>
              {/* <Button onSubmit={handleSubmit}>Add Questions Now</Button> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTestPage;
