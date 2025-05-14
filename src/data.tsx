import React, { createContext, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { type QuizData, type QuizActivity, type ActivityQuestion, type QuizAnswer, isRoundActivityQuestion } from "./types";
import { extractQuestionParams } from "./helpers";

interface QuizDataContextType<AnswerType = boolean> {
  data: QuizData | undefined;
  isLoading: boolean;
  getActivity: (id: number) => QuizActivity | null;
  getQuestion: (activityId: number, questionId: number | string) => ActivityQuestion | null;
  setAnswer(activityId: number, questionId: string | number, answer: AnswerType): void;
  getAnswers: (activityId: number) => Record<string, QuizAnswer<AnswerType>>;
}

const QuizDataContext = createContext<QuizDataContextType | null>(null);

export const useQuizData = () => {
  const context = useContext(QuizDataContext);
  if (!context) {
    throw new Error("useQuizData must be used within a QuizDataProvider");
  }
  return context;
};

function saveQuizAnswerDataToSessionStorage<AnswerType>(answers: Record<string, QuizAnswer<AnswerType>[]>) {
  if (answers === null || !sessionStorage) {
    return;
  }

  // console.log("Saving quiz answers to session storage:", answers, JSON.stringify(answers));
  const encoded = btoa(JSON.stringify(answers));
  if (sessionStorage.getItem("quizAnswers") === encoded) {
    return;
  }
  sessionStorage.setItem("quizAnswers", encoded);
}

function loadQuizAnswerDataFromSessionStorage<AnswerType>(): Record<string, QuizAnswer<AnswerType>[]> {
  const data = sessionStorage.getItem("quizAnswers");
  if (data) {
    const decoded = JSON.parse(atob(data));
    if (decoded !== null) {
      return decoded;
    }
  }
  return {};
}

export const QuizDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [answers, setAnswers] = React.useState<Record<string, QuizAnswer<boolean>[]>>(null!);

  const { data, isLoading } = useQuery({
    queryKey: ["quizData"],
    queryFn: async () => {
      const resp = await fetch("/payload.json");
      if (!resp.ok) {
        throw new Error("Failed to fetch quiz data");
      }

      const data = await resp.json();
      if (!data) {
        throw new Error("No quiz data found");
      }

      return data as QuizData;
    },
  });

  const getActivity = (activityId: number) => {
    return data?.activities.find((activity) => activity.order === activityId) || null;
  };

  const getQuestion = (activityId: number, questionId: number | string) => {
    const activity = getActivity(activityId);
    if (!activity || !activity.questions) return null;

    const { questionId: _questionId, childQuestionId: _childQuestionId } = extractQuestionParams(questionId);
    const foundQuestion = activity.questions.find((question) => question.order === _questionId);
    if (!foundQuestion) {
      return null;
    }

    if (_childQuestionId && isRoundActivityQuestion(foundQuestion)) {
      const childQuestion = foundQuestion.questions.find((question) => question.order === _childQuestionId);
      if (childQuestion) {
        return childQuestion;
      }
    } else {
      return foundQuestion;
    }

    return null;
  };

  const _identifyAnswer = (activityId: number, questionId: string, answer: boolean) => {
    const question = getQuestion(activityId, questionId);
    if (!question || isRoundActivityQuestion(question)) {
      return { isCorrect: false, correctAnswer: null };
    }

    return {
      isCorrect: answer === question.is_correct,
      correctAnswer: question.is_correct,
    };
  };

  const setAnswer = (activityId: number, questionId: string, answer: boolean) => {
    const answerResult = _identifyAnswer(activityId, questionId, answer);

    setAnswers((prevAnswers) => {
      const activityAnswers = prevAnswers[activityId] || [];
      let isModified = false;
      const updatedAnswers = activityAnswers.map((a) => {
        if (a.question_id === questionId) {
          isModified = true;
          return {
            ...a,
            answer,
            is_correct: answerResult.isCorrect,
            correct_answer: answerResult.correctAnswer
          };
        }
        return a;
      })

      if (!isModified) {
        updatedAnswers.push({
          question_id: questionId,
          answer,
          is_correct: answerResult.isCorrect,
          correct_answer: answerResult.correctAnswer,
        });
      }

      return { ...prevAnswers, [activityId]: updatedAnswers };
    });
  };

  const getAnswers = (activityId: number) => {
    if (!answers) {
      return {};
    }

    const activityAnswers = answers[activityId];
    if (!activityAnswers) {
      return {};
    }

    const answersMap: Record<string, QuizAnswer<boolean>> = {};
    for (const answer of activityAnswers) {
      answersMap[answer.question_id] = answer;
    }

    return answersMap;
  };

  useEffect(() => {
    if (answers === null) {
      setAnswers(loadQuizAnswerDataFromSessionStorage());
    } else {
      saveQuizAnswerDataToSessionStorage(answers);
    }
  }, [answers]);

  return (
    <QuizDataContext.Provider
      value={{
        data,
        isLoading,
        getActivity,
        getQuestion,
        setAnswer,
        getAnswers
      }}
    >
      {children}
    </QuizDataContext.Provider>
  );
}
