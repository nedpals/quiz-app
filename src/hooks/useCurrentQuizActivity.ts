import { useMemo } from "react";
import { useQuizData } from "../data";
import useQuestionParams from "./useQuestionParams";
import { isRoundActivityQuestion } from "../types";

export default function useCurrentQuizActivity() {
  const { getQuestion, getActivity, getAnswers, setAnswer, isLoading } = useQuizData();
  const { activityId, questionId, rawActivityQuestionId, childQuestionId, navigateToNextPage } = useQuestionParams();

  const parentQuestion = getQuestion(activityId, questionId);
  const currentQuestion = getQuestion(activityId, rawActivityQuestionId!);
  const currentActivity = getActivity(activityId);
  const currentAnswers = getAnswers(activityId);

  const answerQuestion = (answer: boolean) => {
    setAnswer(activityId, rawActivityQuestionId!, answer);
    navigateToNextPage();
  }

  const currentQuestionTitle = useMemo(() => {
    if (childQuestionId) {
      return `Q${childQuestionId}`;
    }
    if (isRoundActivityQuestion(currentQuestion)) {
      return currentQuestion.round_title;
    }
    return `Q${questionId}.`;
  }, [questionId, currentQuestion, childQuestionId]);

  return {
    isLoading,
    currentRoundTitle: isRoundActivityQuestion(parentQuestion) ? parentQuestion.round_title : null,
    currentQuestionTitle,
    currentQuestion,
    currentActivity,
    currentAnswers,
    answerQuestion,
    navigateToNextPage,
  }
}
