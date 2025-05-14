export function extractParams(
  activityId: string,
  activityQuestionId: string | undefined
): { activityId: number; questionId: number | null; childQuestionId: number | null } {
  const activityIdNum = Number(activityId);
  const questionIds = extractQuestionParams(activityQuestionId);

  return {
    activityId: activityIdNum,
    ...questionIds
  };
}

export function extractQuestionParams(activityQuestionId: string | number | undefined): { questionId: number | null; childQuestionId: number | null } {
  if (typeof activityQuestionId === "number") {
    return {
      questionId: activityQuestionId,
      childQuestionId: null,
    };
  }

  const questionIdParts = activityQuestionId?.split("_") ?? []
  const questionId = questionIdParts.length >= 1 ? parseInt(questionIdParts[0]) : null;
  const childQuestionId = questionIdParts.length > 1 ? parseInt(questionIdParts[1]) : null;

  return {
    questionId: questionId,
    childQuestionId: childQuestionId,
  };
}
