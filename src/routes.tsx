import { createBrowserRouter } from "react-router";

// Pages
import HomePage from "./pages/Home";
import ActivityPage from "./pages/Activity";
import QuestionPage from "./pages/Question";
import ResultPage from "./pages/Result";

// Error Boundary
import ErrorBoundary from "./components/ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: "/activity/:activityId",
    element: <ActivityPage />,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        path: "question/:activityQuestionId",
        element: <QuestionPage />,
      },
      {
        path: "result",
        element: <ResultPage />,
      }
    ]
  },
]);
