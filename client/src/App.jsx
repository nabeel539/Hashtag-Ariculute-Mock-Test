// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/Layout";
import UserDashboardPage from "./pages/UserDashboard";
import AdminDashboardPage from "./pages/AdminDashboard";
import BrowseTestPage from "./pages/BrowseTestPage";
import TestAttemptPage from "./pages/TestPage";
import TestDetailPage from "./pages/TestDetailsPage";
import ResultPage from "./pages/ResultPage";
import CreateTestPage from "./pages/CreateTestPage";
import TestQuestionsPage from "./pages/AddQuestionAdmin";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import AdminLoginPage from "./components/AdminLogin";
import StoreContextProvider from "./context/StoreContext";
import { AdminRoute, UserRoute } from "./components/ProtectedRoute";
import UnauthorizedPage from "./components/UnAutherised";
import VerifyPayment from "./pages/VerifyPayment";
import TermsAndConditions from "./pages/polices/TermsAndConditions";
import PrivacyPolicy from "./pages/polices/PrivacyPolicy";
import RefundPolicy from "./pages/polices/RefundPolicy";

function App() {
  return (
    <StoreContextProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route element={<Layout />}>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/login/admin" element={<AdminLoginPage />} />
            <Route path="/verify-payment" element={<VerifyPayment />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />

            {/* Protected user routes */}
            <Route element={<UserRoute />}>
              <Route path="/dashboard/user" element={<UserDashboardPage />} />
              <Route path="/tests" element={<BrowseTestPage />} />
              <Route path="/tests/:id" element={<TestDetailPage />} />
              <Route path="/tests/:id/attempt" element={<TestAttemptPage />} />
              <Route path="/results/:id" element={<ResultPage />} />
            </Route>

            {/* Protected admin routes */}
            <Route element={<AdminRoute />}>
              <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/tests/create" element={<CreateTestPage />} />
              <Route
                path="/admin/tests/:id/questions"
                element={<TestQuestionsPage />}
              />
            </Route>

            {/* Catch all - 404 */}
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Route>
        </Routes>
      </Router>
    </StoreContextProvider>
  );
}

export default App;
