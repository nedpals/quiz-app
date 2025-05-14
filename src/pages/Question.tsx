import { isRoundActivityQuestion } from "../types";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import useCurrentQuizActivity from "../hooks/useCurrentQuizActivity";
import Button from "../components/Button";

export default function QuestionPage() {
  const [countdown, setCountdown] = useState(3);
  const {
    isLoading,
    currentActivity,
    currentQuestion,
    currentQuestionTitle,
    currentRoundTitle,
    answerQuestion,
    navigateToNextPage
  } = useCurrentQuizActivity();

  useEffect(() => {
    if (isRoundActivityQuestion(currentQuestion)) {
      const countdownInterval = setInterval(() => {
        // We let the coundtown useEffect handle the redirection
        // when the countdown reaches 0
        setCountdown(prev => Math.max(0, prev - 1));
      }, 1000);

      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (isRoundActivityQuestion(currentQuestion) && countdown === 0) {
      navigateToNextPage();
      setCountdown(2);
    }
  }, [countdown, currentQuestion]);

  if (!currentQuestion || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Card className="max-w-2xl w-full mx-auto">
        <div className="px-12 py-12 text-center sm:text-left">
          <p className="uppercase font-semibold text-lg text-gray-500">
            {currentActivity?.activity_name ?? "Unknown Activity"}
            {currentRoundTitle ? ` / ${currentRoundTitle}` : ""}
          </p>
          <p className="uppercase text-4xl font-bold my-8">{currentQuestionTitle}</p>
        </div>

        {!isRoundActivityQuestion(currentQuestion) ? (
          <div>
            <div className="text-center sm:text-left text-2xl px-6 sm:px-12 py-6 sm:py-8 bg-gray-50 border-y border-gray-300">
              <p dangerouslySetInnerHTML={{ __html: currentQuestion.stimulus.replace(/\*(.*?)\*/g, '<b class="highlighted-text">$1</b>') }}></p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 px-6 sm:px-12 py-6">
              <Button
                variant="success"
                fullWidth
                onClick={() => answerQuestion(true)}
              >
                Correct
              </Button>
              <Button
                variant="danger"
                fullWidth
                onClick={() => answerQuestion(false)}
              >
                Incorrect
              </Button>
            </div>
          </div>
        ) : (
          <div className="px-12 pb-12">
            <p className="text-xl text-gray-600">
              The next question starts in {countdown} second{countdown !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
