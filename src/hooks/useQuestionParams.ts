import { useNavigate, useParams } from "react-router";
import { useQuizData } from "../data";
import { extractParams } from "../helpers";
import { isRoundActivityQuestion } from "../types";

export default function useQuestionParams() {
  const navigate = useNavigate();

  const { activityId: rawActivityId, activityQuestionId: rawActivityQuestionId } = useParams<{
    activityId: string;
    activityQuestionId: string;
  }>();

  const { getQuestion } = useQuizData();
  const { activityId, questionId, childQuestionId } = extractParams(rawActivityId!, rawActivityQuestionId)

  const getNextQuestionId = () => {
    if (!questionId) {
      // Get the first question ID of the activity
      const firstQuestion = getQuestion(activityId, 1);
      if (!firstQuestion) return null;
      return '1';
    }

    // Get the next question ID based on the current question ID
    // (if it's a child question, get the parent question first)
    const question = getQuestion(activityId, questionId);
    if (!question) return null;

    if (isRoundActivityQuestion(question)) {
      // If the question is a round activity question, get the next question in the round
      const nextQuestion = question.questions.find((q) => q.order === (childQuestionId || 0) + 1);
      if (nextQuestion) {
        return `${questionId}_${nextQuestion.order}`;
      }

      // If none, proceed to the next question in the activity below
    }

    // Get the next question in the activity
    const nextQuestion = getQuestion(activityId, questionId + 1);
    if (!nextQuestion) return null;

    return `${nextQuestion.order}`;
  }

  const getNextQuestionRoute = () => {
    const nextQuestionId = getNextQuestionId();
    if (!nextQuestionId) return null;
    return `/activity/${activityId}/question/${nextQuestionId}`;
  }

  const getNextPageRoute = () => {
    const nextQuestionRoute = getNextQuestionRoute();
    if (nextQuestionRoute) {
      return nextQuestionRoute;
    }
    return `/activity/${activityId}/result`;
  }

  const navigateToNextPage = () => {
    const nextPageRoute = getNextPageRoute();
    navigate(nextPageRoute);
  }

  return {
    activityId,
    questionId: questionId!,
    childQuestionId,
    rawActivityQuestionId,
    getNextQuestionId,
    getNextPageRoute,
    getNextQuestionRoute,
    navigateToNextPage
  }
}
