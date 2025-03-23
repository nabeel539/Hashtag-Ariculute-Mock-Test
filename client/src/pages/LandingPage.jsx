// import { Button } from "@/components/ui/button";
// import {
//   UserCheck,
//   Search,
//   ClipboardCheck,
//   BarChart3,
//   ShieldCheck,
// } from "lucide-react";
// import { NavLink } from "react-router-dom";

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-crime-50 to-crime-100 dark:from-crime-900 dark:to-crime-800 flex flex-col">
//       <main className="flex-grow flex items-center justify-center">
//         <div className="container px-4 py-8 md:py-16 flex flex-col lg:flex-row items-center mx-auto max-w-6xl">
//           {/* Hero Section */}
//           <div className="animate-fade-in text-center lg:text-left">
//             <div className="mb-6 inline-flex items-center py-1 px-3 text-sm font-medium rounded-full bg-primary/10 text-primary">
//               <ShieldCheck className="w-4 h-4 mr-1.5" />
//               Crime Record Management System
//             </div>

//             <h1 className="text-4xl md:text-5xl font-bold text-crime-800 dark:text-white mb-4 leading-tight">
//               Modern crime recording for{" "}
//               <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//                 law enforcement
//               </span>
//             </h1>

//             <p className="text-lg text-crime-600 dark:text-crime-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
//               Transform how your agency manages crime data with our centralized
//               digital platform. Replace paper-based systems with efficient
//               digital workflows designed for law enforcement.
//             </p>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
//               {[
//                 {
//                   icon: UserCheck,
//                   title: "Role-Based Access",
//                   desc: "Tailored interfaces for officers, investigators, and administrators",
//                 },
//                 {
//                   icon: Search,
//                   title: "Advanced Search",
//                   desc: "Quickly find cases with powerful search and filtering",
//                 },
//                 {
//                   icon: ClipboardCheck,
//                   title: "Case Management",
//                   desc: "Track cases, update progress, and assign officers",
//                 },
//                 {
//                   icon: BarChart3,
//                   title: "Analytics",
//                   desc: "Generate insights with crime statistics and trends",
//                 },
//               ].map((feature, index) => (
//                 <div
//                   key={index}
//                   className="flex items-start p-4 bg-white dark:bg-crime-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
//                   style={{ animationDelay: `${index * 100}ms` }}
//                 >
//                   <div className="mt-1 mr-3 p-2 rounded-lg bg-primary/10 text-primary">
//                     <feature.icon className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-crime-800 dark:text-white">
//                       {feature.title}
//                     </h3>
//                     <p className="text-sm text-crime-500 dark:text-crime-400">
//                       {feature.desc}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-center lg:justify-start my-8">
//               <Button
//                 asChild
//                 size="lg"
//                 className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white transition-all duration-300 transform hover:scale-105"
//               >
//                 <NavLink to="/auth">Get Started</NavLink>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default LandingPage;

import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Assuming you have Card components
import { ArrowRight, BookOpen, Clock, FileText } from "lucide-react"; // Assuming you're using Lucide icons

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Ace Your Government Job Exams
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                Practice with our comprehensive mock tests designed specifically
                for government job aspirants.
              </p>
            </div>
            <div className="space-x-4">
              <Link to="/tests">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Explore Tests
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10"
                >
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                Why Choose Our Platform
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Comprehensive features designed to maximize your exam
                preparation
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <FileText className="h-12 w-12 text-blue-600 mb-2" />
                  <CardTitle>Realistic Mock Tests</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Our tests mirror the actual exam pattern with similar
                    difficulty levels and question types.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <Clock className="h-12 w-12 text-blue-600 mb-2" />
                  <CardTitle>Timed Practice</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Practice under timed conditions to improve your speed and
                    accuracy during the actual exam.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-blue-600 mb-2" />
                  <CardTitle>Detailed Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Get comprehensive performance reports to identify your
                    strengths and areas for improvement.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tests Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                Popular Tests
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Explore our most popular mock tests for various government exams
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[
                {
                  title: "UPSC Civil Services",
                  description:
                    "Preliminary examination mock test with 100 questions",
                  price: "₹499",
                  sets: 3,
                  questions: 100,
                  time: 120,
                },
                {
                  title: "SSC CGL",
                  description:
                    "Combined Graduate Level examination practice test",
                  price: "₹299",
                  sets: 2,
                  questions: 100,
                  time: 60,
                },
                {
                  title: "Bank PO",
                  description:
                    "Probationary Officer examination with all sections",
                  price: "₹349",
                  sets: 3,
                  questions: 100,
                  time: 60,
                },
                {
                  title: "Railway NTPC",
                  description: "Non-Technical Popular Categories examination",
                  price: "₹249",
                  sets: 2,
                  questions: 100,
                  time: 90,
                },
                {
                  title: "IBPS Clerk",
                  description:
                    "Institute of Banking Personnel Selection Clerk exam",
                  price: "₹299",
                  sets: 2,
                  questions: 100,
                  time: 60,
                },
                {
                  title: "State PSC",
                  description:
                    "State Public Service Commission preliminary test",
                  price: "₹399",
                  sets: 3,
                  questions: 100,
                  time: 120,
                },
              ].map((test, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-0">
                    <CardTitle>{test.title}</CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        <span>{test.sets} Sets</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{test.time} min</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {test.price}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/tests/${index + 1}`} className="w-full">
                      <Button className="w-full">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <Link to="/tests" className="mt-8">
              <Button size="lg" variant="outline">
                View All Tests
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
