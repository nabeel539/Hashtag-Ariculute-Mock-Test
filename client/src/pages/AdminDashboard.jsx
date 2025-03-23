/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Users, FileText, BarChart, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { StoreContext } from "@/context/StoreContext";
import { columns, DataTableUsers } from "@/components/DataTableUser";
import { DataTableTests, testColumns } from "@/components/DataTableTests";

function AdminDashboardPage() {
  // State for active tab
  const [activeTab, setActiveTab] = useState("tests");
  const [users, setUsers] = useState([]);
  const [tests, setTests] = useState([]);

  const { backendUrl } = useContext(StoreContext);
  const token = localStorage.getItem("token");

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  // Fetch Tests
  const fetchTests = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/tests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTests(data.tests);
        console.log("tests : ", data.tests);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchTests();
    fetchUsers();
  }, [token]);

  // Mock data
  const stats = {
    totalUsers: 256,
    totalTests: 12,
    activeUsers: 178,
    revenue: "₹45,890",
  };

  // Card component
  const Card = ({ children, className }) => (
    <div className={`rounded-lg border bg-white shadow-sm ${className || ""}`}>
      {children}
    </div>
  );

  const CardHeader = ({ children, className }) => (
    <div className={`px-6 pt-6 ${className || ""}`}>{children}</div>
  );

  const CardTitle = ({ children, className }) => (
    <h3 className={`font-medium text-lg ${className || ""}`}>{children}</h3>
  );

  const CardDescription = ({ children }) => (
    <p className="text-sm text-gray-500">{children}</p>
  );

  const CardContent = ({ children, className }) => (
    <div className={`px-6 py-4 ${className || ""}`}>{children}</div>
  );

  // Button component
  const Button = ({ children, variant, size, className, onClick }) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "outline":
          return "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50";
        case "secondary":
          return "bg-white text-blue-700 hover:bg-gray-100";
        default:
          return "bg-blue-600 text-white hover:bg-blue-700";
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "py-1 px-3 text-sm";
        case "lg":
          return "py-2.5 px-5 text-lg";
        default:
          return "py-2 px-4";
      }
    };

    return (
      <button
        className={`rounded-md font-medium flex items-center justify-center ${getVariantClasses()} ${getSizeClasses()} ${
          className || ""
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-gray-500">
              Manage tests, users, and view analytics
            </p>
          </div>
          <Link to="/admin/tests/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Test
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Tests</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold">{stats.totalTests}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Active Users</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
              <div className="text-3xl font-bold">{stats.activeUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold">{stats.revenue}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold mb-2">
                  Ready to create a new test?
                </h2>
                <p className="text-blue-100">
                  Add a new test to your catalog and start generating revenue.
                </p>
              </div>
              <a href="/admin/tests/create">
                <Button variant="secondary" size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Test
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div>
          <div className="border-b">
            <div className="flex">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "tests"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("tests")}
              >
                Tests
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "users"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("users")}
              >
                Users
              </button>
            </div>
          </div>

          {activeTab === "tests" && (
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Tests</CardTitle>
                  <CardDescription>Manage your test catalog</CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTableTests
                    data={tests}
                    columns={testColumns}
                    fetchTests={fetchTests}
                  ></DataTableTests>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "users" && (
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>Manage your user base</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">
                            Name
                          </th>
                          <th className="text-left py-3 px-4 font-medium">
                            Email
                          </th>
                          <th className="text-left py-3 px-4 font-medium">
                            Tests Purchased
                          </th>
                          <th className="text-left py-3 px-4 font-medium">
                            Joined
                          </th>
                          <th className="text-left py-3 px-4 font-medium">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b">
                            <td className="py-3 px-4">{user.name}</td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4">{user.testsPurchased}</td>
                            <td className="py-3 px-4">
                              {new Date(user.joinedAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <a href={`/admin/users/${user.id}`}>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div> */}
                  <DataTableUsers
                    data={users}
                    columns={columns}
                  ></DataTableUsers>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
