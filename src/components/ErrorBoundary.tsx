import { useRouteError, useNavigate } from "react-router";
import { ExclamationTriangleIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import Card from "./Card";
import Button from "./Button";

export default function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-full min-h-screen p-4">
      <Card className="w-full max-w-2xl p-6">
        <div className="flex flex-col items-center space-y-6">
          <ExclamationTriangleIcon className="w-16 h-16 text-red-500" />

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Something went wrong</h1>
         </div>

          {error instanceof Error && error.stack && (
            <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-100">
              <details className="w-full">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Technical Details
                </summary>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <pre className="text-xs text-gray-600 overflow-x-auto">
                    {error.stack}
                  </pre>
                </div>
              </details>
            </div>
          )}

          <Button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Go Back</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
