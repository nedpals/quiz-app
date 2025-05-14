import { Link } from "react-router";
import Card from "../components/Card";
import Button from "../components/Button";
import useCurrentQuizActivity from "../hooks/useCurrentQuizActivity";
import { isRoundActivityQuestion, type ActivityQuestion, type QuizAnswer } from "../types";

function ResultItem<AnswerType>({ question, answer }: { question: ActivityQuestion; answer: QuizAnswer<AnswerType> }) {
  return (
    <div className={`px-8 py-3 flex justify-between items-center ${answer.is_correct ? "bg-green-50" : "bg-red-50"}`}>
      <p className="text-lg">Q{question.order}</p>
      <p className={`uppercase font-bold text-lg ${answer.is_correct ? "text-green-800" : "text-red-600"}`}>
        {answer.is_correct
          ? "Correct"
          : answer.correct_answer?.toString() ?? "Unknown answer"}
      </p>
    </div>
  );
}

function ResultItemList<AnswerType>({ className, questions, answers, idPrefix = "" }: {
  className?: string;
  questions: ActivityQuestion[];
  answers: Record<string, QuizAnswer<AnswerType>>;
  idPrefix?: string;
}) {
  return (
    <div className={`flex flex-col items-stretch divide-y divide-gray-200 ${className}`}>
      {questions.sort((a, b) => a.order - b.order).map((question) =>
        isRoundActivityQuestion(question) ? (
          <div key={`question_answer_${idPrefix}${question.order}`}>
            <p className="text-lg font-semibold text-center py-3 border-b border-gray-200">{question.round_title}</p>
            <ResultItemList
              className="flex flex-col items-stretch"
              questions={question.questions}
              answers={answers}
              idPrefix={`${idPrefix}${question.order}_`}
            />
          </div>
        ) : (
          <ResultItem
            key={`question_answer_${idPrefix}${question.order}`}
            question={question}
            answer={answers[idPrefix + question.order]} />
        )
      )}
    </div>
  );
}

export default function ResultPage() {
  const { currentActivity, currentAnswers } = useCurrentQuizActivity();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Card className="sm:max-w-80 w-full mx-auto divide-y divide-gray-300">
        <div className="text-center px-6 py-12 flex flex-col items-center">
          <p className="uppercase font-semibold pb-12">{currentActivity?.activity_name ?? "Unknown Activity"}</p>
          <h1 className="text-4xl font-bold">Results</h1>
        </div>
        <div className="bg-gray-50 flex flex-col items-stretch divide-y divide-gray-300">
          <ResultItemList questions={currentActivity?.questions ?? []} answers={currentAnswers} />
        </div>
        <div className="w-full px-4 py-6">
          <Button
            as={Link}
            to="/"
            variant="primary"
            fullWidth
          >
            Home
          </Button>
        </div>
      </Card>
    </div>
  );
}
