import { Link } from "react-router";
import { useQuizData } from "../data";
import Card from "../components/Card";
import Button from "../components/Button";

export default function HomePage() {
  const { data } = useQuizData();

  if (!data) {
    // Should not happen, but just in case
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="max-w-80 w-full mx-auto">
        <div className="text-center px-6 py-12 flex flex-col items-center">
          <p className="font-semibold">CAE</p>
          <h1 className="text-4xl font-bold py-12">{data.name}</h1>
        </div>
        <div className="px-4 py-4 flex flex-col items-stretch gap-2">
        {data.activities.map((activity) => (
          <Button
            key={activity.activity_name}
            as={Link}
            to={`/activity/${activity.order}`}
            variant="secondary"
            className="!font-bold"
            fullWidth
          >
            {activity.activity_name}
          </Button>
        ))}
        </div>
      </Card>
    </div>
  );
}
