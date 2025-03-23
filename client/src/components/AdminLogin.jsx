// /* eslint-disable no-unused-vars */
// import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import axios from "axios";
// import { StoreContext } from "@/context/StoreContext";
// // import { toast } from "react-toastify";

// export default function AdminLoginPage() {
//   // const history = useHistory();
//   const { backendUrl } = useContext(StoreContext);
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!formData.email || !formData.password) {
//       alert("All fields are required");
//       return;
//     }

//     try {
//       setIsLoading(true);

//       // Check for admin login
//       const res = axios.post(`${backendUrl}/api/admin/login`, {
//         email: formData.email,
//         password: formData.password,
//       });
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // toast({
//       //   title: "Success",
//       //   description: "Logged in successfully",
//       // });
//       alert("Logged in successfully");

//       // Redirect to dashboard
//       // history.push("/dashboard");
//     } catch (error) {
//       // toast({
//       //   title: `Error ${error}`,
//       //   description: "Invalid email or password",
//       //   variant: "destructive",
//       // });
//       alert("Invalid email or password || ${error}");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
//       <Card className="w-full max-w-md">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
//           <CardDescription>
//             Enter your credentials below to login
//           </CardDescription>
//         </CardHeader>
//         <form onSubmit={handleSubmit}>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="john@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <Label htmlFor="password">Password</Label>
//                 {/* <Link
//                   to="/auth/forgot-password"
//                   className="text-sm text-blue-600 hover:underline"
//                 >
//                   Forgot password?
//                 </Link> */}
//               </div>
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </CardContent>
//           <CardFooter className="flex flex-col space-y-4">
//             <Button type="submit" className="w-full" disabled={isLoading}>
//               {isLoading ? "Logging in..." : "Login"}
//             </Button>
//             {/* <div className="text-center text-sm">
//               Don&apos;t have an account?{" "}
//               <Link
//                 to="/auth/register"
//                 className="text-blue-600 hover:underline"
//               >
//                 Sign up
//               </Link>
//             </div> */}
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   );
// }
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { StoreContext } from "@/context/StoreContext";
// import { toast } from "react-toastify";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { backendUrl, login } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    try {
      setIsLoading(true);

      // Send login request to API
      const response = await axios.post(`${backendUrl}/api/admin/login`, {
        email: formData.email,
        password: formData.password,
      });

      // Check if response has the expected format
      if (response.data && response.data.success && response.data.token) {
        // Use the login function from context
        login(response.data.token, response.data.role);

        alert("Logged in successfully");

        // Redirect based on role
        if (response.data.role === "admin") {
          navigate("/dashboard/admin");
        } else {
          navigate("/dashboard/user");
        }
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(`Invalid email or password || ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials below to login
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
