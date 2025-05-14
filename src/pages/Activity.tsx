import { Navigate, Outlet, useLocation } from "react-router";
import useQuestionParams from "../hooks/useQuestionParams";
import { useQuizData } from "../data";

export default function ActivityPage() {
  const { isLoading } = useQuizData();
  const { pathname } = useLocation();
  const { questionId, getNextQuestionRoute } = useQuestionParams();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  // If not question id and not result page, redirect to the first question
  if (!questionId && !pathname.includes("/result")) {
    const firstQuestionRoute = getNextQuestionRoute();
    if (!firstQuestionRoute) {
      throw new Error("Next route not found");
    }

    // Just a simple redirect of the activity page to the first question
    return <Navigate to={firstQuestionRoute} replace />;
  }

  return (
    <div className="h-screen w-full min-w-screen min-h-screen px-4">
      <Outlet />
    </div>
  )
}
