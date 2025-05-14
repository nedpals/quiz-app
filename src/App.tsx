import { RouterProvider } from "react-router";
import { router } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QuizDataProvider } from "./data";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QuizDataProvider>
        <RouterProvider router={router} />
      </QuizDataProvider>
    </QueryClientProvider>
  );
}
