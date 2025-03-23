import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { StoreContext } from "@/context/StoreContext";
import { assets } from "@/assets/assets";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { authState, logout } = useContext(StoreContext);

  // Check if user is authenticated
  const isLoggedIn = authState.isAuthenticated;
  // Check user role
  const isAdmin = authState.role === "admin";
  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            {/* <span className="text-xl font-bold">GovTestPrep</span> */}
            <img src={assets.logo} alt="Logo" className="w-10 h-10" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium ${
              location.pathname === "/"
                ? "text-primary"
                : "text-muted-foreground"
            } transition-colors hover:text-primary`}
          >
            Home
          </Link>

          {!isAdmin && (
            <Link
              to="/tests"
              className={`text-sm font-medium ${
                location.pathname === "/tests"
                  ? "text-primary"
                  : "text-muted-foreground"
              } transition-colors hover:text-primary`}
            >
              Tests
            </Link>
          )}

          {/* Only show Admin link if user is admin */}
          {isAdmin && (
            <Link
              to="/dashboard/admin"
              className={`text-sm font-medium ${
                location.pathname.startsWith("/dashboard/admin")
                  ? "text-primary"
                  : "text-muted-foreground"
              } transition-colors hover:text-primary`}
            >
              Admin Dashboard
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to={isAdmin ? "/dashboard/admin" : "/dashboard/user"}>
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/auth/register">
                <Button>Sign Up</Button>
              </Link>
              {/* <Link to="/login/admin">
                <Button variant="outline">Admin Login</Button>
              </Link> */}
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/tests"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Tests
            </Link>

            {/* Only show Admin link if user is admin */}
            {isAdmin && (
              <Link
                to="/dashboard/admin"
                className="text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}

            <div className="border-t pt-4 mt-2 flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link
                    to={isAdmin ? "/dashboard/admin" : "/dashboard/user"}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="ghost" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link
                    to="/auth/register"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                  <Link to="/login/admin" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Admin Login
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
