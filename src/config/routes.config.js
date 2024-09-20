import { createHashRouter, Navigate } from "react-router-dom";
import PrivateRoute from "../utils/privateRoute";
import LoginPage from "../pages/LoginPage/LoginPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import ExpensesPage from "../pages/ExpensesPage/ExpensesPage";
import IncomePage from "../pages/IncomePage/IncomePage";
import SavingsGoal from "../pages/SavingsPage/SavingsPage";
import ReportPage from "../pages/ReportPage/ReportPage";

const token = sessionStorage.getItem("authToken");

const router = createHashRouter([
  {
    path: "/",
    element: token ? (
      <Navigate to="/dashboard/expenses" />
    ) : (
      <Navigate to="/auth" />
    ),
  },
  {
    path: "/auth",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute element={<DashboardPage />} />,
    children: [
      {
        path: "expenses",
        element: <PrivateRoute element={<ExpensesPage />} />,
      },
      {
        path: "Income",
        element: <PrivateRoute element={<IncomePage />} />,
      },
      {
        path: "savings",
        element: <PrivateRoute element={<SavingsGoal />} />,
      },
      {
        path: "reports",
        element: <PrivateRoute element={<ReportPage />} />,
      },
    ],
  },
]);

export default router;
