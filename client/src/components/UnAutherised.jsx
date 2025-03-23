// src/pages/UnauthorizedPage.jsx
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg mb-8">
        You don&apos;t have permission to access this page.
      </p>
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link to="/">Go to Home</Link>
        </Button>
        <Button asChild>
          <Link to="/auth/login">Login</Link>
        </Button>
      </div>
    </div>
  );
}
