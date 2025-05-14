export interface QuizData {
  name: string;
  heading: string;
  activities: QuizActivity[];
}

export interface QuizActivity {
  activity_name: string;
  order: number;
  questions: ActivityQuestion[];
}

export type ActivityQuestion = RoundActivityQuestion | SimpleActivityQuestion;

export interface SimpleActivityQuestion {
  is_correct: boolean;
  stimulus: string;
  order: number;
  user_answers: string[];
  feedback: string;
}

export interface RoundActivityQuestion {
  round_title: string;
  order: number;
  questions: SimpleActivityQuestion[];
}

export function isRoundActivityQuestion(
  question: ActivityQuestion | null
): question is RoundActivityQuestion {
  if (!question) return false;
  return typeof question === "object" && "round_title" in question;
}

export interface QuizAnswer<AnswerType> {
  question_id: string;
  answer: AnswerType;
  correct_answer: AnswerType | null;
  is_correct: boolean;
}
